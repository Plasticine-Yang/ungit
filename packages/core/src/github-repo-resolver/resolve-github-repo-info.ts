import { DEFAULT_GITHUB_REPO_INFO_QUERY } from './constants'
import type { GithubRepoInfo } from './types'

export function resolveGithubRepoInfo(
  githubRepoInfoList: GithubRepoInfo[],
  query = DEFAULT_GITHUB_REPO_INFO_QUERY,
): GithubRepoInfo | null {
  const { hash, reference } = query

  let targetGithubRepoInfo: GithubRepoInfo | null = null

  if (hash) {
    targetGithubRepoInfo = githubRepoInfoList.find((repoInfo) => repoInfo.hash === hash) ?? null
  } else if (reference) {
    const { type, name } = reference

    targetGithubRepoInfo =
      githubRepoInfoList.find((repoInfo) => repoInfo.type === type && repoInfo.name === name) ?? null
  } else {
    targetGithubRepoInfo = null
  }

  return targetGithubRepoInfo
}
