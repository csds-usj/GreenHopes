import type { Route } from "./+types/home";
import { Link } from "react-router";
import { CtaButton } from "~/components/ui/cta-button";
import Testimonials from "~/components/testimonials";
import Intro from "~/components/intro";

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
      {/* <div
        className="absolute inset-x-0 bottom-0 w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] 3xl:h-[700px] z-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <picture>
          <img
            src="/bg.avif"
            className="w-full h-full object-cover object-bottom max-w-none"
            alt="Background"
            draggable="false"
          />
        </picture>
      </div> */}
      <section className="relative text-foreground w-full overflow-x-hidden pt-[64px] md:pt-[96px] lg:pt-[124px] ">
        <div className="relative flex flex-col items-start sm:items-center sm:text-center z-10 px-6 pt-12 pb-32 max-w-7xl mx-auto">
          <h1 className="title mb-5 -mt-4 sm:-mt-5 lg:-mt-6 xl:mt-[-26px] text-title text-left sm:text-center">
            For a Sustainable Future from <br className="hidden lg:block" />
            the Next <span className="text-primary ">Generation</span>
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
        <Intro />
        <Testimonials />
      </section>
    </>
  );
}
