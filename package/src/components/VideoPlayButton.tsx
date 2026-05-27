import { ActionIcon, Tooltip, type ActionIconProps, type ElementProps } from '@mantine/core';
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import React, { forwardRef } from 'react';
import { useVideoContext } from '../Video.context';

export interface VideoPlayButtonProps
  extends ActionIconProps, ElementProps<'button', keyof ActionIconProps> {
  playLabel?: string;
  pauseLabel?: string;
}

export const VideoPlayButton = forwardRef<HTMLButtonElement, VideoPlayButtonProps>(
  ({ playLabel = 'Play', pauseLabel = 'Pause', ...others }, ref) => {
    const ctx = useVideoContext();
    const label = ctx.playing ? pauseLabel : playLabel;

    return (
      <Tooltip label={label} withArrow openDelay={400}>
        <ActionIcon
          ref={ref}
          variant="transparent"
          color="white"
          size="lg"
          aria-label={label}
          onClick={ctx.toggle}
          data-state={ctx.playing ? 'playing' : 'paused'}
          {...ctx.getStyles('playButton')}
          {...others}
        >
          {ctx.playing ? <IconPlayerPauseFilled size={20} /> : <IconPlayerPlayFilled size={20} />}
        </ActionIcon>
      </Tooltip>
    );
  }
);

VideoPlayButton.displayName = 'VideoPlayButton';
