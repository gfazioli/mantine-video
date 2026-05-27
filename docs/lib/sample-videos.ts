/**
 * Local sample videos served from `docs/public/videos/`.
 *
 * - `manta.mp4` (~5 MB, 54s) — public-domain manta-ray snorkeling footage from
 *   https://archive.org/details/mantas-in-3-minutes, re-encoded for web playback.
 * - `showcase.mp4` (~1 MB, 8s) — short user-provided clip used as the showcase
 *   background on the /homepage demo, re-encoded with the same ffmpeg pipeline.
 * - `aquarium.mp4` (~6 MB, 37s) — Charleston Aquarium tropical-fish footage,
 *   CC0 public domain from https://archive.org/details/aquarium-stock-video,
 *   used as the CTA background on the /homepage demo.
 *
 * All have been transcoded to H.264 baseline + faststart and stripped of audio
 * (background videos are always muted) to keep the repo lightweight.
 */

import { useRouter } from 'next/router';

const MANTA_PATH = '/videos/manta.mp4';
const MANTA_WEBM_PATH = '/videos/manta.webm';
const MANTA_POSTER_PATH = '/videos/manta-poster.jpg';
const SHOWCASE_PATH = '/videos/showcase.mp4';
const SHOWCASE_POSTER_PATH = '/videos/showcase-poster.jpg';
const AQUARIUM_PATH = '/videos/aquarium.mp4';
const AQUARIUM_POSTER_PATH = '/videos/aquarium-poster.jpg';

function useAssetPath(path: string) {
  const { basePath } = useRouter();
  return `${basePath}${path}`;
}

export function useSampleVideos() {
  return {
    manta: useAssetPath(MANTA_PATH),
    mantaWebm: useAssetPath(MANTA_WEBM_PATH),
    mantaPoster: useAssetPath(MANTA_POSTER_PATH),
    showcase: useAssetPath(SHOWCASE_PATH),
    showcasePoster: useAssetPath(SHOWCASE_POSTER_PATH),
    aquarium: useAssetPath(AQUARIUM_PATH),
    aquariumPoster: useAssetPath(AQUARIUM_POSTER_PATH),
  };
}

/**
 * Plain string paths to display inside code snippets — relative URLs that work
 * for visitors of the docs site. Do NOT use them in JSX; use {@link useSampleVideos}
 * inside components so basePath is applied correctly.
 */
export const SAMPLE_VIDEO_PATHS = {
  manta: MANTA_PATH,
  mantaPoster: MANTA_POSTER_PATH,
  showcase: SHOWCASE_PATH,
  showcasePoster: SHOWCASE_POSTER_PATH,
  aquarium: AQUARIUM_PATH,
  aquariumPoster: AQUARIUM_POSTER_PATH,
};
