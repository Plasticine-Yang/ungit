import { GithubRepoInfoQuery } from '../github-repo-resolver'

export type DownloadGitRepoOptions = {
  /**
   * 下载的输出目录
   *
   * @default process.cwd()
   */
  outputPath?: string

  /**
   * 用于查询需要下载的 GithubRepoInfo
   *
   * @default HEAD reference
   */
  githubRepoInfoQuery?: GithubRepoInfoQuery

  onProgress?: (downloadedSize: number, totalSize: number) => void
}
