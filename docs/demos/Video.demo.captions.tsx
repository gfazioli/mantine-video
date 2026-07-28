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
      tracks={[
        {
          src: '/videos/manta-en.vtt',
          kind: 'captions',
          srcLang: 'en',
          label: 'English',
          default: true,
        },
      ]}
    />
  );
}
`;

function Demo() {
  const v = useSampleVideos();
  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <Video
        src={v.manta}
        poster={v.mantaPoster}
        aspectRatio={16 / 9}
        // One <track> per entry is rendered inside the <video>, so the browser paints the cues
        // itself and the CC button appears in the control bar. `default` starts them visible.
        tracks={[
          {
            src: v.mantaCaptions,
            kind: 'captions',
            srcLang: 'en',
            label: 'English',
            default: true,
          },
        ]}
      />
    </div>
  );
}

export const captions: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
