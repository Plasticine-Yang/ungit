import type { ResolveGithubRepoArchiveUrlOptions } from '../github-repo-resolver'

export type DownloadGitRepoOptions = {
  /**
   * 下载的输出目录
   *
   * @default process.cwd()
   */
  outputPath?: string

  /** 解析仓库压缩包下载链接的参数 */
  resolveGithubRepoArchiveUrlOptions?: ResolveGithubRepoArchiveUrlOptions

  onProgress?: (downloadedSize: number, totalSize: number) => void
}
