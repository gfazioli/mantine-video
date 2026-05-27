import { Video } from '@gfazioli/mantine-video';
import { MantineDemo } from '@mantinex/demo';
import { useSampleVideos } from '../lib/sample-videos';
import { VideoStylesApi } from '../styles-api/Video.styles-api';

const code = `
import { Video } from '@gfazioli/mantine-video';

function Demo() {
  return (
    <Video
      src="/videos/manta.mp4"
      poster="/videos/manta-poster.jpg"
      aspectRatio={16 / 9}{{props}}
    />
  );
}
`;

function Demo(props: any) {
  const v = useSampleVideos();
  return <Video src={v.manta} poster={v.mantaPoster} aspectRatio={16 / 9} {...props} />;
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: VideoStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 560,
};
