import { exec } from 'child_process'

import { resolveGitLsRemoteStdout } from './resolve-git-ls-remote-stdout'
import type { GithubRepoInfo } from './types'

/**
 * 获取 Github 仓库信息，比如有哪些分支、哪些 tag 以及对应的 hash
 */
export function resolveGithubRepoInfoList(githubRepoUrl: string): Promise<GithubRepoInfo[]> {
  return new Promise((resolve, reject) => {
    exec(`git ls-remote ${githubRepoUrl}`, (error, stdout) => {
      if (error !== null) {
        reject(error)
      }

      const githubRepoInfoList = resolveGitLsRemoteStdout(stdout)

      resolve(githubRepoInfoList)
    })
  })
}
