import type { Route } from "./+types/timeline";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Timeline of Green Hopes" },
    {
      name: "description",
      content:
        "Discover the journey of Green Hopes: Explore our timeline to see the impactful projects, events, and milestones we've achieved so far in empowering communities for a greener, sustainable future.",
    },
  ];
}

export default function Timeline() {
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
          <header className="flex flex-col items-center justify-center text-center">
            <h1 className="secondary-title text-white mb-5">
              What we've achieved so far!
            </h1>
            <p className="text-base lg:text-[18px] tracking-prose max-w-[24rem] md:max-w-[30rem] lg:max-w-[46.875rem] text-white/80">
              Green Hopes empowers communities for a greener, sustainable future
              through nature code, reusable resources, education, and
              restoration. We unite people to take meaningful action for the
              planet, starting at University of Sri Jayewardenepura and reaching
              beyond.
            </p>
          </header>
          <div className="mb-6"></div>
        </div>
      </div>
    </>
  );
}
