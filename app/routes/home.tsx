import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Green Hopes by CSDS" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <div
        className="absolute inset-x-0 bottom-0 w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] 3xl:h-[700px] z-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <picture>
          <img
            src="/bg.png"
            className="w-full h-full object-cover object-bottom max-w-none"
            alt="Background"
            draggable="false"
          />
        </picture>
      </div>
      <section className="relative text-foreground w-full overflow-x-hidden">
        <div className="relative flex flex-col items-start sm:items-center sm:text-center z-10 px-4 pt-12 pb-8 max-w-7xl mx-auto">
          <h1 className="cta-title mb-5 -mt-4 sm:-mt-5 lg:-mt-6 xl:mt-[-26px] text-primary">
            Green Hopes: A CSR Project by CSDS{" "}
            <br className="hidden lg:block" />
            for a Sustainable Future
          </h1>
          <p className="text-base lg:text-[18px] tracking-prose mb-9 max-w-[46.875rem] mx-auto text-muted-foreground">
            <strong className="text-primary">Green Hopes</strong> is a Corporate
            Social Responsibility initiative by CSDS, dedicated to building a
            sustainable future through impactful projects and community
            engagement.
          </p>
          <a
            href="/app/sign-up"
            className="gap-2 px-8 py-4 text-lg font-semibold rounded-full bg-primary text-primary-foreground border border-border shadow-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200 flex items-center group"
          >
            Deploy Your App in 5 minutes
            <span className="flex items-center opacity-50 group-hover:opacity-100 transition-opacity ml-2">
              <svg
                role="img"
                viewBox="0 0 16 16"
                width="0"
                height="10"
                fill="currentColor"
                className="w-0 group-hover:w-2.5 h-3 translate-x-2.5 ease-out duration-200 transition-all transform-gpu"
              >
                <path d="M1 9h14a1 1 0 000-2H1a1 1 0 000 2z"></path>
              </svg>
              <svg
                role="img"
                viewBox="0 0 16 16"
                width="10"
                height="10"
                fill="currentColor"
                className="size-[0.7em]"
              >
                <path d="M7.293 1.707L13.586 8l-6.293 6.293a1 1 0 001.414 1.414l7-7a.999.999 0 000-1.414l-7-7a1 1 0 00-1.414 1.414z"></path>
              </svg>
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
