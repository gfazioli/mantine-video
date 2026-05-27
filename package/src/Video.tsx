import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  Factory,
  factory,
  getRadius,
  getThemeColor,
  StylesApiProps,
  useProps,
  useStyles,
  type MantineColor,
  type MantineRadius,
  type MantineSize,
} from '@mantine/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { VideoCaptionsButton } from './components/VideoCaptionsButton';
import { VideoControls } from './components/VideoControls';
import { VideoFullscreenButton } from './components/VideoFullscreenButton';
import { VideoMuteButton } from './components/VideoMuteButton';
import { VideoPiPButton } from './components/VideoPiPButton';
import { VideoPlayButton } from './components/VideoPlayButton';
import { VideoSkipButton } from './components/VideoSkipButton';
import { VideoTimeDisplay } from './components/VideoTimeDisplay';
import { VideoTimeline } from './components/VideoTimeline';
import { useVideo } from './use-video';
import { VideoProvider } from './Video.context';
import classes from './Video.module.css';

export type VideoVariant = 'overlay' | 'minimal' | 'floating' | 'bordered';

export type VideoStylesNames =
  | 'root'
  | 'video'
  | 'controls'
  | 'controlBar'
  | 'playButton'
  | 'timeline'
  | 'timelineTrack'
  | 'timelineBuffered'
  | 'timelineFill'
  | 'timelineThumb'
  | 'timelineMarkers'
  | 'timeDisplay'
  | 'muteButton'
  | 'fullscreenButton'
  | 'pipButton'
  | 'captionsButton'
  | 'skipButton'
  | 'iconButton'
  | 'backgroundMuteButton';

export type VideoCssVariables = {
  root:
    | '--video-color'
    | '--video-radius'
    | '--video-bg'
    | '--video-controls-bg'
    | '--video-controls-height'
    | '--video-controls-text-color'
    | '--video-timeline-color'
    | '--video-timeline-thumb-color';
};

/**
 * A single entry in the {@link VideoBaseProps.sources} list — rendered as a
 * native `<source>` child of the `<video>` element. The browser picks the
 * first one it can play (optionally narrowed by `media`), which is the
 * standard cross-browser / adaptive-delivery mechanism.
 */
export interface VideoSource {
  /** Source URL. */
  src: string;

  /**
   * MIME type (and optional codecs), e.g. `'video/webm'`,
   * `'video/mp4; codecs="avc1.42E01E"'`. Lets the browser skip formats it
   * can't decode without fetching them.
   */
  type?: string;

  /**
   * Optional media query for adaptive selection, e.g. `'(max-width: 600px)'`.
   * The browser uses the first source whose `media` matches (entries without
   * `media` always match).
   */
  media?: string;
}

export interface VideoBaseProps {
  /** Single video source URL. Ignored when `sources` is provided. */
  src?: string;

  /**
   * Multiple sources rendered as `<source>` children. The browser selects
   * the first playable entry (cross-browser / adaptive streaming). Takes
   * precedence over `src` when non-empty.
   */
  sources?: VideoSource[];

  /**
   * Fallback URL loaded when every `src` / `sources` entry fails at runtime
   * (404, decode error, …). Mirrors Mantine `Image`'s `fallbackSrc`. Tried
   * at most once per mount.
   */
  fallbackSrc?: string;

  /** Poster image displayed before playback starts */
  poster?: string;

  /** Render the default control bar; set to `false` to bring your own children */
  controls?: boolean;

  /** Auto-play (browsers usually require `muted` for this to work) */
  autoPlay?: boolean;

  /** Mute initially */
  muted?: boolean;

  /** Loop on end */
  loop?: boolean;

  /** Inline playback on iOS Safari (default: `true`) */
  playsInline?: boolean;

  /** Preload hint forwarded to the `<video>` element */
  preload?: 'none' | 'metadata' | 'auto';

  /** Controlled playing state */
  playing?: boolean;

