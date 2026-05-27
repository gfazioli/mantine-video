import { Video } from '@gfazioli/mantine-video';
import { MantineDemo } from '@mantinex/demo';
import { useSampleVideos } from '../lib/sample-videos';

const code = `
import { Video } from '@gfazioli/mantine-video';

function Demo() {
  return (
    <Video
      sources={[
        { src: '/videos/manta.webm', type: 'video/webm' },
        { src: '/videos/manta.mp4', type: 'video/mp4' },
      ]}
      fallbackSrc="/videos/manta.mp4"
      poster="/videos/manta-poster.jpg"
      aspectRatio={16 / 9}
    />
  );
}
`;

function Demo() {
  const v = useSampleVideos();
  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <Video
        sources={[
          // The browser tries each entry in order and plays the first it
          // can decode: VP9/webm where supported, falling back to H.264/mp4.
          { src: v.mantaWebm, type: 'video/webm' },
          { src: v.manta, type: 'video/mp4' },
        ]}
        fallbackSrc={v.manta}
        poster={v.mantaPoster}
        aspectRatio={16 / 9}
      />
    </div>
  );
}

export const sources: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
