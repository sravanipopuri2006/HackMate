import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Blue / glass theme + hover motion
 * Variants:
 * - "blue"        : Soft blue glass (default)
 * - "gradient"    : Blue gradient pill (CTA-style)
 * - "outlineBlue" : Outlined, subtle hover fill
 * - "glass"       : Neutral glass card-chip
 * - "warning"     : Orange-tint chip
 * - "purple"      : Purple-tint chip
 */
const badgeVariants = cva(
  // Base (small pill, subtle ring, animated hover + shine)
  "relative inline-flex items-center justify-center shrink-0 whitespace-nowrap w-fit " +
    "rounded-full border px-3 py-1 text-xs font-semibold " +
    "transition-all duration-200 ease-out " +
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 " +
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 " +
    "overflow-hidden will-change-transform",
  {
    variants: {
      variant: {
        blue:
          // Soft blue “glass” chip
          "border-white/70 bg-white/85 text-[#1570EF] backdrop-blur-sm " +
          "shadow-sm hover:shadow-md hover:-translate-y-[1px] " +
          // subtle shine
          "before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full " +
          "before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.35),transparent)] " +
          "before:transition-transform before:duration-700",
        gradient:
          // CTA-style gradient
          "border-transparent bg-gradient-to-r from-[#1570EF] to-[#54A7FF] text-white " +
          "shadow-sm hover:shadow-md hover:opacity-95 hover:-translate-y-[1px] ",
        outlineBlue:
          // Outline with gentle hover fill
          "border-[#B7D6FF] text-[#0B2C5E] bg-white/50 backdrop-blur-sm " +
          "hover:bg-[#E9F3FF]/70 hover:shadow-sm",
        glass:
          // Neutral glass (good for metadata)
          "border-white/60 bg-white/70 text-[#183866] backdrop-blur " +
          "hover:shadow-sm hover:-translate-y-[1px]",
        warning:
          "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100",
        purple:
          "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100",
        destructive:
          "border-transparent bg-destructive text-white hover:bg-destructive/90 " +
          "focus-visible:ring-destructive/30",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  }
);

function Badge({ className, variant, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(
        // icon sizing inside badge (kept from your original)
        "[&>svg]:size-3 [&>svg]:pointer-events-none gap-1",
        badgeVariants({ variant }),
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
