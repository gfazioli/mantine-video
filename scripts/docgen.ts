import { generateDeclarations } from 'mantine-docgen-script';
import path from 'path';

const getComponentPath = (componentPath: string) =>
  path.join(process.cwd(), 'package/src', componentPath);

generateDeclarations({
  componentsPaths: [
    getComponentPath('Video.tsx'),
    getComponentPath('components/VideoControls.tsx'),
    getComponentPath('components/VideoPlayButton.tsx'),
    getComponentPath('components/VideoTimeline.tsx'),
    getComponentPath('components/VideoTimeDisplay.tsx'),
    getComponentPath('components/VideoMuteButton.tsx'),
    getComponentPath('components/VideoFullscreenButton.tsx'),
    getComponentPath('components/VideoPiPButton.tsx'),
    getComponentPath('components/VideoCaptionsButton.tsx'),
    getComponentPath('components/VideoSkipButton.tsx'),
  ],
  tsConfigPath: path.join(process.cwd(), 'tsconfig.json'),
  outputPath: path.join(process.cwd(), 'docs'),
});
