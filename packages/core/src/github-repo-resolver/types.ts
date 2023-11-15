import type { GithubRepoRefType } from './enum'

export interface GithubRepoRef {
  type: GithubRepoRefType
  name: string
  hash: string
}

/**
 * 根据以下信息查询对应的 GithubRepoRef 对象
 */
export interface GithubRepoRefQuery {
  /** 根据 hash 查询 - 优先级最高 */
  hash?: string

  /** 根据 reference 查询 */
  reference?: Pick<GithubRepoRef, 'type' | 'name'>
}

export interface GithubRepoArchive {
  url: string
  filename: string
}
