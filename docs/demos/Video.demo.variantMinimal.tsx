import { Video } from '@gfazioli/mantine-video';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Video } from '@gfazioli/mantine-video';

function Demo() {
  return (
    <Video
      src="https://archive.org/download/mantas-in-3-minutes/Manta%201%20minute.ia.mp4"
      poster="https://archive.org/services/img/mantas-in-3-minutes"
      aspectRatio={16 / 9}
      variant="minimal"
    />
  );
}
`;

function Demo() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <Video
        src="https://archive.org/download/mantas-in-3-minutes/Manta%201%20minute.ia.mp4"
        poster="https://archive.org/services/img/mantas-in-3-minutes"
        aspectRatio={16 / 9}
        variant="minimal"
      />
    </div>
  );
}

export const variantMinimal: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
