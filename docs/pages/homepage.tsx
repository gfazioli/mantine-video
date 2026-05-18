import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconArrowRight,
  IconBolt,
  IconBrandGithub,
  IconCode,
  IconDeviceTv,
  IconPalette,
  IconPlayerPlayFilled,
  IconShieldCheck,
  IconWand,
} from '@tabler/icons-react';
import { Video } from '@gfazioli/mantine-video';

const MANTA_VIDEO = 'https://archive.org/download/mantas-in-3-minutes/Manta%201%20minute.ia.mp4';
const MANTA_POSTER = 'https://archive.org/services/img/mantas-in-3-minutes';

// Charleston Aquarium stock footage — CC0 public domain, ~37s, colourful tropical fish
const AQUARIUM_VIDEO =
  'https://archive.org/download/aquarium-stock-video/CharlestonAquariumStockVideo-079.mp4';
const AQUARIUM_POSTER = 'https://archive.org/services/img/aquarium-stock-video';

const features = [
  {
    icon: IconCode,
    title: 'Compound API',
    description: 'Nine sub-components composable in any layout. Theme-aware, accessible, typed.',
  },
  {
    icon: IconWand,
    title: 'Headless hook',
    description: 'useVideo gives full state + actions to build any UI you can imagine.',
  },
  {
    icon: IconPalette,
    title: 'Styles API',
    description: 'classNames, styles, vars and unstyled on every part. Full theme integration.',
  },
  {
    icon: IconBolt,
    title: 'Live scrubbing',
    description: 'Drag the timeline and see the frame update in real time, YouTube‑style.',
  },
  {
    icon: IconDeviceTv,
    title: 'PiP + Fullscreen',
    description: 'Built-in support with capability detection — buttons self-hide where unsupported.',
  },
  {
    icon: IconShieldCheck,
    title: 'Accessibility',
    description: 'ARIA labels, focus management, keyboard shortcuts on every interactive part.',
  },
];

