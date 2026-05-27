import { Video } from '@gfazioli/mantine-video';
import { MantineDemo } from '@mantinex/demo';
import { useSampleVideos } from '../lib/sample-videos';

const code = `
import { Video } from '@gfazioli/mantine-video';

function Demo() {
  return (
    <Video
      src="/videos/manta.mp4"
      poster="/videos/manta-poster.jpg"
      aspectRatio={16 / 9}
      variant="bordered"
    />
  );
}
`;

function Demo() {
  const v = useSampleVideos();
  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <Video src={v.manta} poster={v.mantaPoster} aspectRatio={16 / 9} variant="bordered" />
    </div>
  );
}

export const variantBordered: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
