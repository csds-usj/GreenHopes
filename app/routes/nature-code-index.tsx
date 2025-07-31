import { useQuery } from "@tanstack/react-query";
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
import { getAllPlants } from "~/lib/database";
import { Search, Loader2 } from "lucide-react";

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

  const {
    data: plants,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">
          Error loading plants. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-16">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Nature Code</h1>
        <p className="text-gray-600">Discover the plants in our collection</p>
      </header>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
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
        <p className="text-gray-600">
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

      {filteredPlants?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No plants found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default NatureCodeIndex;
