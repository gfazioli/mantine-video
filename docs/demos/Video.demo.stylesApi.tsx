import { Video } from '@gfazioli/mantine-video';
import { MantineDemo } from '@mantinex/demo';
import { VideoStylesApi } from '../styles-api/Video.styles-api';

const code = `
import { Video } from '@gfazioli/mantine-video';

function Demo() {
  return (
    <Video
      src="https://archive.org/download/mantas-in-3-minutes/Manta%201%20minute.ia.mp4"
      poster="https://archive.org/services/img/mantas-in-3-minutes"
      aspectRatio={16 / 9}{{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <Video
      src="https://archive.org/download/mantas-in-3-minutes/Manta%201%20minute.ia.mp4"
      poster="https://archive.org/services/img/mantas-in-3-minutes"
      aspectRatio={16 / 9}
      {...props}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: VideoStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 560,
};
