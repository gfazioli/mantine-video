import { render, screen } from '@mantine-tests/core';
import { MantineProvider } from '@mantine/core';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import React from 'react';
import { cueLift } from './cue-lift';
import { Video } from './Video';

describe('Video', () => {
  it('renders without crashing', () => {
    render(<Video src="/test.mp4" />);
    expect(document.querySelector('video')).toBeTruthy();
  });

  it('forwards ref to the container', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Video ref={ref} src="/test.mp4" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes src to the underlying <video> element', () => {
    render(<Video src="/example.mp4" />);
    const video = document.querySelector('video');
    expect(video?.getAttribute('src')).toBe('/example.mp4');
  });

  it('applies the variant data attribute', () => {
    render(<Video src="/test.mp4" variant="floating" data-testid="player" />);
    expect(screen.getByTestId('player').getAttribute('data-variant')).toBe('floating');
  });

  it('renders the default Controls when controls is true', () => {
    render(<Video src="/test.mp4" controls />);
    expect(screen.getByLabelText(/play/i)).toBeTruthy();
  });

  it('does not render the default Controls when controls is false and no children are passed', () => {
    render(<Video src="/test.mp4" controls={false} />);
    expect(screen.queryByLabelText(/play/i)).toBeNull();
  });

  it('renders <source> children when `sources` is provided', () => {
    render(
      <Video
        sources={[
          { src: '/clip.webm', type: 'video/webm' },
          { src: '/clip.mp4', type: 'video/mp4' },
        ]}
      />
    );
    const sources = document.querySelectorAll('video source');
    expect(sources).toHaveLength(2);
    expect(sources[0].getAttribute('src')).toBe('/clip.webm');
    expect(sources[0].getAttribute('type')).toBe('video/webm');
    expect(sources[1].getAttribute('src')).toBe('/clip.mp4');
  });

  it('omits the `src` attribute on <video> when `sources` is used', () => {
    render(<Video sources={[{ src: '/clip.mp4', type: 'video/mp4' }]} />);
    const video = document.querySelector('video');
    expect(video?.hasAttribute('src')).toBe(false);
  });

  it('forwards the `media` attribute on each <source>', () => {
    render(
      <Video
        sources={[
          { src: '/small.mp4', type: 'video/mp4', media: '(max-width: 600px)' },
          { src: '/large.mp4', type: 'video/mp4' },
        ]}
      />
    );
    const sources = document.querySelectorAll('video source');
    expect(sources[0].getAttribute('media')).toBe('(max-width: 600px)');
    expect(sources[1].hasAttribute('media')).toBe(false);
  });

  it('uses the single `src` attribute when no `sources` are given', () => {
    render(<Video src="/only.mp4" />);
    const video = document.querySelector('video');
    expect(video?.getAttribute('src')).toBe('/only.mp4');
    expect(document.querySelectorAll('video source')).toHaveLength(0);
  });

  it('exposes compound sub-components as static properties', () => {
    expect(Video.Controls).toBeDefined();
    expect(Video.PlayButton).toBeDefined();
    expect(Video.Timeline).toBeDefined();
    expect(Video.TimeDisplay).toBeDefined();
    expect(Video.MuteButton).toBeDefined();
    expect(Video.FullscreenButton).toBeDefined();
    expect(Video.PiPButton).toBeDefined();
    expect(Video.CaptionsButton).toBeDefined();
    expect(Video.SkipButton).toBeDefined();
  });

  // ─── Text tracks ────────────────────────────────────────────────────────────
  //
  // Before the `tracks` prop existed there was no way to attach a text track at all: the
  // component's `children` render *outside* the media element (that slot is the control bar), so a
  // consumer-supplied <track> never reached the <video> and `textTracks` stayed empty. That in turn
  // meant Video.CaptionsButton could never show itself, since it bails out on `hasTracks === false`.
  // These tests pin the contract that closes that gap.

  it('renders tracks as <track> children of the <video> element', () => {
    render(
      <Video
        src="/v.mp4"
        tracks={[
          { src: '/en.vtt', srcLang: 'en', label: 'English', default: true },
          { src: '/it.vtt', kind: 'subtitles', srcLang: 'it', label: 'Italiano' },
        ]}
      />
    );

    // Inside the media element, not merely somewhere in the tree — that distinction is the bug.
    const tracks = document.querySelectorAll('video > track');
    expect(tracks).toHaveLength(2);

    expect(tracks[0].getAttribute('src')).toBe('/en.vtt');
    expect(tracks[0].getAttribute('srclang')).toBe('en');
    expect(tracks[0].getAttribute('label')).toBe('English');
    expect(tracks[0].hasAttribute('default')).toBe(true);

    expect(tracks[1].getAttribute('kind')).toBe('subtitles');
    expect(tracks[1].hasAttribute('default')).toBe(false);
  });

  it('defaults a track kind to captions', () => {
    render(<Video src="/v.mp4" tracks={[{ src: '/en.vtt', srcLang: 'en' }]} />);
    expect(document.querySelector('video > track')?.getAttribute('kind')).toBe('captions');
  });

  it('renders no track element when tracks is absent or empty', () => {
    const { unmount } = render(<Video src="/v.mp4" />);
    expect(document.querySelectorAll('video > track')).toHaveLength(0);
    unmount();

    render(<Video src="/v.mp4" tracks={[]} />);
    expect(document.querySelectorAll('video > track')).toHaveLength(0);
  });

  it('renders both sources and tracks together', () => {
    render(
      <Video
        sources={[{ src: '/v.webm', type: 'video/webm' }]}
        tracks={[{ src: '/en.vtt', srcLang: 'en' }]}
      />
    );
    expect(document.querySelectorAll('video > source')).toHaveLength(1);
    expect(document.querySelectorAll('video > track')).toHaveLength(1);
  });

  // The browser tries the <source> entries in order. Each one that fails fires `error` on itself,
  // and React lets that event bubble to the <video>'s onError, so the first failure used to swap in
  // `fallbackSrc` while a later, working source was still waiting its turn.
  describe('fallbackSrc', () => {
    let load: jest.SpyInstance;
    beforeEach(() => {
      load = jest.spyOn(window.HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
    });
    afterEach(() => load.mockRestore());

    it('waits for the last <source> to fail', () => {
      render(
        <Video
          sources={[
            { src: '/missing.webm', type: 'video/webm' },
            { src: '/clip.mp4', type: 'video/mp4' },
          ]}
          fallbackSrc="/fallback.mp4"
        />
      );
      const video = document.querySelector('video')!;
      const [first, last] = Array.from(document.querySelectorAll('video > source'));

      fireEvent.error(first);
      expect(video.getAttribute('src')).toBeNull();
      expect(document.querySelectorAll('video > source')).toHaveLength(2);
      expect(load).not.toHaveBeenCalled();

      fireEvent.error(last);
      expect(video.getAttribute('src')).toBe('/fallback.mp4');
      expect(document.querySelectorAll('video > source')).toHaveLength(0);
      expect(load).toHaveBeenCalledTimes(1);
    });

    describe('when the selection ended before mount (server-rendered markup)', () => {
      let state: jest.SpyInstance;
      let current: jest.SpyInstance;
      beforeEach(() => {
        state = jest
          .spyOn(window.HTMLMediaElement.prototype, 'networkState', 'get')
          .mockReturnValue(window.HTMLMediaElement.NETWORK_NO_SOURCE);
      });
      afterEach(() => {
        state.mockRestore();
        current?.mockRestore();
      });
      const player = () => (
        <Video sources={[{ src: '/missing.mp4', type: 'video/mp4' }]} fallbackSrc="/fallback.mp4" />
      );

      it('swaps once the last source was tried', () => {
        current = jest
          .spyOn(window.HTMLMediaElement.prototype, 'currentSrc', 'get')
          .mockReturnValue(`${window.location.origin}/missing.mp4`);
        render(player());
        expect(document.querySelector('video')!.getAttribute('src')).toBe('/fallback.mp4');
      });

      it('waits while nothing has been tried yet', () => {
        // A fresh or changed source set passes through NETWORK_NO_SOURCE before selection starts.
        render(player());
        expect(document.querySelector('video')!.getAttribute('src')).toBeNull();
      });
    });

    it('tries the fallback once, also across re-renders with an inline sources array', () => {
      const sources = () => [{ src: '/missing.mp4', type: 'video/mp4' }];
      // @mantine-tests/core's rerender remounts the tree; this one keeps it mounted.
      const { rerender } = rtlRender(<Video sources={sources()} fallbackSrc="/fallback.mp4" />, {
        wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider>,
      });
      fireEvent.error(document.querySelector('video > source')!);
      expect(load).toHaveBeenCalledTimes(1);

      rerender(<Video sources={sources()} fallbackSrc="/fallback.mp4" />);
      fireEvent.error(document.querySelector('video')!); // the fallback fails too
      expect(load).toHaveBeenCalledTimes(1);
    });

    it('swaps a failing src', () => {
      render(<Video src="/missing.mp4" fallbackSrc="/fallback.mp4" />);
      const video = document.querySelector('video')!;
      fireEvent.error(video);
      expect(video.getAttribute('src')).toBe('/fallback.mp4');
      expect(load).toHaveBeenCalledTimes(1);
    });
  });

  // Ten steps of 0.05 down from 1 gave 0.49999999999999994, so the low-volume icon showed while
  // the volume read 0.5.
  it('lands the keyboard volume steps on exact hundredths', () => {
    render(<Video src="/v.mp4" data-testid="player" />);
    const player = screen.getByTestId('player');
    const video = document.querySelector('video')!;
    for (let i = 0; i < 10; i += 1) {
      fireEvent.keyDown(player, { key: 'ArrowDown' });
    }
    expect(video.volume).toBe(0.5);
  });
});

