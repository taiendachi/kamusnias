import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Render children hanya saat elemen mendekati viewport (IntersectionObserver).
 * Membantu menunda mount komponen berat / chunk yang di-`lazy()`.
 */
export function LazyInView({
  children,
  rootMargin = "300px",
  minHeight = 160,
}: {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible || typeof IntersectionObserver === "undefined") {
      if (typeof IntersectionObserver === "undefined") setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
