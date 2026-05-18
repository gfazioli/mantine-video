import { Video } from '@gfazioli/mantine-video';
import { MantineDemo } from '@mantinex/demo';

const VIDEO_SRC = 'https://archive.org/download/mantas-in-3-minutes/Manta%201%20minute.ia.mp4';
const VIDEO_POSTER = 'https://archive.org/services/img/mantas-in-3-minutes';

function Wrapper(props: any) {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <Video src={VIDEO_SRC} poster={VIDEO_POSTER} {...props} />
    </div>
  );
}

const code = `
import { Video } from '@gfazioli/mantine-video';

function Demo() {
  return (
    <Video
      src="https://archive.org/download/mantas-in-3-minutes/Manta%201%20minute.ia.mp4"
      poster="https://archive.org/services/img/mantas-in-3-minutes"
      aspectRatio={{{aspectRatio}}}
      variant="{{variant}}"
      color="{{color}}"
      radius="{{radius}}"
      autoHideControls={{{autoHideControls}}}
      shortcuts={{{shortcuts}}}
      clickToToggle={{{clickToToggle}}}
      controls={{{controls}}}
    />
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'variant',
      type: 'select',
      data: [
        { label: 'Overlay', value: 'overlay' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Floating', value: 'floating' },
        { label: 'Bordered', value: 'bordered' },
      ],
      initialValue: 'overlay',
      libraryValue: 'overlay',
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'aspectRatio',
      type: 'number',
      initialValue: 16 / 9,
      libraryValue: 16 / 9,
      step: 0.05,
      min: 0.5,
      max: 3,
    },
    {
      prop: 'autoHideControls',
      type: 'number',
      initialValue: 3000,
      libraryValue: 3000,
      step: 500,
      min: 0,
      max: 10000,
    },
    {
      prop: 'shortcuts',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'clickToToggle',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'controls',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
  ],
};
