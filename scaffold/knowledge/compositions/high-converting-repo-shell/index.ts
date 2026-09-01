export interface RepoShellConfig {
  name: string;
  org: string;
  tagline: string;
  benefit: string;
  runtime: 'bun' | 'node' | 'rust';
  license: string;
}

export function generateRepoManifest(config: RepoShellConfig) {
  return {
    projectName: config.name,
    repository: `https://github.com/${config.org}/${config.name}`,
    badges: {
      stars: `https://img.shields.io/github/stars/${config.org}/${config.name}?style=flat-square&logo=github&color=blue`,
      runtime: `https://img.shields.io/badge/runtime-${config.runtime}-black?style=flat-square`,
      license: `https://img.shields.io/badge/license-${config.license}-22c55e?style=flat-square`
    },
    llmsTxt: {
      path: 'llms.txt',
      targetTokens: 500
    }
  };
}
