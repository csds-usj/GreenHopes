import React from "react";
import { Link } from "react-router";
import { CtaButton } from "./ui/cta-button";
import { CardSwipe } from "./ui/swiper";
import { images } from "../../content/work";

export default function Work() {
  return (
    <section className="w-full pt-34">
      <div className="mx-auto max-w-[1216px] px-6 md:px-0">
        <div className="grid lg:grid-cols-7 items-center gap-x-8 gap-y-4 px-10 md:px-14 xl:px-20 py-0 rounded-3xl bg-gradient-to-br from-sky-50 via-blue-50 to-sky-200 ring-1 ring-blue-900/10 ring-inset card">
          {/* Image on top for mobile, right for desktop */}
          <div className="lg:order-last lg:col-span-3 lg:-mr-5 -mt-3 mb-4 lg:mt-0 flex justify-center">
            <CardSwipe
              images={images}
              autoplayDelay={2000}
              slideShadows={false}
            />
          </div>
          <div className="space-y-4 py-6 md:py-10 lg:py-12 xl:py-20 lg:col-span-4">
            <h2 className="text-2xl md:text-3xl font-title font-semibold tracking-tighter text-muted-foreground -mt-1">
              What's already been done?
            </h2>
            <p className="block text-lg pb-3 text-gray-800 max-w-lg">
              Green Hopes has already made significant strides in promoting
              sustainability and environmental awareness. Through initiatives
              like Nature Code, Beach Cleanup, and School Awareness Programs and
              more.
            </p>
            <Link to="/timeline">
              <CtaButton>Learn More</CtaButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
