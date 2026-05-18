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
      controls={false}
    >
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
  );
}
`;

function Demo() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Video
        src="https://archive.org/download/mantas-in-3-minutes/Manta%201%20minute.ia.mp4"
        poster="https://archive.org/services/img/mantas-in-3-minutes"
        aspectRatio={16 / 9}
        controls={false}
      >
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
    </div>
  );
}

export const customControls: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
