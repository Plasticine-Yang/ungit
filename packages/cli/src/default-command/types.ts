import type { GithubRepoRef } from '@ungit/core'

export interface DefaultCommandOptions {
  /** 指定要下载的 hash - 优先级最高 */
  hash?: string

  /** 指定要下载的分支 - 优先级高于 tag */
  branch?: string

  /** 指定要下载的 tag */
  tag?: string

  /** 存放缓存文件的目录路径 */
  cacheDirectoryPath?: string

  /** 是否使用缓存 */
  cache?: boolean
}

export interface UserRepoInfo {
  user: string
  repo: string
  userRepo: string
  subDirectory: string
}

export interface DownloadToTempDirectoryOptions {
  userRepoInfo: UserRepoInfo
  defaultCommandOptions: DefaultCommandOptions
  githubRepoRef: GithubRepoRef
}
