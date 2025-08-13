import type { Route } from "./+types/home";
import { Link } from "react-router";
import { CtaButton } from "~/components/ui/cta-button";
import Testimonials from "~/components/testimonials";
import Intro from "~/components/intro";
import Gradient from "~/components/gradient";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Green Hopes by CSDS" },
    {
      name: "description",
      content:
        "Green Hopes is a environmental initiative by the Career Guidance Unit of University of Sri Jayewardenepura, aiming to cultivate sustainability among students and the wider community through innovative phases like tree QR signage, reusable resources, school awareness programs, and conservation efforts.It reduces plastic waste, promotes awareness and fosters long-term environmental responsibility building a greener, cleaner, and a sustainable future for everyone.",
    },
  ];
}

export default function Home() {
  return (
    <>
      {/* Hero Section with full-height background image */}
      <section
        className="relative min-h-screen w-full overflow-hidden flex items-center pt-[64px] md:pt-[96px] lg:pt-[124px] bg-bottom bg-cover"
        style={{ backgroundImage: "url(/bg.avif)" }}
      >
        {/* Background wash overlay (under gradient) */}
        <div className="absolute inset-0 bg-white/40" aria-hidden="true" />
        {/* Gradient overlay (above image, below content) */}
        <Gradient
          className="z-10 opacity-90 w-[170%] max-w-none sm:w-[140%] md:w-full md:max-w-[1200px]"
          style={{ top: 0 }}
        />
        <div className="relative z-20 flex flex-col items-start sm:items-center sm:text-center px-6 pb-20 max-w-7xl mx-auto w-full">
          <h1 className="title mb-5 -mt-4 sm:-mt-5 lg:-mt-6 xl:mt-[-26px] text-left sm:text-center">
            For a Sustainable Future from <br className="hidden lg:block" />
            the Next <span className="text-primary">Generation</span>
          </h1>
          <p className="text-base lg:text-[18px] tracking-prose mb-9 max-w-[24rem] md:max-w-[30rem] lg:max-w-[46.875rem] sm:mx-auto text-muted-foreground text-left sm:text-center">
            A <strong className="text-primary">Student-Led</strong>{" "}
            Sustainability Initiative Driving Eco-Conscious Change Through
            Innovation, Awareness, and Action — From Campus to Community.
          </p>
          <div className="w-full sm:w-auto sm:flex sm:justify-center">
            <Link to="/nature-code">
              <CtaButton>Explore Nature Code</CtaButton>
            </Link>
          </div>
        </div>
      </section>
      {/* Following content */}
      <Intro />
      <Testimonials />
    </>
  );
}
