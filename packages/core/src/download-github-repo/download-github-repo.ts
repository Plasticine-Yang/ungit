import { ensureDirectoryExist } from '@ungit/shared'
import axios from 'axios'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'

import { GithubRepoResolver } from '../github-repo-resolver'
import { resolveDownloadGitRepoOptions } from './resolve-options'
import type { DownloadGitRepoOptions } from './types'

/**
 * 下载 Github 仓库到指定目录
 */
export async function downloadGitRepo(userRepo: string, options?: DownloadGitRepoOptions) {
  const { outputPath, githubRepoInfoQuery, onProgress } = resolveDownloadGitRepoOptions(options)
  const resolvedOutputPath = resolve(outputPath!)

  // 确保输出目录存在
  await ensureDirectoryExist(resolvedOutputPath)

  const githubRepoResolver = new GithubRepoResolver(userRepo)
  const targetGithubRepoInfo = await githubRepoResolver.resolveGithubRepoInfo(githubRepoInfoQuery)

  if (targetGithubRepoInfo === null) {
    throw new Error('refs does not exist', { cause: githubRepoInfoQuery })
  }

  const { hash } = targetGithubRepoInfo
  const archiveUrl = await githubRepoResolver.resolveGithubRepoArchiveUrl(hash)
  const filename = archiveUrl.split('/').at(-1) ?? `unknown-archive-filename-${Date.now()}.tar.gz`

  const response = await axios.get(archiveUrl, {
    responseType: 'arraybuffer',
    onDownloadProgress(progressEvent) {
      const { loaded, total } = progressEvent

      onProgress!(loaded, total ?? 0)
    },
  })

  await writeFile(resolve(outputPath!, filename), response.data)
}
