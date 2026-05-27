import { ActionIcon, Tooltip, type ActionIconProps, type ElementProps } from '@mantine/core';
import { IconVolume, IconVolume2, IconVolume3 } from '@tabler/icons-react';
import React, { forwardRef } from 'react';
import { useVideoContext } from '../Video.context';

export interface VideoMuteButtonProps
  extends ActionIconProps, ElementProps<'button', keyof ActionIconProps> {
  muteLabel?: string;
  unmuteLabel?: string;
}

export const VideoMuteButton = forwardRef<HTMLButtonElement, VideoMuteButtonProps>(
  ({ muteLabel = 'Mute', unmuteLabel = 'Unmute', ...others }, ref) => {
    const ctx = useVideoContext();
    const isMuted = ctx.muted || ctx.volume === 0;
    const label = isMuted ? unmuteLabel : muteLabel;

    const Icon = isMuted ? IconVolume3 : ctx.volume < 0.5 ? IconVolume2 : IconVolume;

    return (
      <Tooltip label={label} withArrow openDelay={400}>
        <ActionIcon
          ref={ref}
          variant="transparent"
          color="white"
          size="lg"
          aria-label={label}
          aria-pressed={isMuted}
          onClick={ctx.toggleMute}
          data-state={isMuted ? 'muted' : 'unmuted'}
          {...ctx.getStyles('muteButton')}
          {...others}
        >
          <Icon size={20} />
        </ActionIcon>
      </Tooltip>
    );
  }
);

VideoMuteButton.displayName = 'VideoMuteButton';
