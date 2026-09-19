import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils"

const LOADING_DELAY = 1500;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, onClick, type, disabled, children, ...props }, ref) => {
  const [pending, setPending] = React.useState(false);

  const handleClick = (e) => {
    window.dispatchEvent(new CustomEvent("loadingbar:trigger"));
    if (asChild) {
      onClick?.(e);
      return;
    }
    if (pending) {
      e.preventDefault();
      return;
    }
    const isSubmit = type === "submit" || (!type && !!e.currentTarget.form);
    if (isSubmit) {
      e.preventDefault();
      const form = e.currentTarget.form;
      setPending(true);
      window.setTimeout(() => {
        if (form) form.requestSubmit();
        setPending(false);
      }, LOADING_DELAY);
      return;
    }
    if (onClick) {
      e.preventDefault();
      setPending(true);
      window.setTimeout(() => {
        onClick(e);
        setPending(false);
      }, LOADING_DELAY);
      return;
    }
    onClick?.(e);
  };

  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      onClick={handleClick}
      disabled={disabled || pending}
      type={type}
      {...props}
    >
      {pending
        ? (size === "icon"
            ? <Loader2 className="h-4 w-4 animate-spin" />
            : <><Loader2 className="h-4 w-4 animate-spin" />{children}</>)
        : children}
    </Comp>)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }