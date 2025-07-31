import type { Route } from "./+types/api.plants.$scientificName";
import { drizzle } from "drizzle-orm/d1";
import { trees } from "drizzle/schema";
import {
  getPlantByScientificName,
  parseSlugToScientificName,
  getPlantImageUrl,
} from "~/lib/database";

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
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql: query,
        params,
      }),
    });

    if (!response.ok) {
      throw new Error(`D1 API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      results: data.result[0]?.results || [],
      success: data.success,
    };
  }
}

export async function loader({ params, context }: Route.LoaderArgs) {
  try {
    const { scientificName } = params;
    
    // Parse the slug back to scientific name
    const parsedScientificName = parseSlugToScientificName(scientificName);
    
    // Use D1 HTTP API with environment credentials
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const databaseId = process.env.CLOUDFLARE_DATABASE_ID;
    const token = process.env.CLOUDFLARE_D1_TOKEN;

    if (!accountId || !databaseId || !token) {
      console.error('Missing Cloudflare D1 credentials in environment variables');
      return Response.json({ error: "Database credentials not available" }, { status: 500 });
    }

    // Create D1 HTTP client and execute query directly
    const d1Client = new D1HttpClient(accountId, databaseId, token);
    
    // Fetch plant by scientific name from database using D1 HTTP API
    // The issue is that the database has special characters (', +, extra spaces) but our parsed name doesn't
    // So we need to find the plant by matching the "cleaned" version of the database names
    
    // First try exact match
    let result = await d1Client.execute(
      'SELECT * FROM trees WHERE LOWER(scientific_name) = LOWER(?)', 
      [parsedScientificName]
    );
    
    // If no exact match, try matching by cleaning the database scientific_name
    if (result.results.length === 0) {
      // Get all plants and find one where the cleaned version matches our parsed name
      const allPlantsResult = await d1Client.execute('SELECT * FROM trees');
      const matchingPlant = allPlantsResult.results.find((plant: any) => {
        const cleanedDbName = plant.scientific_name
          ?.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '') // Remove special characters
          .replace(/\s+/g, ' ') // Normalize spaces
          .trim();
        const cleanedParsedName = parsedScientificName
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim();
        return cleanedDbName === cleanedParsedName;
      });
      
      if (matchingPlant) {
        result = { results: [matchingPlant], success: true };
      }
    }
    
    const treeRecord = result.results[0];
    
    if (!treeRecord) {
      throw new Response("Plant not found", { status: 404 });
    }
    
    // Transform database record to match our Plant interface
    const plant = {
      id: treeRecord.id,
      number: treeRecord.number || treeRecord.id,
      name: treeRecord.name,
      scientificName: treeRecord.scientificName || treeRecord.scientific_name || treeRecord.ScientificName,
      group: treeRecord.group,
      family: treeRecord.family,
      descriptionMd: treeRecord.descriptionMd || treeRecord.description_md || treeRecord.description,
      imageUrl: getPlantImageUrl(treeRecord.name),
      category: treeRecord.category || "native",
    };
    
    return Response.json(plant);
  } catch (error) {
    console.error("Error fetching plant:", error);
    if (error instanceof Response) {
      throw error;
    }
    return Response.json({ error: "Failed to fetch plant" }, { status: 500 });
  }
}
