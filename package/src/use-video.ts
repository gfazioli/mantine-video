import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseVideoOptions {
  src?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playbackRate?: number;
  volume?: number;
  playing?: boolean;
  onPlayChange?: (playing: boolean) => void;
  currentTime?: number;
  onCurrentTimeChange?: (currentTime: number) => void;
  onVolumeChange?: (volume: number) => void;
  onPlaybackRateChange?: (rate: number) => void;
  onEnded?: () => void;
  onError?: (error: MediaError | null) => void;
  onDurationChange?: (duration: number) => void;
  onEnterPictureInPicture?: () => void;
  onLeavePictureInPicture?: () => void;
  onFullscreenChange?: (fullscreen: boolean) => void;
}

export interface UseVideoReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  playing: boolean;
  paused: boolean;
  ended: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  volume: number;
  muted: boolean;
  playbackRate: number;
  fullscreen: boolean;
  pip: boolean;
  isLoading: boolean;
  error: MediaError | null;
  canPlay: boolean;
  canFullscreen: boolean;
  canPiP: boolean;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  seekBy: (delta: number) => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  requestFullscreen: () => Promise<void>;
  exitFullscreen: () => Promise<void>;
  toggleFullscreen: () => Promise<void>;
  requestPiP: () => Promise<void>;
  exitPiP: () => Promise<void>;
  togglePiP: () => Promise<void>;
}

