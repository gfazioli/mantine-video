/**
 * Local sample videos served from `docs/public/videos/`.
 *
 * Both files are dedicated to the public domain (CC0 — Internet Archive) and
 * have been re-encoded with ffmpeg to keep the repo lightweight:
 *
 *   manta.mp4    — ~5 MB, 54s, original at https://archive.org/details/mantas-in-3-minutes
 *   aquarium.mp4 — ~6 MB, 37s, original at https://archive.org/details/aquarium-stock-video
 */

import { useRouter } from 'next/router';

const MANTA_PATH = '/videos/manta.mp4';
const MANTA_POSTER_PATH = '/videos/manta-poster.jpg';
const AQUARIUM_PATH = '/videos/aquarium.mp4';
const AQUARIUM_POSTER_PATH = '/videos/aquarium-poster.jpg';

function useAssetPath(path: string) {
  const { basePath } = useRouter();
  return `${basePath}${path}`;
}

export function useSampleVideos() {
  return {
    manta: useAssetPath(MANTA_PATH),
    mantaPoster: useAssetPath(MANTA_POSTER_PATH),
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
  aquarium: AQUARIUM_PATH,
  aquariumPoster: AQUARIUM_POSTER_PATH,
};
