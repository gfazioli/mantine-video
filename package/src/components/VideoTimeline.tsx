import React from 'react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Slider, type BoxProps, type SliderProps } from '@mantine/core';
import { useVideoContext } from '../Video.context';

export interface VideoTimelineProps extends Omit<BoxProps, 'onChange'> {
  /** Slider props forwarded to the underlying Mantine Slider */
  sliderProps?: Partial<Omit<SliderProps, 'value' | 'onChange' | 'onChangeEnd' | 'max' | 'min'>>;

  /**
   * Live-scrub the video while dragging the timeline thumb — the underlying `<video>`
   * element seeks to the new position on every change, so the user sees the frame
   * update in real time. The player is paused for the duration of the drag and
   * resumes automatically on release if it was playing. Default `true`.
   */
  liveScrub?: boolean;
}

export const VideoTimeline = forwardRef<HTMLDivElement, VideoTimelineProps>(
  ({ sliderProps, liveScrub = true, ...others }, ref) => {
    const ctx = useVideoContext();
    const [scrubbing, setScrubbing] = useState<number | null>(null);
    const isScrubbingRef = useRef(false);
    const wasPlayingRef = useRef(false);
    const rafRef = useRef<number | null>(null);
    const pendingSeekRef = useRef<number | null>(null);

    const max = Number.isFinite(ctx.duration) && ctx.duration > 0 ? ctx.duration : 0;
    const value = scrubbing ?? ctx.currentTime;
    const bufferedPercent = max > 0 ? (ctx.buffered / max) * 100 : 0;

    useEffect(() => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    }, []);

    const handleChange = useCallback(
      (v: number) => {
        if (!isScrubbingRef.current) {
          isScrubbingRef.current = true;
          wasPlayingRef.current = ctx.playing;
          if (liveScrub && ctx.playing) {
            ctx.pause();
          }
        }
        setScrubbing(v);

        if (!liveScrub) return;

        pendingSeekRef.current = v;
        if (rafRef.current === null) {
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            if (pendingSeekRef.current !== null) {
              ctx.seek(pendingSeekRef.current);
              pendingSeekRef.current = null;
            }
          });
        }
      },
      [ctx, liveScrub]
    );

    const handleChangeEnd = useCallback(
      (v: number) => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        pendingSeekRef.current = null;
        ctx.seek(v);
        setScrubbing(null);
        isScrubbingRef.current = false;
        if (wasPlayingRef.current) {
          wasPlayingRef.current = false;
          ctx.play();
        }
      },
      [ctx]
    );

    return (
      <Box ref={ref} {...ctx.getStyles('timeline')} {...others}>
        <Box
          {...ctx.getStyles('timelineBuffered')}
          style={{ width: `${bufferedPercent}%` }}
          aria-hidden
        />
        <Slider
          value={Math.min(value, max || value)}
          onChange={handleChange}
          onChangeEnd={handleChangeEnd}
          min={0}
          max={max || 0.0001}
          step={0.01}
          label={(v) => formatTime(v)}
          showLabelOnHover
          color="var(--video-timeline-color)"
          thumbSize={12}
          size="xs"
          aria-label="Seek"
          styles={{
            root: { flex: 1, width: '100%' },
            track: { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
            bar: { backgroundColor: 'var(--video-timeline-color)' },
            thumb: {
              backgroundColor: 'var(--video-timeline-thumb-color)',
              borderColor: 'var(--video-timeline-thumb-color)',
            },
          }}
          {...sliderProps}
        />
      </Box>
    );
  }
);

VideoTimeline.displayName = 'VideoTimeline';

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}
