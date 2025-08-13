import type { Route } from "./+types/api.plants";
import { getPlantImageUrl } from "~/lib/database";
import { getAllTrees } from "~/lib/db.server";

export async function loader({ request, context }: Route.LoaderArgs) {
  try {
    // Fetch all plants from Turso database using server-side connection
    const treeRecords = await getAllTrees();

    // Transform database records to match our Plant interface
    const plants = treeRecords.map((tree) => ({
      id: tree.id,
      number: tree.number || tree.id,
      name: tree.name,
      scientificName: tree.scientificName,
      group: tree.group,
      family: tree.family,
      descriptionMd: tree.descriptionMd,
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
