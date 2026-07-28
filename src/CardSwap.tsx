import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export type CardSwapProps = {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
};

export type SwapCardProps = React.HTMLAttributes<HTMLDivElement>;

export const SwapCard = forwardRef<HTMLDivElement, SwapCardProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`swap-card ${className ?? ""}`.trim()}
    />
  ),
);

SwapCard.displayName = "SwapCard";

type CardRef = RefObject<HTMLDivElement | null>;

type Slot = {
  x: number;
  y: number;
  z: number;
  zIndex: number;
};

const makeSlot = (
  index: number,
  distanceX: number,
  distanceY: number,
  total: number,
): Slot => ({
  x: index * distanceX,
  y: -index * distanceY,
  z: -index * distanceX * 1.5,
  zIndex: total - index,
});

const placeNow = (element: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

export default function CardSwap({
  width = 500,
  height = 520,
  cardDistance = 44,
  verticalDistance = 54,
  delay = 4300,
  pauseOnHover = true,
  skewAmount = 4,
  easing = "elastic",
  children,
}: CardSwapProps) {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          drop: 1.7,
          move: 1.7,
          back: 1.7,
          overlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          drop: 0.75,
          move: 0.75,
          back: 0.75,
          overlap: 0.45,
          returnDelay: 0.2,
        };

  const cards = useMemo(
    () => Children.toArray(children) as ReactElement<SwapCardProps>[],
    [children],
  );
  const refs = useMemo<CardRef[]>(
    () => cards.map(() => React.createRef<HTMLDivElement>()),
    [cards.length],
  );
  const order = useRef<number[]>(cards.map((_, index) => index));
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const interval = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((cardRef, index) => {
      if (cardRef.current) {
        placeNow(
          cardRef.current,
          makeSlot(index, cardDistance, verticalDistance, total),
          skewAmount,
        );
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const frontElement = refs[front].current;
      if (!frontElement) return;

      const nextTimeline = gsap.timeline();
      timeline.current = nextTimeline;
      nextTimeline.to(frontElement, {
        y: "+=520",
        duration: config.drop,
        ease: config.ease,
      });
      nextTimeline.addLabel(
        "promote",
        `-=${config.drop * config.overlap}`,
      );

      rest.forEach((cardIndex, index) => {
        const element = refs[cardIndex].current;
        if (!element) return;
        const slot = makeSlot(
          index,
          cardDistance,
          verticalDistance,
          refs.length,
        );
        nextTimeline.set(element, { zIndex: slot.zIndex }, "promote");
        nextTimeline.to(
          element,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.move,
            ease: config.ease,
          },
          `promote+=${index * 0.13}`,
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length,
      );
      nextTimeline.addLabel(
        "return",
        `promote+=${config.move * config.returnDelay}`,
      );
      nextTimeline.call(
        () => gsap.set(frontElement, { zIndex: backSlot.zIndex }),
        undefined,
        "return",
      );
      nextTimeline.to(
        frontElement,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.back,
          ease: config.ease,
        },
        "return",
      );
      nextTimeline.call(() => {
        order.current = [...rest, front];
      });
    };

    const start = () => {
      window.clearInterval(interval.current);
      interval.current = window.setInterval(swap, delay);
    };
    const pause = () => {
      timeline.current?.pause();
      window.clearInterval(interval.current);
    };
    const resume = () => {
      timeline.current?.play();
      start();
    };

    start();
    const node = container.current;
    if (pauseOnHover && node) {
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
    }

    return () => {
      window.clearInterval(interval.current);
      timeline.current?.kill();
      if (node) {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
      }
    };
  }, [
    cardDistance,
    config.back,
    config.drop,
    config.ease,
    config.move,
    config.overlap,
    config.returnDelay,
    delay,
    pauseOnHover,
    refs,
    skewAmount,
  ]);

  return (
    <div
      className="card-swap-container"
      ref={container}
      style={{ width, height }}
    >
      {cards.map((card, index) =>
        isValidElement<SwapCardProps>(card)
          ? cloneElement(card, {
              key: index,
              ref: refs[index],
              style: { width, height, ...card.props.style },
            } as SwapCardProps & React.RefAttributes<HTMLDivElement>)
          : card,
      )}
    </div>
  );
}
