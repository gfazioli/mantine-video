/**
 * Browsers paint captions at the bottom of the video, which is where the overlay control bar
 * sits. While the bar shows, the player moves the captions' container up by the height the bar
 * covers (`--video-cue-lift`, read by `Video.module.css`), so the cues rest just above it.
 *
 * Moving the cues themselves (`VTTCue.line` with `lineAlign: 'end'`) is not an option: Chrome
 * ignores `lineAlign` and puts the cue's top where its bottom was meant to be.
 */

/** Space between the bar and the bottom of the captions, in pixels. */
const GAP = 4;

/**
 * How far to move the captions up, in pixels, or `null` when the bar does not cover the video.
 * Both positions are layout offsets in the player's root, so the bar's fade-in transform does not
 * count.
 */
export function cueLift(
  video: Pick<HTMLElement, 'offsetTop' | 'offsetHeight'>,
  bar: Pick<HTMLElement, 'offsetTop'>
): number | null {
  const covered = video.offsetTop + video.offsetHeight - bar.offsetTop;
  return video.offsetHeight > 0 && covered > 0 ? covered + GAP : null;
}
