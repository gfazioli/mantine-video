export interface PackageData {
  /** Package name as in npm, for example, `mantine-extension-template` */
  packageName: string;

  /** Description of the package, displayed below the title in documentation */
  packageDescription: string;

  /** Link to the documentation mdx file, used in "Edit this page button" */
  mdxFileUrl: string;

  /** Link to the repository on GitHub, used in header github icon and in "View source code button" */
  repositoryUrl: string;

  /** Link to the license file */
  licenseUrl?: string;

  /** Information about the author of the package */
  author: {
    /** Package author name, for example, `John Doe` */
    name: string;

    /** Author GitHub username, for example, `rtivital` */
    githubUsername: string;
  };
}

export const PACKAGE_DATA: PackageData = {
  packageName: '@gfazioli/mantine-video',
  packageDescription:
    'A customizable video player component for React built with Mantine. Compound API, headless useVideo hook, theme integration, and full Styles API support.',
  mdxFileUrl: 'https://github.com/gfazioli/mantine-video/blob/master/docs/docs.mdx',
  repositoryUrl: 'https://github.com/gfazioli/mantine-video',
  licenseUrl: 'https://github.com/gfazioli/mantine-video/blob/master/LICENSE',
  author: {
    name: 'Giovambattista Fazioli',
    githubUsername: 'gfazioli',
  },
};
