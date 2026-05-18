# Mantine Video Component

<img alt="Mantine Video" src="https://github.com/gfazioli/mantine-video/blob/master/logo.jpeg" />

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-video?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-video)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-video?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-video)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-video?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-video)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-video?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)  

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.
It requires **Mantine 9.x** and **React 19**.

[Mantine Video](https://gfazioli.github.io/mantine-video/) is a Mantine‑native video player built on top of the standard HTML `<video>` element. It pairs a polymorphic root component with a complete **compound API** (`Video.Controls`, `Video.PlayButton`, `Video.Timeline`, `Video.MuteButton`, `Video.CaptionsButton`, `Video.PiPButton`, `Video.FullscreenButton`, `Video.SkipButton`, `Video.TimeDisplay`) and a fully **headless `useVideo` hook** so you can either use the batteries‑included control bar, compose your own with Mantine sub‑components, or build a 100% custom UI on top of the underlying state. Every part is theme‑aware (color scheme, theme colors, radii, sizes), accessible (ARIA labels, keyboard shortcuts, focus management), and customizable through the full Mantine **Styles API** (`classNames`, `styles`, `vars`, `unstyled`). Four built‑in `variant`s — `overlay`, `minimal`, `floating`, `bordered` — cover the most common layouts out of the box. Fullscreen and **Picture‑in‑Picture** are wired in for browsers that support the standard APIs, with capability‑aware sub‑components that self‑hide when not supported (so you never see a broken button on Firefox).

## Features

- 🎬 **Compound API** — `Video.Controls`, `Video.PlayButton`, `Video.SkipButton`, `Video.Timeline`, `Video.TimeDisplay`, `Video.MuteButton`, `Video.CaptionsButton`, `Video.PiPButton`, `Video.FullscreenButton`
- 🪝 **Headless `useVideo` hook** — full state (`playing`, `currentTime`, `duration`, `buffered`, `volume`, `muted`, `playbackRate`, `fullscreen`, `pip`, `canPlay`, `canFullscreen`, `canPiP`, `isLoading`, `error`) and actions (`play`, `pause`, `toggle`, `seek`, `seekBy`, `setVolume`, `toggleMute`, `setPlaybackRate`, `toggleFullscreen`, `togglePiP`)
- 🎭 **Four variants** — `overlay` (default, YouTube‑style), `minimal`, `floating`, `bordered`
- 🎨 **Mantine theme integration** — `color`, `radius`, `size` props plus full color‑scheme awareness
- 🎨 **Styles API** — `classNames`, `styles`, `vars`, `unstyled` on every part
- ⌨️ **Keyboard shortcuts** — Space / K (play/pause), J / L (±10s), ←/→ (±5s), ↑/↓ (volume), M (mute), F (fullscreen), P (PiP)
- 🖥️ **Fullscreen + Picture‑in‑Picture** out of the box, capability‑aware
- 🗣️ **Captions / subtitles** via native `<track>` — toggle button auto‑hides when no tracks present
- 🎛️ **Controlled + uncontrolled** for `playing`, `currentTime`, `volume`, `playbackRate`
- ♿ **Accessibility** — ARIA labels, `aria-pressed` toggles, focus‑visible outlines
- 📦 **TypeScript** — full type safety, every prop documented

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-video/) → [Youtube Video](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4) → [More Mantine Components](https://mantine-extensions.vercel.app/)

## Installation

```sh
npm install @gfazioli/mantine-video
```
or

```sh
yarn add @gfazioli/mantine-video
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-video/styles.css';
```

Or use the layered version inside `@layer mantine-video`:

```tsx
import '@gfazioli/mantine-video/styles.layer.css';
```

## Usage

The simplest usage — pass `src`, optionally `poster` and `aspectRatio`, and you get a fully themed player with play / pause, seekable timeline, time display, volume, captions, picture‑in‑picture and fullscreen out of the box:

```tsx
import { Video } from '@gfazioli/mantine-video';

function Demo() {
  return (
    <Video
      src="https://example.com/video.mp4"
      poster="https://example.com/poster.jpg"
      aspectRatio={16 / 9}
    />
  );
}
```

### Custom controls

The default control bar is just a sensible composition of compound sub‑components. Pass `controls={false}` and provide your own `<Video.Controls>` children to fully customize the layout — reorder, drop, add or theme any part:

```tsx
import { Video } from '@gfazioli/mantine-video';

function Demo() {
  return (
    <Video src="https://example.com/video.mp4" aspectRatio={16 / 9} controls={false}>
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
```

### Headless with `useVideo`

If you need a completely custom UI, skip `<Video>` and use the `useVideo` hook directly. It returns the video state and a full set of actions; just bind the `videoRef` to a native `<video>` element:

```tsx
import { ActionIcon, Slider } from '@mantine/core';
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import { useVideo } from '@gfazioli/mantine-video';

function Demo() {
  const video = useVideo();

  return (
    <div>
      <video ref={video.videoRef} src="https://example.com/video.mp4" />
      <ActionIcon onClick={video.toggle}>
        {video.playing ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
      </ActionIcon>
      <Slider value={video.currentTime} max={video.duration} onChange={video.seek} />
    </div>
  );
}
```

### Picture-in-Picture lifecycle

Hook into the user popping the video in and out — for example to dim a sidebar or show a "playing in PiP" indicator elsewhere on the page:

```tsx
<Video
  src="..."
  onEnterPictureInPicture={() => console.log('entered PiP')}
  onLeavePictureInPicture={() => console.log('left PiP')}
/>
```

## Variants

| Variant | Description |
|---------|-------------|
| `overlay` *(default)* | Controls float over the bottom of the video with a gradient backdrop, fade in on hover, auto‑hide while playing |
| `minimal` | Controls placed below the video in the page flow, no overlay |
| `floating` | Like `overlay` but the bar is a rounded floating card with a blurred backdrop |
| `bordered` | Bordered container wraps both video and controls below, ideal for cards / lists |

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates	
- Add new features, improve performance, and refine the developer experience	
- Expand test coverage and documentation for smoother adoption	
- Ensure long‑term sustainability without relying on ad hoc free time	
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

---
  
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-video&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-video&Timeline)
