import { useEffect, useRef, useState, type CSSProperties } from "react";

type OrbitGalleryItem = {
  src: string;
  title: string;
  alt: string;
};

type OrbitGalleryProps<T extends OrbitGalleryItem> = {
  items: T[];
  eyebrow: string;
  title: string;
  label: string;
  duration?: number;
  reverse?: boolean;
  className?: string;
  onSelect: (item: T) => void;
};

type OrbitItemStyle = CSSProperties & {
  "--orbit-path": string;
  "--orbit-delay": string;
  "--orbit-duration": string;
  "--orbit-direction": "normal" | "reverse";
};

const BASE_WIDTH = 1000;
const BASE_HEIGHT = 680;
const PATH = "M 90 340 A 410 210 0 1 0 910 340 A 410 210 0 1 0 90 340";

export default function OrbitGallery<T extends OrbitGalleryItem>({
  items,
  eyebrow,
  title,
  label,
  duration = 34,
  reverse = false,
  className = "",
  onSelect,
}: OrbitGalleryProps<T>) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateScale = () => {
      setScale(
        Math.min(
          stage.clientWidth / BASE_WIDTH,
          stage.clientHeight / BASE_HEIGHT,
        ),
      );
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`orbit-gallery ${className}`.trim()} ref={stageRef}>
      <div
        className="orbit-gallery-plane"
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div className="orbit-gallery-path" aria-hidden="true" />
        {items.map((item, index) => {
          const style: OrbitItemStyle = {
            "--orbit-path": `path("${PATH}")`,
            "--orbit-delay": `${-(duration * index) / items.length}s`,
            "--orbit-duration": `${duration}s`,
            "--orbit-direction": reverse ? "reverse" : "normal",
          };

          return (
            <button
              className="orbit-gallery-item"
              style={style}
              key={item.src}
              onClick={() => onSelect(item)}
              aria-label={`查看大图：${item.title}`}
            >
              <img src={item.src} alt={item.alt} loading="lazy" draggable={false} />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{label}</b>
              <p>{item.title}</p>
            </button>
          );
        })}
      </div>

      <div className="orbit-gallery-center" aria-hidden="true">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
        <i>HOVER TO PAUSE · CLICK TO VIEW</i>
      </div>
    </div>
  );
}
