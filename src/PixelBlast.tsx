import { useEffect, useRef } from "react";

type Ripple = {
  x: number;
  y: number;
  born: number;
};

export function PixelBlast() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ripples: Ripple[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const addRipple = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      ripples.push({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        born: performance.now(),
      });
      if (ripples.length > 6) ripples.shift();
    };

    const dragRipple = (event: PointerEvent) => {
      if (event.buttons === 1) addRipple(event);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const step = width < 680 ? 18 : 22;
      const square = width < 680 ? 3 : 4;
      const clusters = [
        { x: 0.16, y: 0.2, radius: 0.2 },
        { x: 0.58, y: 0.3, radius: 0.26 },
        { x: 0.82, y: 0.76, radius: 0.28 },
        { x: 0.22, y: 0.79, radius: 0.2 },
      ];

      for (let y = step / 2; y < height; y += step) {
        for (let x = step / 2; x < width; x += step) {
          const normalizedX = x / Math.max(width, 1);
          const normalizedY = y / Math.max(height, 1);
          const texture =
            0.72 +
            Math.sin(x * 0.021 + time * 0.00024) * 0.18 +
            Math.sin(y * 0.027 - time * 0.00018) * 0.1;
          let energy = 0;

          clusters.forEach((cluster, index) => {
            const distance = Math.hypot(
              normalizedX - cluster.x,
              normalizedY - cluster.y,
            );
            const breathe =
              cluster.radius *
              (1 + Math.sin(time * 0.0003 + index * 1.7) * 0.08);
            const field = Math.max(0, 1 - distance / breathe);
            energy += field * field * texture * 0.8;
          });

          for (const ripple of ripples) {
            const age = (time - ripple.born) / 1000;
            const distance = Math.hypot(x - ripple.x, y - ripple.y);
            const ring = Math.abs(distance - age * 180);
            if (age < 2.4 && ring < 24) {
              energy += (1 - ring / 24) * (1 - age / 2.4) * 0.9;
            }
          }

          if (energy < 0.08) continue;
          context.fillStyle = `rgba(180, 151, 207, ${Math.min(0.72, energy)})`;
          context.fillRect(x, y, square, square);
        }
      }

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        if (time - ripples[index].born > 2400) ripples.splice(index, 1);
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", addRipple);
    window.addEventListener("pointermove", dragRipple);

    if (reducedMotion) draw(0);
    else frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", addRipple);
      window.removeEventListener("pointermove", dragRipple);
    };
  }, []);

  return <canvas className="pixel-blast" ref={canvasRef} aria-hidden="true" />;
}
