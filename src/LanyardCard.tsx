import { useEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function LanyardCard() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<HTMLDivElement>(null);
  const position = useRef<Point>({ x: 0, y: 0 });
  const velocity = useRef<Point>({ x: 0, y: 0 });
  const pointerStart = useRef<Point>({ x: 0, y: 0 });
  const positionStart = useRef<Point>({ x: 0, y: 0 });
  const animation = useRef(0);
  const [dragging, setDragging] = useState(false);

  const renderPosition = (next: Point, velocityX = 0) => {
    position.current = next;
    const card = cardRef.current;
    const cord = cordRef.current;
    const stage = stageRef.current;
    if (!card || !cord || !stage) return;

    const angle = clamp(next.x * 0.025 + velocityX * 0.18, -13, 13);
    card.style.transform = `translate(calc(-50% + ${next.x}px), calc(-50% + ${next.y}px)) rotate(${angle}deg)`;

    const bounds = stage.getBoundingClientRect();
    const baseCardTop = bounds.height * 0.5 - Math.min(235, bounds.height * 0.34);
    const targetY = Math.max(72, baseCardTop + next.y + 12);
    const length = Math.hypot(next.x, targetY);
    const cordAngle = -Math.atan2(next.x, targetY) * (180 / Math.PI);
    cord.style.height = `${length}px`;
    cord.style.transform = `translateX(-50%) rotate(${cordAngle}deg)`;
  };

  const settle = () => {
    cancelAnimationFrame(animation.current);
    const tick = () => {
      const current = position.current;
      velocity.current.x += -current.x * 0.026;
      velocity.current.y += -current.y * 0.026;
      velocity.current.x *= 0.9;
      velocity.current.y *= 0.9;

      const next = {
        x: current.x + velocity.current.x,
        y: current.y + velocity.current.y,
      };
      renderPosition(next, velocity.current.x);

      const moving =
        Math.abs(next.x) +
          Math.abs(next.y) +
          Math.abs(velocity.current.x) +
          Math.abs(velocity.current.y) >
        0.6;

      if (moving) {
        animation.current = requestAnimationFrame(tick);
      } else {
        velocity.current = { x: 0, y: 0 };
        renderPosition({ x: 0, y: 0 });
      }
    };
    animation.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    renderPosition({ x: 0, y: 0 });
    const resize = () => renderPosition(position.current);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animation.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    let lastScrollY = window.scrollY;
    let scrollFrame = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      if (dragging) return;

      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const bounds = stage.getBoundingClientRect();
        const visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
        if (!visible || Math.abs(scrollDelta) < 0.2) return;

        const kick = clamp(scrollDelta * 0.035, -2.2, 2.2);
        velocity.current.y = clamp(
          velocity.current.y - kick * 0.9,
          -4,
          4,
        );
        velocity.current.x = clamp(
          velocity.current.x + Math.sin(currentScrollY * 0.016) * 0.35,
          -2,
          2,
        );

        const next = {
          x: clamp(position.current.x + velocity.current.x * 0.25, -7, 7),
          y: clamp(position.current.y - kick * 1.45, -10, 10),
        };
        renderPosition(next, velocity.current.x);
        settle();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dragging]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(animation.current);
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStart.current = { x: event.clientX, y: event.clientY };
    positionStart.current = { ...position.current };
    velocity.current = { x: 0, y: 0 };
    setDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const next = {
      x: clamp(
        positionStart.current.x + event.clientX - pointerStart.current.x,
        -bounds.width * 0.3,
        bounds.width * 0.3,
      ),
      y: clamp(
        positionStart.current.y + event.clientY - pointerStart.current.y,
        -45,
        bounds.height * 0.2,
      ),
    };
    velocity.current = {
      x: next.x - position.current.x,
      y: next.y - position.current.y,
    };
    renderPosition(next, velocity.current.x);
  };

  const release = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
    settle();
  };

  return (
    <div className="lanyard-stage" ref={stageRef}>
      <div className="lanyard-anchor">
        <span />
      </div>
      <div className="lanyard-cord" ref={cordRef}>
        <span />
      </div>
      <div
        className={`lanyard-id ${dragging ? "is-dragging" : ""}`}
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        role="img"
        aria-label="可拖动的 Daria 主题人物证件牌"
      >
        <div className="lanyard-clip">
          <i />
        </div>
        <div className="lanyard-photo">
          <img src="/daria-character-cutout.png" alt="Daria 主题人物胸像" />
          <span>DARIA_UNIT_01</span>
        </div>
        <div className="lanyard-info">
          <div>
            <p>尚雨正 / DARIA</p>
            <span>CREATIVE OPERATIONS</span>
          </div>
          <b>01</b>
        </div>
        <div className="lanyard-code">
          <span />
          CONTENT · DATA · AI
        </div>
      </div>
      <p className="lanyard-hint">DRAG THE ID · RELEASE TO SWING</p>
    </div>
  );
}
