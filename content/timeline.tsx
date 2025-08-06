import { cn } from "../app/lib/utils";

type TimelineImage = {
  src: string;
  alt: string;
  className?: string;
};

type TimelineItem = {
  title: string;
  heading: string;
  description: string;
  images: TimelineImage[];
};

const timelineItems: TimelineItem[] = [
  {
    title: "October 2024",
    heading: "Tree Planting Program",
    description:
      "As Phase IV of the Green Hopes project, a Tree Planting Program will be held on October 5th at Nilwalagala Meditation Centre, Algama, in collaboration with Trustus Consultants. Join us in spreading nature’s green touch and building a sustainable tomorrow.",
    images: [
      {
        src: "/img/timeline/tree_1.png",
        alt: "Tree Planting Program",
        className: "aspect-square",
      },
      {
        src: "/img/timeline/tree_2.png",
        alt: "Tree Planting Program",
        className: "aspect-square",
      },
      {
        src: "/img/timeline/tree_3.jpeg",
        alt: "Tree Planting Program",
        className: "aspect-square",
      },
      {
        src: "/img/timeline/tree_4.jpeg",
        alt: "Tree Planting Program",
        className: "aspect-square",
      },
    ],
  },
  {
    title: "September 2024",
    heading: "Beach Cleanup",
    description:
      "Green Hopes Phase III – a meaningful beach cleanup held on September 7th at Wellawatte Beach, in collaboration with Parley Sri Lanka.",
    images: [
      {
        src: "/img/timeline/beach_1.jpg",
        alt: "Beach Cleanup",
        className: "aspect-3/2",
      },
      {
        src: "/img/timeline/beach_2.jpg",
        alt: "Beach Cleanup",
        className: "aspect-3/2",
      },
      {
        src: "/img/timeline/beach_3.jpg",
        alt: "Beach Cleanup",
        className: "aspect-3/2",
      },
      {
        src: "/img/timeline/beach_4.jpg",
        alt: "Beach Cleanup",
        className: "aspect-3/2",
      },
    ],
  },
  {
    title: "July 2024 - September 2024",
    heading: "Nature Photography Competition",
    description:
      "In line with Phase II of the Green Hopes project, we present a nature-themed photography competition capturing the beauty of the environment.",
    images: [
      {
        src: "/img/timeline/photo_1.png",
        alt: "Photography Competition",
        className: "aspect-square",
      },
      {
        src: "/img/timeline/photo_2.png",
        alt: "Photography Competition",
        className: "aspect-square",
      },
      {
        src: "/img/timeline/photo_3.png",
        alt: "Photography Competition",
        className: "aspect-square",
      },
      {
        src: "/img/timeline/photo_4.png",
        alt: "Photography Competition",
        className: "aspect-square",
      },
    ],
  },
  {
    title: "June 2024",
    heading: "Self-Creations: A Greener Nation Through Sustainable Development",
    description:
      "As part of Phase I of the Green Hopes project, an awareness campaign was carried out under the theme 'A Greener Nation Through Sustainable Development'. Participants were invited to submit creative pieces—poems, verses, and articles—centered around environmental themes.",
    images: [
      {
        src: "/img/timeline/cre_1.png",
        alt: "Self-Creations",
        className: "aspect-square",
      },
      {
        src: "/img/timeline/cre_2.png",
        alt: "Self-Creations",
        className: "aspect-square",
      },
      {
        src: "/img/timeline/cre_3.png",
        alt: "Self-Creations",
        className: "aspect-square",
      },
      {
        src: "/img/timeline/cre_4.png",
        alt: "Self-Creations",
        className: "aspect-square",
      },
    ],
  },
  {
    title: "July 2021",
    heading: "Webinar: Innovative Thinking for a Greener Tomorrow",
    description:
      "Green Hopes hosted an awareness session on “Innovative Thinking for a Greener Tomorrow” with Prof. Hemanthi Ranasinghe, highlighting the importance of green innovation and sustainable resource use for a healthier planet. ",
    images: [
      {
        src: "/img/timeline/webinar_1.png",
        alt: "Webinar",
        className: "aspect-1.5/1",
      },
    ],
  },
  {
    title: "May 2020",
    heading: "Free Advertising Service for Eco-Friendly Products",
    description:
      "As part of the Green Hopes initiative, a free advertising service was offered through our Facebook page to promote eco-friendly products and services. This campaign successfully supported sustainable businesses and encouraged environmentally conscious consumer choices.",
    images: [
      {
        src: "/img/timeline/ads_1.png",
        alt: "Free Advertising",
        className: "aspect-square",
      },
      {
        src: "/img/timeline/ads_2.png",
        alt: "Free Advertising",
        className: "aspect-square",
      },
    ],
  },
  {
    title: "May 2020",
    heading: "Free Consulting Service Regarding Growing Plants",
    description:
      "Green Hopes conducted a free consulting service to guide individuals on effective plant growing techniques. This initiative aimed to encourage home gardening and promote sustainable green practices within the community.",
    images: [
      {
        src: "/img/timeline/consult_1.png",
        alt: "Free Consulting",
        className: "aspect-square",
      },
    ],
  },
  {
    title: "May 2020",
    heading: "එයයි මමයි Tree Plantation Competition",
    description:
      "Green Hopes successfully organized a Tree Plantation Campaign to promote reforestation and environmental conservation. Participants joined hands to plant trees, contributing to a greener, healthier future for all.",
    images: [
      {
        src: "/img/timeline/eyai_mamai_1.png",
        alt: "Tree Plantation",
        className: "aspect-square",
      },
      {
        src: "/img/timeline/eyai_mamai_2.png",
        alt: "Tree Plantation",
        className: "aspect-square",
      },
    ],
  },
];

// Usage example:
export const timelineData = timelineItems.map((item) => ({
  title: item.title,
  content: (
    <div>
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 leading-tight">
        {item.heading}
      </h3>
      <p className="mb-8 text-xs font-normal md:text-sm ">{item.description}</p>
      <div className="grid grid-cols-2 gap-4">
        {item.images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.alt}
            width={500}
            height={500}
            className={cn("rounded-lg object-cover shadow-lg", img.className)}
          />
        ))}
      </div>
    </div>
  ),
}));
