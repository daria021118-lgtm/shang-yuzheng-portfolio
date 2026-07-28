import { useEffect, useRef } from "react";

const TITLE_LINES = ["Visual fragments,", "made visible."];
const CHARSET = " .:+*#%@";

export default function AsciiVisualTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const output = outputRef.current;
    if (!container || !output) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let frame = 0;
    let lastRender = 0;
    let visible = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const characterSize = width < 520 ? 5 : 7;
      columns = Math.max(48, Math.floor(width / (characterSize * 0.58)));
      rows = Math.max(20, Math.floor(height / (characterSize * 0.88)));
      canvas.width = columns;
      canvas.height = rows;
      render(0);
    };

    const render = (phase: number) => {
      if (!columns || !rows) return;
      context.clearRect(0, 0, columns, rows);
      context.fillStyle = "#ffffff";
      context.textAlign = "center";
      context.textBaseline = "middle";

      const longestLine = Math.max(...TITLE_LINES.map((line) => line.length));
      const fontSize = Math.max(
        8,
        Math.min(columns / (longestLine * 0.56), rows / 2.55),
      );
      context.font = `700 ${fontSize}px Arial, sans-serif`;
      const lineGap = fontSize * 1.12;
      const firstY = rows / 2 - lineGap / 2;
      TITLE_LINES.forEach((line, index) => {
        context.fillText(line, columns / 2, firstY + index * lineGap);
      });

      const pixels = context.getImageData(0, 0, columns, rows).data;
      let ascii = "";
      for (let y = 0; y < rows; y += 1) {
        const wave = reduceMotion ? 0 : Math.round(Math.sin(phase + y * 0.38) * 1.35);
        for (let x = 0; x < columns; x += 1) {
          const sampleX = Math.min(columns - 1, Math.max(0, x - wave));
          const pixelIndex = (sampleX + y * columns) * 4;
          const alpha = pixels[pixelIndex + 3] / 255;
          if (alpha < 0.05) {
            ascii += " ";
            continue;
          }
          const brightness = pixels[pixelIndex] / 255;
          const characterIndex = Math.min(
            CHARSET.length - 1,
            Math.max(1, Math.floor(alpha * brightness * (CHARSET.length - 1))),
          );
          ascii += CHARSET[characterIndex];
        }
        ascii += "\n";
      }
      output.textContent = ascii;
    };

    const animate = (time: number) => {
      if (visible && !reduceMotion && time - lastRender > 85) {
        render(time * 0.0022);
        lastRender = time;
      }
      frame = window.requestAnimationFrame(animate);
    };

    const moveGradient = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      container.style.setProperty("--ascii-x", `${x}%`);
      container.style.setProperty("--ascii-y", `${y}%`);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(container);
    container.addEventListener("pointermove", moveGradient);
    resize();
    frame = window.requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      container.removeEventListener("pointermove", moveGradient);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ascii-visual-title" ref={containerRef}>
      <h2 className="sr-only">Visual fragments, made visible.</h2>
      <pre ref={outputRef} aria-hidden="true" />
    </div>
  );
}
