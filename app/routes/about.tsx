import Team from "../components/team";
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Green Hopes" },
    {
      name: "description",
      content:
        "Green Hopes empowers communities for a greener, sustainable future through nature code, reusable resources, education, and restoration. We unite people to take meaningful action for the planet, starting at University of Sri Jayewardenepura and reaching beyond.",
    },
  ];
}

export default function About() {
  return (
    <>
      {/* Gradient Background Overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-[440px] z-0"
        style={{
          background: "var(--nature-code-gradient)",
        }}
      />
      <div className="relative">
        {/* Original Content */}
        <div className="container mx-auto px-8 py-16 relative z-10">
          <header className="text-left md:text-center">
            <h1 className="secondary-title text-white mb-5">
              What&apos;s Green Hopes All About?
            </h1>
            <p className="text-base lg:text-[18px] tracking-prose max-w-[24rem] md:max-w-[30rem] lg:max-w-[46.875rem] md:mx-auto text-white/80 ">
              Green Hopes empowers communities for a greener, sustainable future
              through nature code, reusable resources, education, and
              restoration. We unite people to take meaningful action for the
              planet, starting at University of Sri Jayewardenepura and reaching
              beyond.
            </p>
          </header>
          <div className="mb-6 mt-10 md:mt-16 lg:mt-24">
            <Team />
          </div>
        </div>
      </div>
    </>
  );
}
