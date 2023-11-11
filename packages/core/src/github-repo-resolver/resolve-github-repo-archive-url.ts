import { GithubRepoInfo } from '../github-repo-info'
import { resolveGithubRepoArchiveUrlOptions } from './resolve-options'
import type { ResolveGithubRepoArchiveUrlOptions } from './types'

/**
 * 传入 `user/repo` 的方式，获取下载压缩包的 url
 *
 * url like:
 * https://github.com/Plasticine-Yang/templates/archive/602aaeb736af0fddcf9f2afc7ba7c5eac44f7c64.tar.gz
 *
 * @param userRepo user/repo 格式的字符串
 * @param options 未传入时默认获取 HEAD reference 对应的下载链接
 * @returns 下载链接
 */
export function resolveGithubRepoArchiveUrl(
  userRepo: string,
  githubRepoInfoList: GithubRepoInfo[],
  options?: ResolveGithubRepoArchiveUrlOptions,
): string {
  const { hash, referenceType, referenceName } = resolveGithubRepoArchiveUrlOptions(options)

  let targetGithubRepoInfo: GithubRepoInfo | null = null

  if (hash) {
    targetGithubRepoInfo = githubRepoInfoList.find((repoInfo) => repoInfo.hash === hash) ?? null
  } else {
    targetGithubRepoInfo =
      githubRepoInfoList.find((repoInfo) => repoInfo.type === referenceType && repoInfo.name === referenceName) ?? null
  }

  if (targetGithubRepoInfo !== null) {
    const hash = targetGithubRepoInfo.hash
    return `https://github.com/${userRepo}/archive/${hash}.tar.gz`
  }

  return ''
}
