import React from 'react';
import { forwardRef, useCallback, useState } from 'react';
import { Box, Slider, type BoxProps, type SliderProps } from '@mantine/core';
import { useVideoContext } from '../Video.context';

export interface VideoTimelineProps extends Omit<BoxProps, 'onChange'> {
  /** Slider props forwarded to the underlying Mantine Slider */
  sliderProps?: Partial<Omit<SliderProps, 'value' | 'onChange' | 'onChangeEnd' | 'max' | 'min'>>;
}

export const VideoTimeline = forwardRef<HTMLDivElement, VideoTimelineProps>(
  ({ sliderProps, ...others }, ref) => {
    const ctx = useVideoContext();
    const [scrubbing, setScrubbing] = useState<number | null>(null);

    const max = Number.isFinite(ctx.duration) && ctx.duration > 0 ? ctx.duration : 0;
    const value = scrubbing ?? ctx.currentTime;
    const bufferedPercent = max > 0 ? (ctx.buffered / max) * 100 : 0;

    const handleChange = useCallback((v: number) => {
      setScrubbing(v);
    }, []);

    const handleChangeEnd = useCallback(
      (v: number) => {
        ctx.seek(v);
        setScrubbing(null);
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
