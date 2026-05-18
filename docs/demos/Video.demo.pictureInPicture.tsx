import { Alert, Stack, Text } from '@mantine/core';
import { IconPictureInPicture, IconPictureInPictureOn } from '@tabler/icons-react';
import { useState } from 'react';
import { Video } from '@gfazioli/mantine-video';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { Alert, Stack, Text } from '@mantine/core';
import { IconPictureInPicture, IconPictureInPictureOn } from '@tabler/icons-react';
import { Video } from '@gfazioli/mantine-video';

function Demo() {
  const [pipActive, setPipActive] = useState(false);

  return (
    <Stack gap="md">
      <Alert
        color={pipActive ? 'green' : 'blue'}
        variant="light"
        icon={pipActive ? <IconPictureInPictureOn /> : <IconPictureInPicture />}
        title={pipActive ? 'Picture-in-Picture is ACTIVE' : 'Picture-in-Picture is inactive'}
      >
        <Text size="sm">
          Click the PiP button on the control bar (right before Fullscreen) or press the P key
          while the player has focus.
        </Text>
      </Alert>

      <Video
        src="https://archive.org/download/mantas-in-3-minutes/Manta%201%20minute.ia.mp4"
        poster="https://archive.org/services/img/mantas-in-3-minutes"
        aspectRatio={16 / 9}
        onEnterPictureInPicture={() => setPipActive(true)}
        onLeavePictureInPicture={() => setPipActive(false)}
      />
    </Stack>
  );
}
`;

function Demo() {
  const [pipActive, setPipActive] = useState(false);

  return (
    <Stack gap="md" maw={640} mx="auto">
      <Alert
        color={pipActive ? 'green' : 'blue'}
        variant="light"
        icon={pipActive ? <IconPictureInPictureOn /> : <IconPictureInPicture />}
        title={pipActive ? 'Picture-in-Picture is ACTIVE' : 'Picture-in-Picture is inactive'}
      >
        <Text size="sm">
          Click the PiP button on the control bar (right before Fullscreen — it looks like a
          rectangle with a corner cut out) or press the <kbd>P</kbd> key while the player has
          focus.
        </Text>
      </Alert>

      <Video
        src="https://archive.org/download/mantas-in-3-minutes/Manta%201%20minute.ia.mp4"
        poster="https://archive.org/services/img/mantas-in-3-minutes"
        aspectRatio={16 / 9}
        onEnterPictureInPicture={() => setPipActive(true)}
        onLeavePictureInPicture={() => setPipActive(false)}
      />
    </Stack>
  );
}

export const pictureInPicture: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
