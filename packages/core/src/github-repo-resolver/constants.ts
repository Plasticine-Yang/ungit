import { GithubRepoInfoType } from './enum'
import type { GithubRepoInfoQuery } from './types'

export const DEFAULT_GITHUB_REPO_INFO_QUERY: GithubRepoInfoQuery = {
  reference: {
    type: GithubRepoInfoType.HEAD,
    name: 'HEAD',
  },
}
