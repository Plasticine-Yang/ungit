import { DEFAULT_GITHUB_REPO_REF_QUERY } from './constants'
import type { GithubRepoRef } from './types'

export function resolveGithubRepoRef(githubRepoRefs: GithubRepoRef[], query = DEFAULT_GITHUB_REPO_REF_QUERY) {
  const { hash, reference } = query

  let targetGithubRepoRef: GithubRepoRef | null = null

  if (hash) {
    targetGithubRepoRef = githubRepoRefs.find((ref) => ref.hash === hash) ?? null
  } else if (reference) {
    const { type, name } = reference

    targetGithubRepoRef = githubRepoRefs.find((ref) => ref.type === type && ref.name === name) ?? null
  } else {
    targetGithubRepoRef = null
  }

  if (targetGithubRepoRef === null) {
    throw new Error('github repo ref not found', { cause: query })
  }

  return targetGithubRepoRef
}
