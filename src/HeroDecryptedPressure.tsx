import { useEffect, useRef, useState } from "react";

const lines = ["Daria’s", "space"];
const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+?";
const characterCount = lines.join("").length;

const distance = (
  first: { x: number; y: number },
  second: { x: number; y: number },
) => Math.hypot(second.x - first.x, second.y - first.y);

export default function HeroDecryptedPressure() {
  const [revealed, setRevealed] = useState(0);
  const [tick, setTick] = useState(0);
  const [complete, setComplete] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const characterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setRevealed(characterCount);
      setComplete(true);
      return;
    }

    let currentTick = 0;
    const interval = window.setInterval(() => {
      currentTick += 1;
      setTick(currentTick);
      setRevealed(Math.min(characterCount, Math.floor(currentTick / 2)));

      if (Math.floor(currentTick / 2) >= characterCount) {
        window.clearInterval(interval);
        window.setTimeout(() => setComplete(true), 120);
      }
    }, 48);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!complete) return;
    const title = titleRef.current;
    if (!title) return;

    const bounds = title.getBoundingClientRect();
    const target = {
      x: bounds.left + bounds.width * 0.45,
      y: bounds.top + bounds.height * 0.5,
    };
    const smoothed = { ...target };
    let animation = 0;

    const move = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const animate = () => {
      smoothed.x += (target.x - smoothed.x) / 12;
      smoothed.y += (target.y - smoothed.y) / 12;
      const currentTitle = titleRef.current;

      if (currentTitle) {
        const titleBounds = currentTitle.getBoundingClientRect();
        const maxDistance = Math.max(titleBounds.width * 0.55, 280);

        characterRefs.current.forEach((character) => {
          if (!character) return;
          const rect = character.getBoundingClientRect();
          const proximity = Math.max(
            0,
            1 -
              distance(smoothed, {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              }) /
                maxDistance,
          );
          const weight = Math.round(260 + proximity * 740);
          const width = Math.round(72 + proximity * 78);
          character.style.fontVariationSettings = `'opsz' 96, 'wght' ${weight}, 'wdth' ${width}`;
          character.style.transform = `scaleY(${0.94 + proximity * 0.1})`;
        });
      }

      animation = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move);
    animation = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("pointermove", move);
    };
  }, [complete]);

  let globalIndex = 0;

  return (
    <h1
      className={`hero-pressure-title ${complete ? "is-decrypted" : "is-decrypting"}`}
      ref={titleRef}
      aria-label="Daria’s space"
    >
      {lines.map((line, lineIndex) => (
        <span
          className={`pressure-line ${lineIndex === 1 ? "pressure-line-outline" : ""}`}
          key={line}
          aria-hidden="true"
        >
          {line.split("").map((character) => {
            const characterIndex = globalIndex;
            globalIndex += 1;
            const visible =
              characterIndex < revealed
                ? character
                : glyphs[(tick + characterIndex * 7) % glyphs.length];

            return (
              <span
                className="pressure-character"
                key={`${lineIndex}-${characterIndex}`}
                ref={(element) => {
                  characterRefs.current[characterIndex] = element;
                }}
              >
                {visible}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
