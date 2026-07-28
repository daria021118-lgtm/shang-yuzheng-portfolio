import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const firstLine = ["Meet", "the", "mind"];
const secondLine = ["behind", "the", "screen."];

export default function FallingAboutTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [started, setStarted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.38 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title || !started || reduceMotion) return;

    const containerRect = container.getBoundingClientRect();
    const words = Array.from(
      title.querySelectorAll<HTMLElement>(".falling-about-word"),
    );
    const engine = Matter.Engine.create();
    engine.gravity.y = 0.78;

    const boundaryOptions: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      render: { visible: false },
    };
    const floor = Matter.Bodies.rectangle(
      containerRect.width / 2,
      containerRect.height + 22,
      containerRect.width,
      44,
      boundaryOptions,
    );
    const ceiling = Matter.Bodies.rectangle(
      containerRect.width / 2,
      -22,
      containerRect.width,
      44,
      boundaryOptions,
    );
    const leftWall = Matter.Bodies.rectangle(
      -22,
      containerRect.height / 2,
      44,
      containerRect.height,
      boundaryOptions,
    );
    const rightWall = Matter.Bodies.rectangle(
      containerRect.width + 22,
      containerRect.height / 2,
      44,
      containerRect.height,
      boundaryOptions,
    );

    const wordBodies = words.map((word, index) => {
      const rect = word.getBoundingClientRect();
      const body = Matter.Bodies.rectangle(
        rect.left - containerRect.left + rect.width / 2,
        rect.top - containerRect.top + rect.height / 2,
        rect.width + 4,
        rect.height + 3,
        {
          restitution: 0.58,
          friction: 0.16,
          frictionAir: 0.012,
          chamfer: { radius: Math.min(8, rect.height * 0.12) },
          render: { visible: false },
        },
      );

      Matter.Body.setVelocity(body, {
        x: (index - (words.length - 1) / 2) * 0.12,
        y: -0.35 * index,
      });
      Matter.Body.setAngularVelocity(body, (index % 2 === 0 ? -1 : 1) * 0.006);
      word.style.position = "absolute";
      word.style.margin = "0";
      return { word, body };
    });

    Matter.Composite.add(engine.world, [
      floor,
      ceiling,
      leftWall,
      rightWall,
      ...wordBodies.map(({ body }) => body),
    ]);

    const syncWords = () => {
      wordBodies.forEach(({ word, body }) => {
        word.style.left = `${body.position.x}px`;
        word.style.top = `${body.position.y}px`;
        word.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
    };

    const disturbWords = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const pointer = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      wordBodies.forEach(({ body }) => {
        const delta = Matter.Vector.sub(body.position, pointer);
        const distance = Math.max(18, Matter.Vector.magnitude(delta));
        if (distance > 150) return;
        const direction = Matter.Vector.normalise(delta);
        const strength = (1 - distance / 150) * 0.0022 * body.mass;
        Matter.Body.applyForce(
          body,
          body.position,
          Matter.Vector.mult(direction, strength),
        );
      });
    };

    Matter.Events.on(engine, "afterUpdate", syncWords);
    container.addEventListener("pointermove", disturbWords);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    syncWords();

    return () => {
      container.removeEventListener("pointermove", disturbWords);
      Matter.Events.off(engine, "afterUpdate", syncWords);
      Matter.Runner.stop(runner);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [started, reduceMotion]);

  const renderLine = (words: string[], highlightLast = false) =>
    words.map((word, index) => (
      <span key={word + index}>
        <span
          className={`falling-about-word ${
            highlightLast && index === words.length - 1
              ? "falling-about-highlight"
              : ""
          }`}
        >
          {highlightLast && index === words.length - 1 ? <em>{word}</em> : word}
        </span>
        {index < words.length - 1 ? " " : ""}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className={`falling-about-title ${started && !reduceMotion ? "is-active" : ""}`}
    >
      <h2 ref={titleRef}>
        {renderLine(firstLine)}
        <br />
        {renderLine(secondLine, true)}
      </h2>
      <span className="falling-about-hint" aria-hidden="true">
        MOVE TO DISTURB
      </span>
    </div>
  );
}
