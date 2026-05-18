import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowLeft, IconBrandGithub, IconBrandNpm } from '@tabler/icons-react';
import { Video } from '@gfazioli/mantine-video';
import { useSampleVideos } from '../lib/sample-videos';

export default function FullscreenPage() {
  const v = useSampleVideos();
  return (
    <Box pos="relative" h="100vh" w="100vw" style={{ overflow: 'hidden' }}>
      <Video src={v.manta} poster={v.mantaPoster} asBackground autoPlay muted loop />

      {/* Dark gradient overlay for readability */}
      <Box
        pos="absolute"
        style={{
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Back to docs */}
      <ActionIcon
        component={Anchor}
        href="/mantine-video"
        size="lg"
        variant="default"
        pos="absolute"
        top={20}
        left={20}
        style={{ zIndex: 3 }}
        aria-label="Back to docs"
      >
        <IconArrowLeft size={18} />
      </ActionIcon>

      {/* Centered hero content */}
      <Container
        size="md"
        pos="relative"
        h="100%"
        style={{ zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Stack align="center" gap="lg" ta="center" c="white">
          <Badge color="blue" variant="light" size="lg">
            @gfazioli/mantine-video
          </Badge>
          <Title order={1} fz={{ base: 40, sm: 64, md: 80 }} fw={900} lh={1}>
            A Mantine‑native
            <br />
            video player
          </Title>
          <Text fz={{ base: 16, md: 20 }} maw={560} c="rgba(255,255,255,0.85)">
            Compound API, headless <code>useVideo</code> hook, full Styles API, four variants,
            picture‑in‑picture, fullscreen, captions, keyboard shortcuts — and yes, it can also be
            a background video like the one playing right now.
          </Text>
          <Group mt="md">
            <Button
              component="a"
              href="https://github.com/gfazioli/mantine-video"
              leftSection={<IconBrandGithub size={18} />}
              size="md"
              variant="white"
              color="dark"
            >
              View on GitHub
            </Button>
            <Button
              component="a"
              href="https://www.npmjs.com/package/@gfazioli/mantine-video"
              leftSection={<IconBrandNpm size={18} />}
              size="md"
              variant="default"
            >
              npm
            </Button>
          </Group>
        </Stack>
      </Container>

      {/* Credit */}
      <Text
        pos="absolute"
        bottom={20}
        left={20}
        fz={11}
        c="rgba(255,255,255,0.5)"
        style={{ zIndex: 3 }}
      >
        Manta footage —{' '}
        <Anchor
          href="https://archive.org/details/mantas-in-3-minutes"
          c="rgba(255,255,255,0.7)"
          target="_blank"
          rel="noopener"
        >
          Internet Archive
        </Anchor>
      </Text>
    </Box>
  );
}
