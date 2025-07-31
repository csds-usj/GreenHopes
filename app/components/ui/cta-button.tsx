import { Button } from "~/components/ui/button";
import React from "react";
import { cn } from "~/lib/utils";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";

export const CtaButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    variant?: "primary" | "secondary";
  }
>(({ variant = "primary", className, children, ...props }, ref) => {
  const primaryClasses =
    "gap-2 px-6 py-6 text-lg font-semibold rounded-full bg-primary text-primary-foreground border border-border transition-colors duration-200 flex items-center group";
  const secondaryClasses =
    "items-center absolute rounded-full border border-white/50 text-sm font-medium ring-1 ring-gray-800/[.075] backdrop-blur-xl px-6 py-6";

  return (
    <Button
      ref={ref}
      className={cn(
        variant === "primary" ? primaryClasses : secondaryClasses,
        className
      )}
      style={
        variant === "secondary" ? { background: "var(--nav-gradient)" } : {}
      }
      {...props}
    >
      {children}
      {variant === "primary" ? (
        <span className="flex items-center opacity-50 group-hover:opacity-100 transition-opacity">
          <ChevronRightIcon className="w-0 group-hover:w-2.5 h-3 translate-x-2.5 ease-out duration-200 transition-all transform-gpu" />
        </span>
      ) : (
        <ChevronRightIcon className="w-0 group-hover:w-2.5 h-3 translate-x-2.5 ease-out duration-200 transition-all transform-gpu" />
      )}
    </Button>
  );
});
