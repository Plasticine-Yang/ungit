import { resolve } from 'path'

import { GithubRepoResolver } from '../../github-repo-resolver'
import { downloadGithubRepoArchive } from '../download-github-repo-archive'

describe('downloadGithubRepoArchive', () => {
  test(
    'should download archive',
    async () => {
      const beforeResolveRepoRefs = vi.fn()
      const onResolveRepoRefsSuccess = vi.fn()
      const onResolveRepoRefsFailed = vi.fn()

      const githubRepoResolver = new GithubRepoResolver('Plasticine-Yang/Plasticine-Yang.github.io', {
        beforeResolveRepoRefs,
        onResolveRepoRefsSuccess,
        onResolveRepoRefsFailed,
      })
      const githubRepoRef = await githubRepoResolver.resolveGithubRepoRef().catch((error) => {
        expect(onResolveRepoRefsFailed).toHaveBeenCalledOnce()
        throw error
      })
      const githubRepoArchive = githubRepoResolver.resolveGithubRepoArchive(githubRepoRef)

      expect(beforeResolveRepoRefs).toHaveBeenCalledOnce()
      expect(onResolveRepoRefsSuccess).toHaveBeenCalledOnce()

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
