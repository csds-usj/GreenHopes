import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("nature-code", "routes/nature-code-index.tsx"),
  route(
    "nature-code/:scientificName",
    "routes/nature-code.$scientificName.tsx"
  ),
  route("api/plants", "routes/api.plants.tsx"),
  route("api/plants/:scientificName", "routes/api.plants.$scientificName.tsx"),
  route("about", "routes/about.tsx"),
  route("timeline", "routes/timeline.tsx"),
] satisfies RouteConfig;
