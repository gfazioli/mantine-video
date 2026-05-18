import { ActionIcon, Group, Slider, Text } from '@mantine/core';
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import { useVideo } from '@gfazioli/mantine-video';
import { MantineDemo } from '@mantinex/demo';
import { useSampleVideos } from '../lib/sample-videos';

const code = `
import { ActionIcon, Group, Slider, Text } from '@mantine/core';
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import { useVideo } from '@gfazioli/mantine-video';

function Demo() {
  const video = useVideo();
  return (
    <div>
      <video
        ref={video.videoRef}
        src="/videos/manta.mp4"
        style={{ width: '100%', aspectRatio: '16 / 9', background: 'black' }}
      />

      <Group mt="sm" gap="md">
        <ActionIcon onClick={video.toggle} variant="filled" size="lg">
          {video.playing ? <IconPlayerPauseFilled size={20} /> : <IconPlayerPlayFilled size={20} />}
        </ActionIcon>

        <Slider
          flex={1}
          value={video.currentTime}
          max={video.duration || 0}
          step={0.01}
          onChange={video.seek}
        />

        <Text size="sm" ff="monospace" miw={80} ta="right">
          {video.currentTime.toFixed(1)}s / {video.duration.toFixed(1)}s
        </Text>
      </Group>
    </div>
  );
}
`;

function Demo() {
  const v = useSampleVideos();
  const video = useVideo();

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <video
        ref={video.videoRef}
        src={v.manta}
        poster={v.mantaPoster}
        style={{ width: '100%', aspectRatio: '16 / 9', background: 'black', borderRadius: 8 }}
      />

      <Group mt="sm" gap="md">
        <ActionIcon onClick={video.toggle} variant="filled" size="lg" aria-label="Play/Pause">
          {video.playing ? <IconPlayerPauseFilled size={20} /> : <IconPlayerPlayFilled size={20} />}
        </ActionIcon>

        <Slider
          flex={1}
          value={video.currentTime}
          max={video.duration || 0}
          step={0.01}
          onChange={video.seek}
          label={null}
          aria-label="Seek"
        />

        <Text size="sm" ff="monospace" miw={100} ta="right">
          {video.currentTime.toFixed(1)}s / {Number.isFinite(video.duration) ? video.duration.toFixed(1) : '?'}s
        </Text>
      </Group>
    </div>
  );
}

export const headless: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
