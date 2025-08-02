import type { Route } from "./+types/timeline";
import { TimelineCard } from "~/components/timeline-card";

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

const timelineData = [
  {
    title: "August 2024",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          Beach cleanup is a great way to give back to the environment. We
          organized a beach cleanup event in January 2024, where volunteers came
          together to clean up the local beach.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="/img/swiper/beach_3.jpg"
            alt="Beach Cleanup"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
          <img
            src="/img/swiper/beach_5.jpg"
            alt="Beach Cleanup"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
          <img
            src="/img/swiper/beach_2.jpg"
            alt="Beach Cleanup"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
          <img
            src="/img/swiper/beach_1.jpg"
            alt="Beach Cleanup"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
        </div>
      </div>
    ),
  },
  {
    title: "March 2025",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          Beach cleanup is a great way to give back to the environment. We
          organized a beach cleanup event in January 2024, where volunteers came
          together to clean up the local beach.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="/img/swiper/beach_4.jpg"
            alt="Beach Cleanup"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
          <img
            src="/img/swiper/beach_6.jpg"
            alt="Beach Cleanup"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
        </div>
      </div>
    ),
  },
];

export default function Timeline() {
  return (
    <>
      {/* Gradient Background Overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-[420px] z-0"
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
