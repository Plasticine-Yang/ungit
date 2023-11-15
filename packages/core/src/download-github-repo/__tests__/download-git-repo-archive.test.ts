import { resolve } from 'path'

import { GithubRepoResolver } from '../../github-repo-resolver'
import { downloadGithubRepoArchive } from '../download-github-repo-archive'

describe('downloadGithubRepoArchive', () => {
  test(
    'should download archive',
    async () => {
      const githubRepoResolver = new GithubRepoResolver('Plasticine-Yang/Plasticine-Yang.github.io')
      const githubRepoArchive = await githubRepoResolver.resolveGithubRepoArchive()

      await downloadGithubRepoArchive(githubRepoArchive, {
        outputPath: resolve(__dirname, 'fixtures'),
        onProgress(downloadedSize, totalSize) {
          console.log(downloadedSize, totalSize)
        },
      })
    },
    { timeout: 0 },
  )
})