export function useVideo(options: UseVideoOptions = {}): UseVideoReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volumeState, setVolumeState] = useState(options.volume ?? 1);
  const [mutedState, setMutedState] = useState(options.muted ?? false);
  const [playbackRateState, setPlaybackRateState] = useState(options.playbackRate ?? 1);
  const [ended, setEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<MediaError | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [pip, setPiP] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [canPiP, setCanPiP] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    setCanFullscreen(!!document.fullscreenEnabled);
    setCanPiP(
      (document as Document & { pictureInPictureEnabled?: boolean }).pictureInPictureEnabled === true
    );
  }, []);

  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => {
      setPlaying(true);
      setEnded(false);
      optionsRef.current.onPlayChange?.(true);
    };
    const onPause = () => {
      setPlaying(false);
      optionsRef.current.onPlayChange?.(false);
    };
    const onEnded = () => {
      setEnded(true);
      setPlaying(false);
      optionsRef.current.onEnded?.();
    };
    const onTimeUpdate = () => {
      setCurrentTime(v.currentTime);
      optionsRef.current.onCurrentTimeChange?.(v.currentTime);
    };
    const onDurationChange = () => {
      const d = v.duration || 0;
      setDuration(d);
      optionsRef.current.onDurationChange?.(d);
    };
    const onVolumeChange = () => {
      setVolumeState(v.volume);
      setMutedState(v.muted);
      optionsRef.current.onVolumeChange?.(v.volume);
    };
    const onRateChange = () => {
      setPlaybackRateState(v.playbackRate);
      optionsRef.current.onPlaybackRateChange?.(v.playbackRate);
    };
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsLoading(false);
    const onCanPlay = () => {
      setCanPlay(true);
      setIsLoading(false);
    };
    const onProgress = () => {
      if (v.buffered.length > 0) {
        setBuffered(v.buffered.end(v.buffered.length - 1));
      }
    };
    const onErrorEvent = () => {
      setError(v.error);
      setIsLoading(false);
      optionsRef.current.onError?.(v.error);
    };
    const onEnterPiP = () => {
      setPiP(true);
      optionsRef.current.onEnterPictureInPicture?.();
    };
    const onLeavePiP = () => {
      setPiP(false);
      optionsRef.current.onLeavePictureInPicture?.();
    };

    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnded);
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('durationchange', onDurationChange);
    v.addEventListener('loadedmetadata', onDurationChange);
    v.addEventListener('volumechange', onVolumeChange);
    v.addEventListener('ratechange', onRateChange);
    v.addEventListener('waiting', onWaiting);
    v.addEventListener('playing', onPlaying);
    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('progress', onProgress);
    v.addEventListener('error', onErrorEvent);
    v.addEventListener('enterpictureinpicture', onEnterPiP);
    v.addEventListener('leavepictureinpicture', onLeavePiP);

    // Sync state from the video element in case events fired before listeners attached
    if (Number.isFinite(v.duration) && v.duration > 0) {
      setDuration(v.duration);
    }
    if (v.currentTime > 0) {
      setCurrentTime(v.currentTime);
    }
    if (v.volume !== 1 || v.muted) {
      setVolumeState(v.volume);
      setMutedState(v.muted);
    }
    if (v.playbackRate !== 1) {
      setPlaybackRateState(v.playbackRate);
    }
    if (!v.paused) {
      setPlaying(true);
    }
    if (v.readyState >= 3) {
      setCanPlay(true);
    }
    if (v.buffered.length > 0) {
      setBuffered(v.buffered.end(v.buffered.length - 1));
    }

    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnded);
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('durationchange', onDurationChange);
      v.removeEventListener('loadedmetadata', onDurationChange);
      v.removeEventListener('volumechange', onVolumeChange);
      v.removeEventListener('ratechange', onRateChange);
      v.removeEventListener('waiting', onWaiting);
      v.removeEventListener('playing', onPlaying);
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('progress', onProgress);
      v.removeEventListener('error', onErrorEvent);
      v.removeEventListener('enterpictureinpicture', onEnterPiP);
      v.removeEventListener('leavepictureinpicture', onLeavePiP);
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handler = () => {
      const isFullscreen =
        document.fullscreenElement === containerRef.current ||
        document.fullscreenElement === videoRef.current;
      setFullscreen(isFullscreen);
      optionsRef.current.onFullscreenChange?.(isFullscreen);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  useEffect(() => {
    if (options.playing === undefined) return;
    const v = videoRef.current;
    if (!v) return;
    if (options.playing && v.paused) {
      v.play().catch(() => {});
    } else if (!options.playing && !v.paused) {
      v.pause();
    }
  }, [options.playing]);

  useEffect(() => {
    if (options.currentTime === undefined) return;
    const v = videoRef.current;
    if (!v) return;
    if (Math.abs(v.currentTime - options.currentTime) > 0.5) {
      v.currentTime = options.currentTime;
    }
  }, [options.currentTime]);

  useEffect(() => {
    if (options.volume === undefined) return;
    const v = videoRef.current;
    if (!v) return;
    if (Math.abs(v.volume - options.volume) > 0.01) {
      v.volume = Math.max(0, Math.min(1, options.volume));
    }
  }, [options.volume]);

  useEffect(() => {
    if (options.playbackRate === undefined) return;
    const v = videoRef.current;
    if (!v) return;
    if (v.playbackRate !== options.playbackRate) {
      v.playbackRate = options.playbackRate;
    }
  }, [options.playbackRate]);

  const play = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      await v.play();
    } catch {
      // autoplay blocked or similar — surface via error event
    }
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, []);

  const seek = useCallback((time: number) => {
    const v = videoRef.current;
    if (!v) return;
    const max = Number.isFinite(v.duration) ? v.duration : Infinity;
    v.currentTime = Math.max(0, Math.min(time, max));
  }, []);

  const seekBy = useCallback((delta: number) => {
    const v = videoRef.current;
    if (!v) return;
    const max = Number.isFinite(v.duration) ? v.duration : Infinity;
    v.currentTime = Math.max(0, Math.min(v.currentTime + delta, max));
  }, []);

  const setVolume = useCallback((vol: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = Math.max(0, Math.min(1, vol));
    if (vol > 0 && v.muted) {
      v.muted = false;
    }
  }, []);

  const mute = useCallback(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  const unmute = useCallback(() => {
    if (videoRef.current) videoRef.current.muted = false;
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    if (videoRef.current) videoRef.current.playbackRate = rate;
  }, []);

  const requestFullscreen = useCallback(async () => {
    const c = containerRef.current;
    if (!c) return;
    if (c.requestFullscreen) {
      await c.requestFullscreen();
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      await document.exitFullscreen();
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      const c = containerRef.current;
      if (c?.requestFullscreen) {
        await c.requestFullscreen();
      }
    }
  }, []);

  const requestPiP = useCallback(async () => {
    const v = videoRef.current as HTMLVideoElement & {
      requestPictureInPicture?: () => Promise<void>;
    } | null;
    if (!v?.requestPictureInPicture) return;
    await v.requestPictureInPicture();
  }, []);

  const exitPiP = useCallback(async () => {
    if (typeof document === 'undefined') return;
    const doc = document as Document & {
      pictureInPictureElement?: Element;
      exitPictureInPicture?: () => Promise<void>;
    };
    if (doc.pictureInPictureElement && doc.exitPictureInPicture) {
      await doc.exitPictureInPicture();
    }
  }, []);

  const togglePiP = useCallback(async () => {
    if (typeof document === 'undefined') return;
    const doc = document as Document & {
      pictureInPictureElement?: Element;
      exitPictureInPicture?: () => Promise<void>;
    };
    if (doc.pictureInPictureElement && doc.exitPictureInPicture) {
      await doc.exitPictureInPicture();
    } else {
      const v = videoRef.current as HTMLVideoElement & {
        requestPictureInPicture?: () => Promise<void>;
      } | null;
      if (v?.requestPictureInPicture) {
        await v.requestPictureInPicture();
      }
    }
  }, []);

  return {
    videoRef,
    containerRef,
    playing,
    paused: !playing,
    ended,
    currentTime,
    duration,
    buffered,
    volume: volumeState,
    muted: mutedState,
    playbackRate: playbackRateState,
    fullscreen,
    pip,
    isLoading,
    error,
    canPlay,
    canFullscreen,
    canPiP,
    play,
    pause,
    toggle,
    seek,
    seekBy,
    setVolume,
    mute,
    unmute,
    toggleMute,
    setPlaybackRate,
    requestFullscreen,
    exitFullscreen,
    toggleFullscreen,
    requestPiP,
    exitPiP,
    togglePiP,
  };
}