export default function HomepagePage() {
  return (
    <Box bg="black">
      {/* HERO SECTION — full viewport video background (manta footage) */}
      <Box pos="relative" h="100vh" style={{ overflow: 'hidden' }}>
        <Video src={MANTA_VIDEO} poster={MANTA_POSTER} asBackground autoPlay muted loop />

        <Box
          pos="absolute"
          style={{
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 100%)',
            pointerEvents: 'none',
          }}
        />

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

        <Container
          size="lg"
          pos="relative"
          h="100%"
          style={{ zIndex: 2, display: 'flex', alignItems: 'center' }}
        >
          <Stack gap="xl" maw={720} c="white">
            <Badge color="blue" variant="light" size="lg">
              Mantine Extensions
            </Badge>
            <Title order={1} fz={{ base: 44, sm: 64, md: 80 }} fw={900} lh={1.05}>
              Video that feels native to your design system.
            </Title>
            <Text fz={{ base: 18, md: 22 }} c="rgba(255,255,255,0.85)" lh={1.5}>
              A production‑ready video player for React, built on Mantine 9 and React 19. Compose
              the control bar from primitives, drive everything from a headless hook, or just drop
              it in as the background of your hero section — like the one you're looking at.
            </Text>
            <Group>
              <Button
                component="a"
                href="https://github.com/gfazioli/mantine-video"
                size="lg"
                variant="white"
                color="dark"
                leftSection={<IconPlayerPlayFilled size={18} />}
              >
                Get started
              </Button>
              <Button
                component="a"
                href="https://github.com/gfazioli/mantine-video"
                leftSection={<IconBrandGithub size={18} />}
                size="lg"
                variant="default"
              >
                GitHub
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* FEATURES SECTION — solid dark background, no video */}
      <Box bg="dark.9" py={120}>
        <Container size="lg">
          <Stack gap="xl" align="center" ta="center" mb={60}>
            <Badge color="gray" variant="light">
              What you get
            </Badge>
            <Title order={2} c="white" fz={{ base: 32, md: 48 }} fw={800}>
              Six features, zero compromises
            </Title>
            <Text c="dimmed" maw={560} fz={{ base: 16, md: 18 }}>
              Each part of the player is its own component you can swap, restyle or replace —
              without losing the integration with the rest of Mantine.
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            {features.map((feature) => (
              <Card
                key={feature.title}
                p="xl"
                radius="md"
                bg="dark.7"
                style={{ border: '1px solid var(--mantine-color-dark-5)' }}
              >
                <ThemeIcon size={48} radius="md" variant="light" color="blue" mb="md">
                  <feature.icon size={24} />
                </ThemeIcon>
                <Title order={3} c="white" fz={20} mb="xs">
                  {feature.title}
                </Title>
                <Text c="dimmed" fz={14} lh={1.6}>
                  {feature.description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* SHOWCASE SECTION — 70vh with a different video (aquarium reef) for visual variety */}
      <Box pos="relative" h="70vh" style={{ overflow: 'hidden' }}>
        <Video src={AQUARIUM_VIDEO} poster={AQUARIUM_POSTER} asBackground autoPlay muted loop />

        <Box
          pos="absolute"
          style={{
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        <Container
          size="lg"
          pos="relative"
          h="100%"
          style={{ zIndex: 2, display: 'flex', alignItems: 'center' }}
        >
          <Grid w="100%" gutter="xl">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="lg" c="white" maw={560}>
                <Badge color="cyan" variant="light">
                  Use it as background
                </Badge>
                <Title order={2} fz={{ base: 32, md: 56 }} fw={800} lh={1.1}>
                  One prop turns the player into a hero background.
                </Title>
                <Text fz={{ base: 16, md: 18 }} c="rgba(255,255,255,0.85)" lh={1.5}>
                  Pass <code>asBackground</code> and the component positions itself absolutely
                  inside its parent, applies <code>object-fit: cover</code>, disables all the
                  interactive defaults, and renders a discreet mute toggle in the corner. Drop
                  your content on top — text, CTAs, anything you like — and you're done.
                </Text>
                <Group>
                  <Button
                    component="a"
                    href="/mantine-video"
                    size="md"
                    variant="white"
                    color="dark"
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Read the docs
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* STATS SECTION — solid background again */}
      <Box bg="dark.8" py={100}>
        <Container size="lg">
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
            {[
              { value: '~15 KB', label: 'gzipped, without HLS' },
              { value: '9', label: 'compound sub‑components' },
              { value: '4', label: 'built‑in variants' },
              { value: '100%', label: 'Mantine theme aware' },
            ].map((stat) => (
              <Stack key={stat.label} gap={4} align="center" ta="center">
                <Text fz={{ base: 36, md: 48 }} fw={900} c="blue.4" lh={1}>
                  {stat.value}
                </Text>
                <Text c="dimmed" fz={14}>
                  {stat.label}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA SECTION — closes the page with the manta again (visual bookend) */}
      <Box pos="relative" h="60vh" style={{ overflow: 'hidden' }}>
        <Video src={MANTA_VIDEO} poster={MANTA_POSTER} asBackground autoPlay muted loop />

        <Box
          pos="absolute"
          style={{
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
          }}
        />

        <Container
          size="md"
          pos="relative"
          h="100%"
          style={{ zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Stack align="center" gap="lg" ta="center" c="white">
            <Title order={2} fz={{ base: 32, md: 48 }} fw={800}>
              Ready to add video to your Mantine app?
            </Title>
            <Group>
              <Button
                component="a"
                href="https://www.npmjs.com/package/@gfazioli/mantine-video"
                size="lg"
                variant="white"
                color="dark"
              >
                yarn add @gfazioli/mantine-video
              </Button>
            </Group>
            <Text fz={11} c="rgba(255,255,255,0.5)">
              Footage —{' '}
              <Anchor
                href="https://archive.org/details/mantas-in-3-minutes"
                c="rgba(255,255,255,0.7)"
                target="_blank"
                rel="noopener"
              >
                manta
              </Anchor>
              {' & '}
              <Anchor
                href="https://archive.org/details/aquarium-stock-video"
                c="rgba(255,255,255,0.7)"
                target="_blank"
                rel="noopener"
              >
                aquarium
              </Anchor>
              {' '}— Internet Archive
            </Text>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
