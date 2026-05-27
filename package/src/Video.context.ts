import type { GetStylesApi } from '@mantine/core';
import { createContext, useContext } from 'react';
import type { UseVideoReturn } from './use-video';
import type { VideoFactory } from './Video';

export interface VideoContextValue extends UseVideoReturn {
  getStyles: GetStylesApi<VideoFactory>;
  controlsVisible: boolean;
  showControls: () => void;
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
