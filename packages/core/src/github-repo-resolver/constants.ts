import { GithubRepoRefType } from './enum'
import type { GithubRepoRefQuery } from './types'

export const DEFAULT_GITHUB_REPO_REF_QUERY: GithubRepoRefQuery = {
  reference: {
    type: GithubRepoRefType.HEAD,
    name: 'HEAD',
  },
}