  /** Called when play state changes */
  onPlayChange?: (playing: boolean) => void;

  /** Controlled current time (seconds) */
  currentTime?: number;

  /** Called when the current time changes */
  onCurrentTimeChange?: (currentTime: number) => void;

  /** Controlled volume (0..1) */
  volume?: number;

  /** Called when the volume changes */
  onVolumeChange?: (volume: number) => void;

  /** Controlled playback rate */
  playbackRate?: number;

  /** Called when the playback rate changes */
  onPlaybackRateChange?: (rate: number) => void;

  /** Theme color used for the timeline fill, thumb and active states */
  color?: MantineColor;

  /** Border radius applied to the container */
  radius?: MantineRadius | (string & {}) | number;

  /** Aspect ratio of the container (e.g. `16 / 9`). When set, the container enforces the ratio. */
  aspectRatio?: number;

  /** Enable keyboard shortcuts when the player is focused (Space, ←/→, ↑/↓, M, F, P, J/K/L) */
  shortcuts?: boolean;

  /** Click on the video toggles play/pause */
  clickToToggle?: boolean;

  /** Double-click toggles fullscreen */
  doubleClickToFullscreen?: boolean;

  /** Auto-hide controls after N ms of inactivity (0 disables auto-hide) */
  autoHideControls?: number;

  /** Size scale for control elements */
  size?: MantineSize | (string & {});

  /** Called when the video ends */
  onEnded?: () => void;

  /** Called when an error occurs on the underlying `<video>` element */
  onError?: (error: MediaError | null) => void;

  /** Called when the player enters Picture-in-Picture mode */
  onEnterPictureInPicture?: () => void;

  /** Called when the player leaves Picture-in-Picture mode */
  onLeavePictureInPicture?: () => void;

  /** Called when fullscreen state changes */
  onFullscreenChange?: (fullscreen: boolean) => void;

  /**
   * `object-fit` applied to the underlying `<video>` element. Use `'cover'` to crop
   * the video so it fills the container (typical for background usage). Default `'contain'`.
   */
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

  /**
   * Convenience preset for using the player as a section / page background. When `true`
   * the component:
   * - positions itself absolutely (`position: absolute; inset: 0`) to fill its parent
   * - sets `object-fit: cover` on the `<video>` element (overrides `fit`)
   * - disables `controls`, `clickToToggle`, `shortcuts`, `doubleClickToFullscreen`,
   *   `autoHideControls` *as defaults* (you can still re-enable them explicitly)
   *
   * Wrap the player in a positioned parent of the size you want — e.g.
   * `<Box pos="relative" h="100vh">` for a full-viewport hero.
   */
  asBackground?: boolean;

  /**
   * When `asBackground` is `true`, render a small floating mute toggle in the bottom-right
   * corner so users can opt in/out of audio. Default `true` — pass `false` to hide it
   * (e.g. if you want to manage audio yourself via children or controlled state).
   */
  backgroundMuteButton?: boolean;
}

export interface VideoProps
  extends
    BoxProps,
    VideoBaseProps,
    StylesApiProps<VideoFactory>,
    Omit<ElementProps<'div', keyof VideoBaseProps>, 'color' | 'onError'> {}

export type VideoFactory = Factory<{
  props: VideoProps;
  ref: HTMLDivElement;
  stylesNames: VideoStylesNames;
  variant: VideoVariant;
  vars: VideoCssVariables;
  staticComponents: {
    Controls: typeof VideoControls;
    PlayButton: typeof VideoPlayButton;
    Timeline: typeof VideoTimeline;
    TimeDisplay: typeof VideoTimeDisplay;
    MuteButton: typeof VideoMuteButton;
    FullscreenButton: typeof VideoFullscreenButton;
    PiPButton: typeof VideoPiPButton;
    CaptionsButton: typeof VideoCaptionsButton;
    SkipButton: typeof VideoSkipButton;
  };
}>;

