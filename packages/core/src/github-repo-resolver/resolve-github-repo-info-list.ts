import { exec } from 'child_process'

import { resolveGithubRepoRefsFromGitLsRemoteStdout } from './resolve-git-ls-remote-stdout'
import type { GithubRepoRef } from './types'

/**
 * 获取 Github 仓库信息，比如有哪些分支、哪些 tag 以及对应的 hash
 */
export function resolveGithubRepoRefs(githubRepoUrl: string): Promise<GithubRepoRef[]> {
  return new Promise((resolve, reject) => {
    exec(`git ls-remote ${githubRepoUrl}`, (error, stdout) => {
      if (error !== null) {
        reject(error)
      }

      const githubRepoRefs = resolveGithubRepoRefsFromGitLsRemoteStdout(stdout)

      resolve(githubRepoRefs)
    })
  })
}
