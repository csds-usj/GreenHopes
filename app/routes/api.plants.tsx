import type { Route } from "./+types/api.plants";
import { getPlantImageUrl } from "~/lib/database";

// D1 HTTP API client
class D1HttpClient {
  constructor(
    private accountId: string,
    private databaseId: string,
    private token: string
  ) {}

  async prepare(query: string) {
    return {
      bind: (...params: any[]) => this.execute(query, params),
      all: () => this.execute(query, []),
    };
  }

  async execute(query: string, params: any[] = []) {
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/d1/database/${this.databaseId}/query`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sql: query,
        params,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `D1 API error: ${response.status} ${response.statusText}`
      );
    }

  const data: any = await response.json();
    return {
      results: data.result[0]?.results || [],
      success: data.success,
    };
  }
}

export async function loader({ request, context }: Route.LoaderArgs) {
  try {
    // Use D1 HTTP API with environment credentials
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const databaseId = process.env.CLOUDFLARE_DATABASE_ID;
    const token = process.env.CLOUDFLARE_D1_TOKEN;

    if (!accountId || !databaseId || !token) {
      console.warn("D1 credentials missing; returning empty list instead of 500");
      return Response.json([]);
    }

    // Create D1 HTTP client and execute query directly
    const d1Client = new D1HttpClient(accountId, databaseId, token);

    // Fetch all plants from database using D1 HTTP API
    let result;
    try {
      result = await d1Client.execute("SELECT * FROM trees");
    } catch (cfErr) {
      console.error("Cloudflare D1 query failed, returning empty list:", cfErr);
      return Response.json([]);
    }
    const treeRecords = result.results;

    // Transform database records to match our Plant interface
    const plants = treeRecords.map((tree: any) => ({
      id: tree.id,
      number: tree.number || tree.id,
      name: tree.name,
      scientificName:
        tree.scientificName || tree.scientific_name || tree.ScientificName,
      group: tree.group,
      family: tree.family,
      descriptionMd:
        tree.descriptionMd || tree.description_md || tree.description,
      imageUrl: getPlantImageUrl(tree.name),
      category: tree.category || "native",
    }));

    return Response.json(plants);
  } catch (error) {
    console.error("Unhandled error in /api/plants loader:", error);
    return Response.json([]);
  }
}

export async function action({ request }: Route.ActionArgs) {
  // Handle POST, PUT, DELETE requests if needed
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
