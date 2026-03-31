import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AIAIAI page container:
 *   max-width 1440px · px 112px desktop → 32px tablet → 16px mobile
 *   → content width 1216px on a 1440px screen
 */
export default function Container({ children, className, style }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        "px-4 sm:px-8 lg:px-[112px]",
        className
      )}
      style={{ maxWidth: 1440, ...style }}
    >
      {children}
    </div>
  );
}
