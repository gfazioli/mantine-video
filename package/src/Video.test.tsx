import React from 'react';
import { render, screen } from '@mantine-tests/core';
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
});
