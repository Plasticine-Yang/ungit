import { ensureDirectoryExist } from '@ungit/shared'
import { extract } from 'tar'

import { resolveExtractTarGZOptions } from './resolve-options'
import type { ExtractTarGZOptions } from './types'

export function extractTarGZ(tarGZFilePath: string, targetDirectoryPath: string, options?: ExtractTarGZOptions) {
  const { subDirectory } = resolveExtractTarGZOptions(options)

  return new Promise((resolve, reject) => {
    const performWork = async () => {
      await ensureDirectoryExist(targetDirectoryPath)

      // Plasticine-Yang.github.io-39a262dd82249751f175bf2b7f72ad74584fc921/docs/typescript/type-challenges/easy.md
      extract(
        {
          file: tarGZFilePath,
          cwd: targetDirectoryPath,
          strip: subDirectory ? subDirectory.split('/').length : 1,
        },
        subDirectory ? [subDirectory] : [],
        (error) => {
          if (error) {
            reject(error)
          } else {
            resolve(null)
          }
        },
      )
    }

    performWork()
  })
}
