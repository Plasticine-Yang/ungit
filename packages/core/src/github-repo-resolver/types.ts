import type { GithubRepoInfoType } from './enum'

export interface GithubRepoInfo {
  type: GithubRepoInfoType
  name: string
  hash: string
}

export interface ResolveGithubRepoArchiveUrlOptions {
  /** 获取指定 hash 的下载链接 - 优先级最高 */
  hash?: string

  /**
   * 获取哪种类型的 reference 对应的下载链接
   *
   * @default GithubRepoInfoType.HEAD
   */
  referenceType?: GithubRepoInfoType

  /**
   * 获取对应 reference 类型的 referenceName 的下载链接
   *
   * @default "HEAD"
   */
  referenceName?: string
}
