import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { createPlantSlug, getPlantImageUrl, type Plant } from '~/lib/database';

interface PlantCardProps {
  plant: Plant;
}

const categoryColors = {
  native: 'bg-green-500 hover:bg-green-600 text-white',
  endemic: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  exotic: 'bg-black hover:bg-gray-800 text-white',
  poisonous: 'bg-red-500 hover:bg-red-600 text-white',
};

// Helper function to normalize category for consistent coloring and filtering
const normalizeCategory = (category: string | null): 'native' | 'endemic' | 'exotic' | 'poisonous' => {
  if (!category) return 'native';
  const normalized = category.toLowerCase().trim();
  if (normalized.includes('endemic')) return 'endemic';
  if (normalized.includes('exotic')) return 'exotic';
  if (normalized.includes('poison')) return 'poisonous';
  return 'native';
};

const PlantCard = ({ plant }: PlantCardProps) => {
  const slug = createPlantSlug(plant.scientificName);
  const imageUrl = getPlantImageUrl(plant.name);
  const normalizedCategory = normalizeCategory(plant.category);

  return (
    <Link to={`/nature-code/${slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold line-clamp-2">
                {plant.name}
              </CardTitle>
              {plant.scientificName && (
                <CardDescription className="italic font-serif text-sm mt-1">
                  {plant.scientificName}
                </CardDescription>
              )}
            </div>
            <Badge className={categoryColors[normalizedCategory]}>
              {normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        {imageUrl && (
          <div className="px-6 pb-3">
            <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100">
              <img
                src={imageUrl}
                alt={plant.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        <CardContent className="pt-0">
          <div className="space-y-1 text-sm text-gray-600">
            {plant.family && (
              <p><span className="font-medium">Family:</span> {plant.family}</p>
            )}
            {plant.group && (
              <p><span className="font-medium">Group:</span> {plant.group}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlantCard;
