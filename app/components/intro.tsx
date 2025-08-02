import Work from "./work";

export default function Intro() {
  return (
    <section className="w-full py-34 relative">
      <div
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, var(--primary, #38bdf8) 0%, var(--accent, #f472b6) 100%)",
          opacity: 0.1,
          WebkitMaskImage:
            "linear-gradient(to bottom,rgba(255,255,255,1) 75%,rgba(255,255,255,0))",
        }}
      />
      <div className="mx-auto max-w-[1216px] relative z-10">
        <div className="lg:grid grid-cols-2 gap-x-8 xl:gap-x-16 items-start px-6 md:px-0">
          <div className="relative w-full space-y-4 lg:pb-16">
            <h2 className="secondary-title">What is Green Hope?</h2>
            <p className="text-lg text-muted-foreground">
              Green Hopes is a environmental initiative by the Career Guidance
              Unit of University of Sri Jayewardenepura, aiming to cultivate
              sustainability among students and the wider community through
              innovative phases like Nature Code, reusable resources, school
              awareness programs, and conservation efforts.It reduces plastic
              waste, promotes awareness and fosters long-term environmental
              responsibility building a greener, cleaner, and a sustainable
              future for everyone.
            </p>
            <div className="hidden lg:block w-full h-px absolute bottom-0 bg-gradient-to-r from-muted-foreground to-muted-foreground/5" />
          </div>
          <img
            width="450"
            src="/globe.avif"
            className="w-full max-w-sm -mb-12 mx-auto relative lg:-mt-4"
            alt="Green Hope Globe"
          />
        </div>
      </div>
      <Work />
    </section>
  );
}
