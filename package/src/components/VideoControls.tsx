import { Box, type BoxProps } from '@mantine/core';
import React, { forwardRef, type ReactNode } from 'react';
import { useVideoContext } from '../Video.context';
import { VideoCaptionsButton } from './VideoCaptionsButton';
import { VideoFullscreenButton } from './VideoFullscreenButton';
import { VideoMuteButton } from './VideoMuteButton';
import { VideoPiPButton } from './VideoPiPButton';
import { VideoPlayButton } from './VideoPlayButton';
import { VideoTimeDisplay } from './VideoTimeDisplay';
import { VideoTimeline } from './VideoTimeline';

export interface VideoControlsProps extends BoxProps {
  children?: ReactNode;
}

export const VideoControls = forwardRef<HTMLDivElement, VideoControlsProps>(
  ({ children, ...others }, ref) => {
    const ctx = useVideoContext();

    return (
      <Box
        ref={ref}
        {...ctx.getStyles('controls')}
        mod={{ visible: ctx.controlsVisible }}
        onClick={(event) => event.stopPropagation()}
        {...others}
      >
        <Box {...ctx.getStyles('controlBar')}>
          {children ?? (
            <>
              <VideoPlayButton />
              <VideoTimeline />
              <VideoTimeDisplay />
              <VideoMuteButton />
              <VideoCaptionsButton />
              <VideoPiPButton />
              <VideoFullscreenButton />
            </>
          )}
        </Box>
      </Box>
    );
  }
);

VideoControls.displayName = 'VideoControls';
