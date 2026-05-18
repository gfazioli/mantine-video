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

The [Mantine Video](https://gfazioli.github.io/mantine-video/) component is a customizable video player for React applications built with Mantine. It wraps the native HTML `<video>` element with a compound API in Mantine ecosystem style, a headless `useVideo` hook, theme-aware styling and a complete Styles API.

## Features

- 🎬 **Compound API**: `Video.Controls`, `Video.PlayButton`, `Video.Timeline`, `Video.MuteButton`, `Video.FullscreenButton`, `Video.PiPButton`, `Video.CaptionsButton`, `Video.SkipButton`, `Video.TimeDisplay`
- 🪝 **Headless `useVideo` hook**: full state and actions to build a fully custom UI
- 🎨 **Mantine theme integration**: ColorScheme aware, theme colors, radii, sizes
- 🎭 **Variants**: `overlay`, `minimal`, `floating`, `bordered`
- ⌨️ **Keyboard shortcuts**: Space, ←/→, ↑/↓, M, F, P, J/K/L
- 🖥️ **Fullscreen + Picture-in-Picture** out of the box
- 🗣️ **Captions / subtitles** via native `<track>`
- ♿ **Accessibility**: ARIA labels, focus-visible, screen reader friendly
- 🎨 **Styles API**: complete `classNames`, `styles`, `vars`, `unstyled` support on every part
- 📦 **TypeScript**: full type safety out of the box

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

## Usage

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

```tsx
import { Video } from '@gfazioli/mantine-video';

function Demo() {
  return (
    <Video src="..." controls={false}>
      <Video.Controls>
        <Video.PlayButton />
        <Video.SkipButton seconds={-10} />
        <Video.SkipButton seconds={10} />
        <Video.Timeline />
        <Video.TimeDisplay format="current/-remaining" />
        <Video.MuteButton />
        <Video.FullscreenButton />
      </Video.Controls>
    </Video>
  );
}
```

### Headless with `useVideo`

```tsx
import { useVideo } from '@gfazioli/mantine-video';

function Demo() {
  const video = useVideo();
  return (
    <div>
      <video ref={video.videoRef} src="..." />
      <button onClick={video.toggle}>{video.playing ? 'Pause' : 'Play'}</button>
    </div>
  );
}
```

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

