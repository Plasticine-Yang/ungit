import axios from 'axios'
import { mkdir, stat, writeFile } from 'fs/promises'
import { resolve } from 'path'

import { resolveGithubRepoArchiveUrl } from './resolve-github-repo-archive-url'
import { resolveGithubRepoInfoList } from './resolve-github-repo-info-list'
import { resolveGithubRepoUrl } from './resolve-github-repo-url'
import { resolveDownloadGitRepoOptions } from './resolve-options'
import type { DownloadGitRepoOptions } from './types'

/**
 * 下载 Github 仓库到指定目录
 */
export async function downloadGitRepo(userRepo: string, options?: DownloadGitRepoOptions) {
  const { outputPath, onProgress } = resolveDownloadGitRepoOptions(options)
  const resolvedOutputPath = resolve(outputPath)

  // 确保输出目录存在
  try {
    await stat(resolvedOutputPath)
  } catch {
    await mkdir(resolvedOutputPath, { recursive: true })
  }

  const githubRepoUrl = resolveGithubRepoUrl(userRepo)
  const githubRepoInfoList = await resolveGithubRepoInfoList(githubRepoUrl)
  const archiveUrl = resolveGithubRepoArchiveUrl(userRepo, githubRepoInfoList)
  const filename = archiveUrl.split('/').at(-1) ?? `unknown-${Date.now()}.tar.gz`

  const response = await axios.get(archiveUrl, {
    responseType: 'arraybuffer',
    onDownloadProgress(progressEvent) {
      const { loaded, total } = progressEvent

      onProgress(loaded, total ?? 0)
    },
  })

  await writeFile(resolve(outputPath, filename), response.data)
}
