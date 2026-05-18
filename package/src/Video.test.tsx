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
