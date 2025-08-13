import type { Route } from "./+types/api.plants.$scientificName";
import { parseSlugToScientificName, getPlantImageUrl } from "~/lib/database";
import { getAllTrees } from "~/lib/db.server";

export async function loader({ params, context }: Route.LoaderArgs) {
  try {
    const { scientificName } = params;

    // Parse the slug back to scientific name
    const parsedScientificName = parseSlugToScientificName(scientificName);

    // Fetch all plants from Turso database using server-side connection
    const treeRecords = await getAllTrees();

    // Find the plant by matching the "cleaned" version of the database names
    const matchingPlant = treeRecords.find((plant) => {
      const cleanedDbName = plant.scientificName
        ?.toLowerCase()
        .replace(/[^a-z0-9\s]/g, "") // Remove special characters
        .replace(/\s+/g, " ") // Normalize spaces
        .trim();
      const cleanedParsedName = parsedScientificName
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
      return cleanedDbName === cleanedParsedName;
    });

    if (!matchingPlant) {
      throw new Response("Plant not found", { status: 404 });
    }

    // Transform database record to match our Plant interface
    const plant = {
      id: matchingPlant.id,
      number: matchingPlant.number || matchingPlant.id,
      name: matchingPlant.name,
      scientificName: matchingPlant.scientificName,
      group: matchingPlant.group,
      family: matchingPlant.family,
      descriptionMd: matchingPlant.descriptionMd,
      imageUrl: getPlantImageUrl(matchingPlant.name),
      category: matchingPlant.category || "native",
    };

    return Response.json(plant);
  } catch (error) {
    console.error(
      "Unhandled error in /api/plants/:scientificName loader:",
      error
    );
    if (error instanceof Response) throw error;
    throw new Response("Plant not found", { status: 404 });
  }
}
