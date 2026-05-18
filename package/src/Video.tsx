import React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  | 'iconButton';

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

export interface VideoBaseProps {
  /** Video source URL */
  src?: string;

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
}

export interface VideoProps
  extends BoxProps,
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
  controls: true,
  color: 'blue',
  radius: 'md',
  size: 'md',
  variant: 'overlay',
  preload: 'metadata',
  playsInline: true,
  shortcuts: true,
  clickToToggle: true,
  doubleClickToFullscreen: true,
  autoHideControls: 3000,
};

const varsResolver = createVarsResolver<VideoFactory>((theme, { color, radius }) => {
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
    },
  };
});

export const Video = factory<VideoFactory>((_props) => {
  const props = useProps('Video', defaultProps, _props);
  const {
    ref,
    src,
    poster,
    controls,
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
    shortcuts,
    clickToToggle,
    doubleClickToFullscreen,
    autoHideControls,
    size,
    variant,
    onEnded,
    onError,
    onEnterPictureInPicture,
    onLeavePictureInPicture,
    onFullscreenChange,
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
      if (event.target !== event.currentTarget && (event.target as HTMLElement).tagName !== 'VIDEO') {
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
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
        />
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
