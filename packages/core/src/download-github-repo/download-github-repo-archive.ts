import { ensureDirectoryExist } from '@ungit/shared'
import axios from 'axios'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'

import type { GithubRepoArchive } from '../github-repo-resolver'
import { DEFAULT_OUTPUT_PATH } from './constants'
import type { DownloadGitRepoOptions } from './types'

/**
 * 下载 Github 仓库压缩包
 */
export async function downloadGithubRepoArchive(
  githubRepoArchive: GithubRepoArchive,
  options?: DownloadGitRepoOptions,
) {
  const { url, filename } = githubRepoArchive
  const outputPath = options?.outputPath ?? DEFAULT_OUTPUT_PATH

  const resolvedOutputPath = resolve(outputPath!)

  // 确保输出目录存在
  await ensureDirectoryExist(resolvedOutputPath)

  const downloadedFilePath = resolve(outputPath, filename)

  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    onDownloadProgress(progressEvent) {
      const { loaded, total } = progressEvent

      options?.onProgress?.(loaded, total ?? 0)
    },
  })

  await writeFile(downloadedFilePath, response.data)

  return downloadedFilePath
}
