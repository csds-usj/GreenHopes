import { useState } from "react";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

// Removed Select import to use native HTML select instead
import PlantCard from "~/components/plant-card";
import type { Route } from "./+types/nature-code-index";
import { useLoaderData } from "react-router";
import { getAllTrees } from "~/lib/db.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nature Code by Green Hopes" },
    {
      name: "description",
      content:
        "Nature Code is a green innovation by the Career Skills Development Society that lets you scan QR codes on trees to discover species info, environmental value, and ways to protect them. The site also lets you search and filter plant data — turning every tree into a story worth discovering.",
    },
  ];
}

// Server-side data loading
export async function loader() {
  try {
    const treeRecords = await getAllTrees();
    
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
    
    return { plants };
  } catch (error) {
    console.error("Error loading plants:", error);
    return { plants: [] };
  }
}

// Helper function to get image URL from public directory using tree name directly
function getPlantImageUrl(treeName: string | null): string {
  if (!treeName) return "";
  // Use tree name directly as filename
  return `/img/${treeName}.webp`;
}

// Helper function to normalize category for consistent filtering
const normalizeCategory = (
  category: string | null
): "native" | "endemic" | "exotic" | "poisonous" => {
  if (!category) return "native";
  const normalized = category.toLowerCase().trim();
  if (normalized.includes("endemic")) return "endemic";
  if (normalized.includes("exotic")) return "exotic";
  if (normalized.includes("poison")) return "poisonous";
  return "native";
};

const NatureCodeIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Get data from loader
  const { plants } = useLoaderData<typeof loader>();

  const filteredPlants = plants?.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.family?.toLowerCase().includes(searchTerm.toLowerCase());

    const normalizedCategory = normalizeCategory(plant.category);
    const matchesCategory =
      categoryFilter === "all" || normalizedCategory === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Gradient Background Overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-[580px] md:h-[500px] z-0"
        style={{
          background: "var(--nature-code-gradient)",
        }}
      />
      <div className="relative">
        {/* Original Content */}
        <div className="container mx-auto px-8 py-16 relative z-10">
          <header className="text-center">
            <h1 className="secondary-title text-white mb-5 -mt-4 text-left sm:text-center">
              Nature Code
            </h1>
            <p className="text-base lg:text-[18px] tracking-prose mb-9 max-w-[24rem] md:max-w-[30rem] lg:max-w-[46.875rem] sm:mx-auto text-white/80 text-left sm:text-center">
              Nature Code is a green innovation by the Career Skills Development
              Society that lets you scan QR codes on trees to discover species
              info, environmental value, and ways to protect them. The site also
              lets you search and filter plant data — turning every tree into a
              story worth discovering.
            </p>
          </header>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full  bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="native">Native</SelectItem>
                <SelectItem value="endemic">Endemic</SelectItem>
                <SelectItem value="exotic">Exotic</SelectItem>
                <SelectItem value="poisonous">Poisonous</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-white/80">
              {filteredPlants?.length || 0} plant
              {filteredPlants?.length !== 1 ? "s" : ""} found
            </p>
          </div>
          {/* Plant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants?.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
        {filteredPlants?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No plants found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default NatureCodeIndex;
