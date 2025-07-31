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

// Mock API functions - replace with your actual API calls
export async function getAllPlants(): Promise<Plant[]> {
  // This would be your actual API call to your backend
  const response = await fetch("/api/plants");
  if (!response.ok) {
    throw new Error("Failed to fetch plants");
  }
  return response.json();
}

export async function getPlantByScientificName(
  scientificName: string
): Promise<Plant | null> {
  // This would be your actual API call to your backend
  const response = await fetch(
    `/api/plants/${encodeURIComponent(scientificName)}`
  );
  if (!response.ok) return null;
  return response.json();
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
