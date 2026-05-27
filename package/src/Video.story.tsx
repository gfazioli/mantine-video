import { Paper, Stack, Text } from '@mantine/core';
import React from 'react';
import { Video, type VideoProps, type VideoVariant } from './Video';

const SAMPLE_SRC = 'https://archive.org/download/mantas-in-3-minutes/Manta%201%20minute.ia.mp4';
const SAMPLE_POSTER = 'https://archive.org/services/img/mantas-in-3-minutes';

export default {
  title: 'Components/Video',
  args: {
    src: SAMPLE_SRC,
    poster: SAMPLE_POSTER,
    aspectRatio: 16 / 9,
    variant: 'overlay' as VideoVariant,
    color: 'blue',
    radius: 'md',
    autoHideControls: 3000,
    controls: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['overlay', 'minimal', 'floating', 'bordered'] satisfies VideoVariant[],
    },
    color: { control: 'color' },
    radius: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    aspectRatio: { control: 'number' },
    autoHideControls: { control: { type: 'number', min: 0, max: 10000, step: 500 } },
  },
};

export function Usage(props: VideoProps) {
  return (
    <Paper p="md" withBorder maw={720}>
      <Stack gap="xs">
        <Text fw={500}>Basic Video</Text>
        <Video {...props} />
        <Text size="xs" c="dimmed">
          Big Buck Bunny — sample from Google Cloud Storage.
        </Text>
      </Stack>
    </Paper>
  );
}

export function CustomControls() {
  return (
    <Paper p="md" withBorder maw={720}>
      <Video src={SAMPLE_SRC} poster={SAMPLE_POSTER} aspectRatio={16 / 9} controls={false}>
        <Video.Controls>
          <Video.PlayButton />
          <Video.SkipButton seconds={-10} />
          <Video.SkipButton seconds={10} />
          <Video.Timeline />
          <Video.TimeDisplay format="current/-remaining" />
          <Video.MuteButton />
          <Video.CaptionsButton />
          <Video.PiPButton />
          <Video.FullscreenButton />
        </Video.Controls>
      </Video>
    </Paper>
  );
}

export function Variants() {
  return (
    <Stack gap="lg" p="md" maw={720}>
      {(['overlay', 'minimal', 'floating', 'bordered'] satisfies VideoVariant[]).map((variant) => (
        <Paper key={variant} withBorder>
          <Text size="sm" fw={500} px="sm" py={6}>
            variant=&quot;{variant}&quot;
          </Text>
          <Video src={SAMPLE_SRC} poster={SAMPLE_POSTER} aspectRatio={16 / 9} variant={variant} />
        </Paper>
      ))}
    </Stack>
  );
}
