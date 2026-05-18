import React from 'react';
import { forwardRef } from 'react';
import { IconMaximize, IconMinimize } from '@tabler/icons-react';
import { ActionIcon, Tooltip, type ActionIconProps, type ElementProps } from '@mantine/core';
import { useVideoContext } from '../Video.context';

export interface VideoFullscreenButtonProps
  extends ActionIconProps,
    ElementProps<'button', keyof ActionIconProps> {
  enterLabel?: string;
  exitLabel?: string;
}

export const VideoFullscreenButton = forwardRef<HTMLButtonElement, VideoFullscreenButtonProps>(
  ({ enterLabel = 'Enter fullscreen', exitLabel = 'Exit fullscreen', ...others }, ref) => {
    const ctx = useVideoContext();
    if (!ctx.canFullscreen) return null;

    const label = ctx.fullscreen ? exitLabel : enterLabel;

    return (
      <Tooltip label={label} withArrow openDelay={400}>
        <ActionIcon
          ref={ref}
          variant="transparent"
          color="white"
          size="lg"
          aria-label={label}
          aria-pressed={ctx.fullscreen}
          onClick={ctx.toggleFullscreen}
          data-state={ctx.fullscreen ? 'on' : 'off'}
          {...ctx.getStyles('fullscreenButton')}
          {...others}
        >
          {ctx.fullscreen ? <IconMinimize size={20} /> : <IconMaximize size={20} />}
        </ActionIcon>
      </Tooltip>
    );
  }
);

VideoFullscreenButton.displayName = 'VideoFullscreenButton';