const defaultProps: Partial<VideoProps> = {
  color: 'blue',
  radius: 'md',
  size: 'md',
  variant: 'overlay',
  preload: 'metadata',
  playsInline: true,
  fit: 'contain',
  backgroundMuteButton: true,
};

const varsResolver = createVarsResolver<VideoFactory>(
  (theme, { color, radius, fit, asBackground }) => {
    const themeColor = getThemeColor(color, theme);
    return {
      root: {
        '--video-color': themeColor,
        '--video-radius': radius === undefined ? undefined : getRadius(radius),
        '--video-bg': 'black',
        '--video-controls-bg':
          'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.35) 60%, transparent 100%)',
        '--video-controls-height': '44px',
        '--video-controls-text-color': 'white',
        '--video-timeline-color': themeColor,
        '--video-timeline-thumb-color': themeColor,
        '--video-object-fit': asBackground ? 'cover' : (fit ?? 'contain'),
      },
    };
  }
);

export const Video = factory<VideoFactory>((_props) => {
  const props = useProps('Video', defaultProps, _props);
  const {
    ref,
    src,
    sources,
    fallbackSrc,
    poster,
    controls: _controls,
    autoPlay,
    muted,
    loop,
    playsInline,
    preload,
    playing: controlledPlaying,
    onPlayChange,
    currentTime: controlledCurrentTime,
    onCurrentTimeChange,
    volume: controlledVolume,
    onVolumeChange,
    playbackRate: controlledPlaybackRate,
    onPlaybackRateChange,
    color: _color,
    radius: _radius,
    aspectRatio,
    size,
    variant,
    onEnded,
    onError,
    onEnterPictureInPicture,
    onLeavePictureInPicture,
    onFullscreenChange,
    fit: _fit,
    asBackground,
    backgroundMuteButton,
    children,
    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,
    mod,
    ...others
  } = props;

  // Background mode flips a few interactive defaults — only when the user has not
  // explicitly opted into them via raw props.
  const controls = _props.controls ?? !asBackground;
  const shortcuts = _props.shortcuts ?? !asBackground;
  const clickToToggle = _props.clickToToggle ?? !asBackground;
  const doubleClickToFullscreen = _props.doubleClickToFullscreen ?? !asBackground;
  const autoHideControls = _props.autoHideControls ?? (asBackground ? 0 : 3000);

  const getStyles = useStyles<VideoFactory>({
    name: 'Video',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const video = useVideo({
    src,
    autoPlay,
    muted,
    loop,
    playing: controlledPlaying,
    onPlayChange,
    currentTime: controlledCurrentTime,
    onCurrentTimeChange,
    volume: controlledVolume,
    onVolumeChange,
    playbackRate: controlledPlaybackRate,
    onPlaybackRateChange,
    onEnded,
    onError,
    onEnterPictureInPicture,
    onLeavePictureInPicture,
    onFullscreenChange,
  });

  const hasSources = Array.isArray(sources) && sources.length > 0;

  // Swap to `fallbackSrc` once if the primary source(s) fail to load. Guarded
  // with a ref so a failing fallback doesn't loop; reset when the source set
  // changes.
  const triedFallbackRef = useRef(false);
  useEffect(() => {
    triedFallbackRef.current = false;
  }, [src, sources, fallbackSrc]);

  const handleSourceError = useCallback(() => {
    if (!fallbackSrc || triedFallbackRef.current) {
      return;
    }
    const el = video.videoRef.current;
    if (!el) {
      return;
    }
    triedFallbackRef.current = true;
    el.removeAttribute('src');
    el.querySelectorAll('source').forEach((node) => node.remove());
    el.src = fallbackSrc;
    el.load();
  }, [fallbackSrc, video.videoRef]);

  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (autoHideControls && autoHideControls > 0 && video.playing) {
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), autoHideControls);
    }
  }, [autoHideControls, video.playing]);

  useEffect(() => {
    showControls();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [showControls, video.playing]);

  const lastClickAtRef = useRef(0);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        event.target !== event.currentTarget &&
        (event.target as HTMLElement).tagName !== 'VIDEO'
      ) {
        return;
      }
      const now = Date.now();
      const isDouble = now - lastClickAtRef.current < 300;
      lastClickAtRef.current = now;

      if (isDouble && doubleClickToFullscreen) {
        video.toggleFullscreen();
        return;
      }
      if (clickToToggle && !isDouble) {
        setTimeout(() => {
          if (Date.now() - lastClickAtRef.current >= 250) {
            video.toggle();
          }
        }, 260);
      }
    },
    [clickToToggle, doubleClickToFullscreen, video]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!shortcuts) return;
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      switch (event.key) {
        case ' ':
        case 'k':
        case 'K':
          event.preventDefault();
          video.toggle();
          break;
        case 'ArrowLeft':
        case 'j':
        case 'J':
          event.preventDefault();
          video.seekBy(event.key === 'ArrowLeft' ? -5 : -10);
          break;
        case 'ArrowRight':
        case 'l':
        case 'L':
          event.preventDefault();
          video.seekBy(event.key === 'ArrowRight' ? 5 : 10);
          break;
        case 'ArrowUp':
          event.preventDefault();
          video.setVolume(Math.min(1, video.volume + 0.05));
          break;
        case 'ArrowDown':
          event.preventDefault();
          video.setVolume(Math.max(0, video.volume - 0.05));
          break;
        case 'm':
        case 'M':
          event.preventDefault();
          video.toggleMute();
          break;
        case 'f':
        case 'F':
          event.preventDefault();
          video.toggleFullscreen();
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          video.togglePiP();
          break;
        default:
          break;
      }
    },
    [shortcuts, video]
  );

  const flowControls = variant === 'minimal' || variant === 'bordered';

  return (
    <VideoProvider
      value={{
        ...video,
        getStyles,
        controlsVisible,
        showControls,
      }}
    >
      <Box
        {...getStyles('root', {
          style: [
            aspectRatio && !flowControls ? { aspectRatio: String(aspectRatio) } : undefined,
            style,
          ],
        })}
        {...others}
        ref={(node: HTMLDivElement | null) => {
          video.containerRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref && typeof ref === 'object') {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        mod={[
          {
            variant,
            size,
            playing: video.playing,
            paused: video.paused && !video.ended,
            ended: video.ended,
            fullscreen: video.fullscreen,
            'controls-visible': controlsVisible,
            'as-background': asBackground,
          },
          mod,
        ]}
        tabIndex={shortcuts ? 0 : undefined}
        onMouseMove={showControls}
        onMouseLeave={() => {
          if (autoHideControls && autoHideControls > 0 && video.playing) {
            setControlsVisible(false);
          }
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <video
          {...getStyles('video', {
            style: aspectRatio && flowControls ? { aspectRatio: String(aspectRatio) } : undefined,
          })}
          ref={video.videoRef}
          src={hasSources ? undefined : src}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
          onError={handleSourceError}
        >
          {hasSources
            ? sources!.map((source, index) => (
                <source key={index} src={source.src} type={source.type} media={source.media} />
              ))
            : null}
        </video>
        {asBackground && backgroundMuteButton && (
          <VideoMuteButton {...getStyles('backgroundMuteButton')} />
        )}
        {children ?? (controls && <VideoControls />)}
      </Box>
    </VideoProvider>
  );
});

Video.classes = classes;
Video.displayName = 'Video';
Video.Controls = VideoControls;
Video.PlayButton = VideoPlayButton;
Video.Timeline = VideoTimeline;
Video.TimeDisplay = VideoTimeDisplay;
Video.MuteButton = VideoMuteButton;
Video.FullscreenButton = VideoFullscreenButton;
Video.PiPButton = VideoPiPButton;
Video.CaptionsButton = VideoCaptionsButton;
Video.SkipButton = VideoSkipButton;
