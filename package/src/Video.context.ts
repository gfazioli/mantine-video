import type { GetStylesApi } from '@mantine/core';
import { createContext, useContext, type RefObject } from 'react';
import type { UseVideoReturn } from './use-video';
import type { VideoFactory } from './Video';

export interface VideoContextValue extends UseVideoReturn {
  getStyles: GetStylesApi<VideoFactory>;
  controlsVisible: boolean;
  showControls: () => void;
  /** The control bar's element, set by `Video.Controls`: captions are lifted above it while it shows. */
  controlsRef?: RefObject<HTMLDivElement | null>;
}

export const VideoContext = createContext<VideoContextValue | null>(null);

export const VideoProvider = VideoContext.Provider;

export function useVideoContext(): VideoContextValue {
  const ctx = useContext(VideoContext);
  if (!ctx) {
    throw new Error(
      'Video compound component must be rendered inside a <Video /> parent. ' +
        'If you need access to the video state outside the <Video /> tree, use the useVideo() hook instead.'
    );
  }
  return ctx;
}
