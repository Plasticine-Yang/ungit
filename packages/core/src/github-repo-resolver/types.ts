import type { GithubRepoInfoType } from './enum'

export interface GithubRepoInfo {
  type: GithubRepoInfoType
  name: string
  hash: string
}

/**
 * 根据以下信息查询对应的 GithubRepoInfo 对象
 */
export interface GithubRepoInfoQuery {
  /** 根据 hash 查询 - 优先级最高 */
  hash?: string

  /** 根据 reference 查询 */
  reference?: Pick<GithubRepoInfo, 'type' | 'name'>
}
