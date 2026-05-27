import { ActionIcon, Tooltip, type ActionIconProps, type ElementProps } from '@mantine/core';
import { IconBadgeCc, IconBadgeCcFilled } from '@tabler/icons-react';
import React, { forwardRef, useEffect, useState } from 'react';
import { useVideoContext } from '../Video.context';

export interface VideoCaptionsButtonProps
  extends ActionIconProps, ElementProps<'button', keyof ActionIconProps> {
  enableLabel?: string;
  disableLabel?: string;
}

export const VideoCaptionsButton = forwardRef<HTMLButtonElement, VideoCaptionsButtonProps>(
  ({ enableLabel = 'Enable captions', disableLabel = 'Disable captions', ...others }, ref) => {
    const ctx = useVideoContext();
    const [active, setActive] = useState(false);
    const [hasTracks, setHasTracks] = useState(false);

    useEffect(() => {
      const v = ctx.videoRef.current;
      if (!v) return;
      const sync = () => {
        const tracks = Array.from(v.textTracks);
        const captionsTracks = tracks.filter(
          (t) => t.kind === 'captions' || t.kind === 'subtitles'
        );
        setHasTracks(captionsTracks.length > 0);
        setActive(captionsTracks.some((t) => t.mode === 'showing'));
      };
      sync();
      const tt = v.textTracks as TextTrackList & {
        addEventListener?: TextTrackList['addEventListener'];
        removeEventListener?: TextTrackList['removeEventListener'];
      };
      if (typeof tt.addEventListener !== 'function') return;
      tt.addEventListener('change', sync);
      tt.addEventListener('addtrack', sync);
      tt.addEventListener('removetrack', sync);
      return () => {
        tt.removeEventListener?.('change', sync);
        tt.removeEventListener?.('addtrack', sync);
        tt.removeEventListener?.('removetrack', sync);
      };
    }, [ctx.videoRef]);

    if (!hasTracks) return null;

    const toggle = () => {
      const v = ctx.videoRef.current;
      if (!v) return;
      const tracks = Array.from(v.textTracks).filter(
        (t) => t.kind === 'captions' || t.kind === 'subtitles'
      );
      if (tracks.length === 0) return;
      if (active) {
        tracks.forEach((t) => {
          t.mode = 'disabled';
        });
      } else {
        tracks[0].mode = 'showing';
      }
    };

    const label = active ? disableLabel : enableLabel;

    return (
      <Tooltip label={label} withArrow openDelay={400}>
        <ActionIcon
          ref={ref}
          variant="transparent"
          color="white"
          size="lg"
          aria-label={label}
          aria-pressed={active}
          onClick={toggle}
          data-state={active ? 'on' : 'off'}
          {...ctx.getStyles('captionsButton')}
          {...others}
        >
          {active ? <IconBadgeCcFilled size={20} /> : <IconBadgeCc size={20} />}
        </ActionIcon>
      </Tooltip>
    );
  }
);

VideoCaptionsButton.displayName = 'VideoCaptionsButton';
