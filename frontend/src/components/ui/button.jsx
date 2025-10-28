import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Blue-glass themed button system
 * Variants:
 * - "blue" (default): Soft blue glass look
 * - "gradient": Full CTA gradient
 * - "outlineBlue": Transparent with blue border
 * - "glass": Frosted glass look
 * - "ghost": Minimal text button
 * - "danger": Red warning button
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 " +
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none " +
    "focus-visible:ring-2 focus-visible:ring-[#1570EF]/40 focus-visible:ring-offset-1 " +
    "active:scale-[0.97] transform-gpu",
  {
    variants: {
      variant: {
        blue:
          // Glassy blue primary
          "bg-white/70 text-[#0B2C5E] border border-white/60 backdrop-blur-sm " +
          "hover:bg-[#E9F3FF]/80 hover:text-[#1570EF] shadow-[0_2px_10px_rgba(21,112,239,0.15)] " +
          "hover:shadow-[0_4px_14px_rgba(21,112,239,0.25)]",
        gradient:
          // Full gradient button
          "bg-gradient-to-r from-[#1570EF] to-[#54A7FF] text-white shadow-md " +
          "hover:shadow-lg hover:opacity-95 hover:-translate-y-[1px] ",
        outlineBlue:
          // Minimal outline, fills on hover
          "border border-[#1570EF]/40 text-[#0B2C5E] bg-white/40 " +
          "hover:bg-[#E9F3FF]/60 hover:text-[#1570EF] hover:shadow-[0_3px_10px_rgba(21,112,239,0.2)]",
        glass:
          // Neutral frosted glass (for subtle actions)
          "border border-white/50 bg-white/60 backdrop-blur-sm text-[#0B2C5E] " +
          "hover:bg-white/80 hover:shadow-[0_3px_10px_rgba(21,112,239,0.1)]",
        ghost:
          // Text-only button
          "text-[#1570EF] hover:bg-[#EAF3FF]/60 hover:text-[#0B2C5E] rounded-lg",
        danger:
          // Red warning button
          "bg-[#F87171] text-white hover:bg-[#DC2626] shadow-sm hover:shadow-md",
        link:
          // Looks like link
          "text-[#1570EF] underline-offset-4 hover:underline font-medium px-0",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs rounded-lg",
        lg: "h-11 px-7 text-base",
        icon: "size-9 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
