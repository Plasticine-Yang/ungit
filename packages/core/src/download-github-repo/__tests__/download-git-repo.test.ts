import { resolve } from 'path'

import { downloadGitRepo } from '../download-github-repo'

describe('downloadGitRepo', () => {
  test(
    'should work',
    async () => {
      await downloadGitRepo('Plasticine-Yang/Plasticine-Yang.github.io', {
        outputPath: resolve(__dirname, 'fixtures'),
        onProgress(downloadedSize, totalSize) {
          console.log(downloadedSize, totalSize)
        },
      })
    },
    { timeout: 0 },
  )
})
