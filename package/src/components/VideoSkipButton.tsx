import React from 'react';
import { forwardRef } from 'react';
import { IconRewindBackward10, IconRewindForward10 } from '@tabler/icons-react';
import { ActionIcon, Tooltip, type ActionIconProps, type ElementProps } from '@mantine/core';
import { useVideoContext } from '../Video.context';

export interface VideoSkipButtonProps
  extends ActionIconProps,
    ElementProps<'button', keyof ActionIconProps | 'children'> {
  /** Seconds to skip. Negative = backward, positive = forward. Default `10`. */
  seconds?: number;

  /** Override the displayed icon */
  icon?: React.ReactNode;

  /** Tooltip label override */
  label?: string;
}

export const VideoSkipButton = forwardRef<HTMLButtonElement, VideoSkipButtonProps>(
  ({ seconds = 10, icon, label, ...others }, ref) => {
    const ctx = useVideoContext();
    const forward = seconds >= 0;
    const tooltip = label ?? `${forward ? 'Forward' : 'Back'} ${Math.abs(seconds)}s`;

    const renderedIcon = icon ??
      (forward ? <IconRewindForward10 size={20} /> : <IconRewindBackward10 size={20} />);

    return (
      <Tooltip label={tooltip} withArrow openDelay={400}>
        <ActionIcon
          ref={ref}
          variant="transparent"
          color="white"
          size="lg"
          aria-label={tooltip}
          onClick={() => ctx.seekBy(seconds)}
          {...ctx.getStyles('skipButton')}
          {...others}
        >
          {renderedIcon}
        </ActionIcon>
      </Tooltip>
    );
  }
);

VideoSkipButton.displayName = 'VideoSkipButton';
