import { Video } from '@gfazioli/mantine-video';
import { MantineDemo } from '@mantinex/demo';
import { useSampleVideos } from '../lib/sample-videos';

function Wrapper(props: any) {
  const v = useSampleVideos();
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <Video src={v.manta} poster={v.mantaPoster} {...props} />
    </div>
  );
}

const code = `
import { Video } from '@gfazioli/mantine-video';

function Demo() {
  return (
    <Video
      src="/videos/manta.mp4"
      poster="/videos/manta-poster.jpg"
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
