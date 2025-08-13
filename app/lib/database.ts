import { getAllTrees, getTreeByScientificName } from "./db.server";
import { eq } from "drizzle-orm";
import { trees } from "drizzle/schema";

interface Plant {
  id: number;
  number: number;
  name: string;
  scientificName: string | null;
  group: string | null;
  family: string | null;
  descriptionMd: string | null;
  imageUrl: string | null;
  category: "native" | "endemic" | "exotic" | "poisonous";
}

// Updated to use server-side Turso database
export async function getAllPlants(): Promise<Plant[]> {
  try {
    const treeRecords = await getAllTrees();
    
    return treeRecords.map((tree) => ({
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
  } catch (error) {
    console.error("Error fetching plants:", error);
    throw new Error("Failed to fetch plants");
  }
}

export async function getPlantByScientificName(
  scientificName: string
): Promise<Plant | null> {
  try {
    // First try exact match
    let result = await getTreeByScientificName(scientificName);
    
    if (result.length === 0) {
      // If no exact match, get all plants and find by cleaned name
      const allTrees = await getAllTrees();
      const matchingTree = allTrees.find((tree) => {
        const cleanedDbName = tree.scientificName
          ?.toLowerCase()
          .replace(/[^a-z0-9\s]/g, "") // Remove special characters
          .replace(/\s+/g, " ") // Normalize spaces
          .trim();
        const cleanedSearchName = scientificName
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim();
        return cleanedDbName === cleanedSearchName;
      });
      
      if (matchingTree) {
        result = [matchingTree];
      }
    }
    
    if (result.length === 0) {
      return null;
    }
    
    const tree = result[0];
    return {
      id: tree.id,
      number: tree.number || tree.id,
      name: tree.name,
      scientificName: tree.scientificName,
      group: tree.group,
      family: tree.family,
      descriptionMd: tree.descriptionMd,
      imageUrl: getPlantImageUrl(tree.name),
      category: tree.category || "native",
    };
  } catch (error) {
    console.error("Error fetching plant:", error);
    return null;
  }
}

// Utility function to create URL-safe scientific name
export function createPlantSlug(scientificName: string | null): string {
  if (!scientificName) return "";
  return scientificName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove ALL special characters (quotes, plus, etc.)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with single hyphen
    .replace(/^-+|-+$/g, "") // Remove leading and trailing hyphens
    .trim();
}

export function parseSlugToScientificName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Helper function to get image URL from public directory using tree name directly
export function getPlantImageUrl(treeName: string | null): string {
  if (!treeName) return "";
  // Use tree name directly as filename
  return `/img/${treeName}.webp`;
}

export type { Plant };
