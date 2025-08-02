import React from "react";
import type { ReactNode } from "react";

interface TimelineEntry {
  title: string;
  content: ReactNode;
}

type TimelineProps = {
  data: TimelineEntry[];
};

export const TimelineCard = ({ data }: TimelineProps) => {
  return (
    <div className="w-full">
      <div className="relative max-w-[1216px] mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-32 md:pt-40 md:gap-10"
          >
            <div className="flex flex-col md:flex-row z-40 items-center self-start">
              <div className="size-6 rounded-full flex items-center justify-center border border-border">
                <div className="size-3 rounded-full border bg-muted" />
              </div>
            </div>
            <div className="relative pl-10 pr-4 md:pl-4 w-full">
              <h3 className=" block text-2xl md:text-5xl mb-4 -mt-1 text-left font-bold">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          className="absolute left-2.75 top-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent rounded-full"
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
};
