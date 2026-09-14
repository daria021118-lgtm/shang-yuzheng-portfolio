import { useEffect, useRef, useState, type CSSProperties } from "react";

const defaultPhrases = ["把考试热点", "转化为", "持续更新的内容选题。"];

type FocusRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type TrueFocusTitleProps = {
  phrases?: string[];
  className?: string;
};

export default function TrueFocusTitle({
  phrases = defaultPhrases,
  className = "",
}: TrueFocusTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focusRect, setFocusRect] = useState<FocusRect | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % phrases.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    const activeWord = wordRefs.current[activeIndex];
    if (!container || !activeWord) return;

    const updateFrame = () => {
      const parentRect = container.getBoundingClientRect();
      const wordRect = activeWord.getBoundingClientRect();
      setFocusRect({
        x: wordRect.left - parentRect.left,
        y: wordRect.top - parentRect.top,
        width: wordRect.width,
        height: wordRect.height,
      });
    };

    updateFrame();
    const observer = new ResizeObserver(updateFrame);
    observer.observe(container);
    return () => observer.disconnect();
  }, [activeIndex]);

  const frameStyle: CSSProperties | undefined = focusRect
    ? {
        width: focusRect.width,
        height: focusRect.height,
        transform: `translate(${focusRect.x}px, ${focusRect.y}px)`,
        opacity: 1,
      }
    : undefined;

  return (
    <h3
      className={`true-focus-title ${className}`.trim()}
      ref={containerRef}
      onMouseLeave={() => setPaused(false)}
    >
      {phrases.map((phrase, index) => (
        <span
          className={`true-focus-word ${activeIndex === index ? "is-active" : ""}`}
          ref={(element) => {
            wordRefs.current[index] = element;
          }}
          key={phrase}
          onMouseEnter={() => {
            setPaused(true);
            setActiveIndex(index);
          }}
          onFocus={() => {
            setPaused(true);
            setActiveIndex(index);
          }}
          onBlur={() => setPaused(false)}
          tabIndex={0}
        >
          {phrase}
        </span>
      ))}

      <span className="true-focus-frame" style={frameStyle} aria-hidden="true">
        <i className="true-focus-corner corner-top-left" />
        <i className="true-focus-corner corner-top-right" />
        <i className="true-focus-corner corner-bottom-left" />
        <i className="true-focus-corner corner-bottom-right" />
      </span>
    </h3>
  );
}
