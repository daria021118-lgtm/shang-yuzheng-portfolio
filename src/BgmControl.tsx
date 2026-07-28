import { useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function BgmControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [dragging, setDragging] = useState(false);
  const [stretch, setStretch] = useState(0);
  const [stretchSide, setStretchSide] = useState<"left" | "right">("right");
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;

    const attemptPlayback = async () => {
      try {
        await audio.play();
        setPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        setPlaying(false);
        setAutoplayBlocked(true);
      }
    };

    void attemptPlayback();
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const updateVolume = (event: React.PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;
    const audio = audioRef.current;
    if (!slider || !audio) return;
    const bounds = slider.getBoundingClientRect();
    const raw = (event.clientX - bounds.left) / bounds.width;
    const nextVolume = Math.round(clamp(raw, 0, 1) * 100);
    const overflow =
      raw < 0 ? Math.abs(raw) * bounds.width : raw > 1 ? (raw - 1) * bounds.width : 0;

    setStretchSide(raw < 0 ? "left" : "right");
    setStretch(clamp(overflow, 0, 34));
    setVolume(nextVolume);
    audio.volume = nextVolume / 100;
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    updateVolume(event);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) updateVolume(event);
  };

  const release = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
    setStretch(0);
  };

  const onSliderKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const nextVolume = clamp(
      volume + (event.key === "ArrowRight" ? 5 : -5),
      0,
      100,
    );
    setVolume(nextVolume);
    if (audioRef.current) audioRef.current.volume = nextVolume / 100;
  };

  return (
    <div
      className={`bgm-control ${playing ? "is-playing" : ""} ${autoplayBlocked ? "needs-action" : ""}`}
    >
      <audio
        ref={audioRef}
        src="/daria-bgm.mp3"
        preload="auto"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        className="bgm-toggle"
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? "暂停背景音乐" : "播放背景音乐"}
        aria-pressed={playing}
      >
        <span className="music-note">♫</span>
        <span className="equalizer" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>

      <div className="bgm-panel">
        <div className="bgm-label">
          <span>{autoplayBlocked ? "CLICK TO PLAY" : playing ? "BGM ON" : "BGM OFF"}</span>
          <b>{volume}%</b>
        </div>
        <div
          className="elastic-volume"
          ref={sliderRef}
          role="slider"
          tabIndex={0}
          aria-label="背景音乐音量"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={volume}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={release}
          onPointerCancel={release}
          onLostPointerCapture={() => {
            setDragging(false);
            setStretch(0);
          }}
          onKeyDown={onSliderKeyDown}
        >
          <div
            className="elastic-volume-track"
            style={{
              transform: `scaleX(${1 + stretch / 130}) scaleY(${1 - stretch / 220})`,
              transformOrigin: stretchSide === "left" ? "right center" : "left center",
            }}
          >
            <span style={{ width: `${volume}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
