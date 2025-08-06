import type { Route } from "./+types/timeline";
import { TimelineCard } from "~/components/timeline-card";
import { timelineData } from "../../content/timeline";

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
              What we've achieved so far!
            </h1>
            <p className="text-base lg:text-[18px] tracking-prose max-w-[24rem] md:max-w-[30rem] lg:max-w-[46.875rem] md:mx-auto text-white/80 ">
              From transforming sandy shores with vibrant beach cleanups, to
              capturing the wild beauty of nature through our photography
              contest, and nurturing new life by planting saplings—our journey
              is a tapestry of action, creativity, and growth. Each milestone
              reflects our commitment to a greener tomorrow, woven together by
              the hands and hearts of our community.
            </p>
          </header>
          <div className="mb-6">
            <TimelineCard data={timelineData} />
          </div>
        </div>
      </div>
    </>
  );
}
