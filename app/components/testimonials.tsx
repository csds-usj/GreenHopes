const testimonials = [
  {
    quote:
      "The University of Sri Jayewardenepura is committed to academic excellence and innovation.",
    name: "Senior Professor Pathmalal M. Manage",
    title: "Vice Chancellor, University of Sri Jayewardenepura",
    image: "/img/testimonials/prof_manage.png",
  },
  {
    quote:
      "The Career Guidance Unit empowers students to achieve their professional goals and aspirations.",
    name: "Dr. Eranga Jayasekara",
    title:
      "Director of Career Guidance Unit, University of Sri Jayewardenepura",
    image: "/img/testimonials/dr_eranga.png",
  },
  {
    quote:
      "The Career Guidance Unit empowers students to achieve their professional goals and aspirations.",
    name: "Mrs. Chathurangani Tennakoon",
    title:
      "Career Adviser of Career Guidance Unit, University of Sri Jayewardenepura",
    image: "/img/testimonials/mrs_chathu.png",
  },
];

export default function Testimonials() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left px-6 ">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col items-start h-full min-h-[112px] md:min-h-[220px] justify-between"
            >
              <p className="text-xl md:text-2xl font-semibold [word-spacing:0.02em]">
                “{t.quote}”
              </p>
              <div className="mt-4 flex items-center gap-3 w-full mb-8 md:mb-0">
                <img
                  alt={t.name}
                  loading="lazy"
                  width={48}
                  height={48}
                  className="size-10 rounded-full object-cover"
                  src={t.image}
                  style={{ color: "transparent" }}
                />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm font-medium whitespace-nowrap">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
