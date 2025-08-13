import { useParams, Link, useLoaderData } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  getPlantByScientificName,
  parseSlugToScientificName,
  getPlantImageUrl,
} from "~/lib/database";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/nature-code.$scientificName";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nature Code | Plant Details" },
    {
      name: "description",
      content:
        "Learn about various plant species, their environmental value, and how to protect them. Explore detailed information on each plant including images, descriptions, and categories.",
    },
  ];
}

// Server-side data loading
export async function loader({ params }: Route.LoaderArgs) {
  try {
    const { scientificName } = params;

    if (!scientificName) {
      throw new Response("Invalid plant identifier.", { status: 400 });
    }

    // Parse the slug back to scientific name
    const parsedScientificName = parseSlugToScientificName(scientificName);

    // Get plant data
    const plant = await getPlantByScientificName(parsedScientificName);

    if (!plant) {
      throw new Response("Plant not found.", { status: 404 });
    }

    return { plant };
  } catch (error) {
    console.error("Error loading plant:", error);
    if (error instanceof Response) throw error;
    throw new Response("Plant not found.", { status: 404 });
  }
}

const categoryColors = {
  native: "bg-green-500 hover:bg-green-600 text-white",
  endemic: "bg-yellow-500 hover:bg-yellow-600 text-black",
  exotic: "bg-black hover:bg-gray-800 text-white",
  poisonous: "bg-red-500 hover:bg-red-600 text-white",
};

const PlantDetail = () => {
  // Get data from loader
  const { plant } = useLoaderData<typeof loader>();

  const imageUrl = getPlantImageUrl(plant.name);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/nature-code">Nature Code</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{plant?.name || "Plant Details"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          {imageUrl && (
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <img
                src={imageUrl}
                alt={plant.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-plant.jpg";
                }}
              />
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {plant.name}
                </h1>
                {plant.scientificName && (
                  <p className="text-xl italic font-serif text-gray-600">
                    {plant.scientificName}
                  </p>
                )}
              </div>
              <Badge className={categoryColors[plant.category]}>
                {plant.category.charAt(0).toUpperCase() +
                  plant.category.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Plant Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Plant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                {plant.family && (
                  <div>
                    <span className="font-medium text-gray-700">Family:</span>
                    <span className="ml-2 text-gray-900">{plant.family}</span>
                  </div>
                )}
                {plant.group && (
                  <div>
                    <span className="font-medium text-gray-700">Group:</span>
                    <span className="ml-2 text-gray-900">{plant.group}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Category:</span>
                  <span className="ml-2 text-gray-900">
                    {plant.category.charAt(0).toUpperCase() +
                      plant.category.slice(1)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          {plant.descriptionMd && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{plant.descriptionMd}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
