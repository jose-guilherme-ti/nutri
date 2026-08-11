import React, { useEffect, useState } from "react";

export default function Counter({ target, suffix = "", decimals = 0, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) return;

    const element = document.getElementById(`counter-${target}`);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();

          const startTime = performance.now();

          const animate = (currentTime) => {
            const progress = Math.min(
              (currentTime - startTime) / duration,
              1
            );

            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(target * easeOut);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [started, target, duration]);
  return (
    <strong id={`counter-${target}`}>
      {count.toFixed(decimals)}
      {suffix}
    </strong>
  );
}