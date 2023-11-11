import type { GithubRepoInfoType } from './enum'

export interface GithubRepoInfo {
  type: GithubRepoInfoType
  name: string
  hash: string
}
