import { resolve } from 'path'

import { GithubRepoResolver } from '../../github-repo-resolver'
import { downloadGithubRepoArchive } from '../download-github-repo-archive'

describe('downloadGithubRepoArchive', () => {
  test.skip(
    'should download archive',
    async () => {
      const githubRepoResolver = new GithubRepoResolver('Plasticine-Yang/Plasticine-Yang.github.io')
      const githubRepoRef = await githubRepoResolver.resolveGithubRepoRef()
      const githubRepoArchive = githubRepoResolver.resolveGithubRepoArchive(githubRepoRef)

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