// Chrome paints a cue at the bottom of the video, so the overlay bar covered it whenever the bar
// was showing. While it shows, the captions' container is moved up by the height the bar covers.
describe('cue lift', () => {
  it('measures how much of the video the bar covers, plus a gap', () => {
    const root = document.createElement('div');
    const video = (offsetHeight: number) => ({ offsetTop: 0, offsetHeight });
    expect(cueLift(video(360), { offsetTop: 302, offsetParent: root })).toBe(62);
    expect(cueLift(video(360), { offsetTop: 360, offsetParent: root })).toBeNull();
    expect(cueLift(video(0), { offsetTop: 0, offsetParent: root })).toBeNull();
    // a bar with display: none, or removed, has no offset parent (and reads 0)
    expect(cueLift(video(360), { offsetTop: 0, offsetParent: null })).toBeNull();
  });

  describe('on the player', () => {
    let height: jest.SpyInstance;
    let top: jest.SpyInstance;
    let parent: jest.SpyInstance;
    beforeEach(() => {
      parent = jest
        .spyOn(window.HTMLElement.prototype, 'offsetParent', 'get')
        .mockImplementation(function offsetParent(this: HTMLElement) {
          return this.parentElement;
        });
      // jsdom has no layout: a 360 px video whose bar starts 302 px down.
      height = jest
        .spyOn(window.HTMLElement.prototype, 'offsetHeight', 'get')
        .mockImplementation(function offsetHeight(this: HTMLElement) {
          return this.tagName === 'VIDEO' ? 360 : 0;
        });
      top = jest
        .spyOn(window.HTMLElement.prototype, 'offsetTop', 'get')
        .mockImplementation(function offsetTop(this: HTMLElement) {
          return this.classList.contains('controls') ? 302 : 0;
        });
    });
    afterEach(() => {
      height.mockRestore();
      top.mockRestore();
      parent.mockRestore();
    });
    const tracks = [{ src: '/en.vtt', srcLang: 'en' }];

    it('lifts the captions while the overlay bar shows', () => {
      render(<Video src="/v.mp4" tracks={tracks} data-testid="player" />);
      const player = screen.getByTestId('player');
      expect(player.style.getPropertyValue('--video-cue-lift')).toBe('62px');
    });

    it('leaves them alone without tracks, or with the bar under the video', () => {
      const lift = () => screen.getByTestId('player').style.getPropertyValue('--video-cue-lift');
      const { unmount } = render(<Video src="/v.mp4" data-testid="player" />);
      expect(lift()).toBe('');
      unmount();

      render(<Video src="/v.mp4" tracks={tracks} variant="minimal" data-testid="player" />);
      expect(lift()).toBe('');
    });
  });
});
