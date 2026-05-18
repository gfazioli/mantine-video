import { VideoFactory } from '@gfazioli/mantine-video';
import type { StylesApiData } from '../components/styles-api.types';

export const VideoStylesApi: StylesApiData<VideoFactory> = {
  selectors: {
    root: 'Root container element',
    video: 'Underlying HTML <video> element',
    controls: 'Controls overlay container (positioned absolutely over the video)',
    controlBar: 'Flex row containing the individual control buttons and timeline',
    playButton: 'Play / pause button',
    timeline: 'Wrapper around the seek slider',
    timelineTrack: 'Track of the timeline slider',
    timelineBuffered: 'Buffered range indicator drawn behind the slider track',
    timelineFill: 'Filled portion of the timeline corresponding to current time',
    timelineThumb: 'Draggable thumb of the timeline slider',
    timelineMarkers: 'Marker layer drawn on top of the timeline (chapters, cue points)',
    timeDisplay: 'Text element showing current / duration time',
    muteButton: 'Mute / unmute button',
    fullscreenButton: 'Enter / exit fullscreen button',
    pipButton: 'Picture-in-picture toggle button',
    captionsButton: 'Captions toggle button',
    skipButton: 'Skip forward / backward button',
    iconButton: 'Generic icon button selector used by all icon-only controls',
    backgroundMuteButton:
      'Floating mute toggle rendered in the bottom-right corner when `asBackground` is enabled (controlled by the `backgroundMuteButton` prop)',
  },

  vars: {
    root: {
      '--video-color': 'Primary color used for active states and timeline fill',
      '--video-radius': 'Border radius of the player container',
      '--video-bg': 'Background color behind the video element',
      '--video-controls-bg': 'Background of the control bar (gradient by default)',
      '--video-controls-height': 'Height of the control bar',
      '--video-controls-text-color': 'Text and icon color in the control bar',
      '--video-timeline-color': 'Filled timeline color (defaults to --video-color)',
      '--video-timeline-thumb-color': 'Timeline thumb color (defaults to --video-color)',
    },
  },

  modifiers: [
    {
      modifier: 'data-variant',
      selector: 'root',
      value: 'overlay | minimal | floating | bordered',
      condition: 'Based on the `variant` prop',
    },
    {
      modifier: 'data-playing',
      selector: 'root',
      condition: 'Video is currently playing',
    },
    {
      modifier: 'data-paused',
      selector: 'root',
      condition: 'Video is paused (and not ended)',
    },
    {
      modifier: 'data-ended',
      selector: 'root',
      condition: 'Playback has reached the end of the media',
    },
    {
      modifier: 'data-fullscreen',
      selector: 'root',
      condition: 'Player is in fullscreen mode',
    },
    {
      modifier: 'data-controls-visible',
      selector: 'root',
      condition: 'Control bar is currently visible (not auto-hidden)',
    },
    {
      modifier: 'data-visible',
      selector: 'controls',
      condition: 'Control bar is currently visible',
    },
  ],
};
