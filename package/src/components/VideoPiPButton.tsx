import { ActionIcon, Tooltip, type ActionIconProps, type ElementProps } from '@mantine/core';
import { IconPictureInPicture } from '@tabler/icons-react';
import React, { forwardRef } from 'react';
import { useVideoContext } from '../Video.context';

export interface VideoPiPButtonProps
  extends ActionIconProps, ElementProps<'button', keyof ActionIconProps> {
  label?: string;
}

export const VideoPiPButton = forwardRef<HTMLButtonElement, VideoPiPButtonProps>(
  ({ label = 'Picture-in-Picture', ...others }, ref) => {
    const ctx = useVideoContext();
    if (!ctx.canPiP) return null;

    return (
      <Tooltip label={label} withArrow openDelay={400}>
        <ActionIcon
          ref={ref}
          variant="transparent"
          color="white"
          size="lg"
          aria-label={label}
          aria-pressed={ctx.pip}
          onClick={ctx.togglePiP}
          data-state={ctx.pip ? 'on' : 'off'}
          {...ctx.getStyles('pipButton')}
          {...others}
        >
          <IconPictureInPicture size={20} />
        </ActionIcon>
      </Tooltip>
    );
  }
);

VideoPiPButton.displayName = 'VideoPiPButton';
