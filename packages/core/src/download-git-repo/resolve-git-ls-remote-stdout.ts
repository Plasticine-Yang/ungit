import { type GithubRepoInfo, GithubRepoInfoType } from '../github-repo-info'

export function resolveGitLsRemoteStdout(stdout: string): GithubRepoInfo[] {
  const githubRepoInfoList: GithubRepoInfo[] = []

  for (const reference of stdout.trim().split('\n')) {
    if (reference) {
      githubRepoInfoList.push(resolveGithubRepoInfo(reference))
    }
  }

  return githubRepoInfoList
}

/**
 * 解析 GithubRepoInfo 对象
 *
 * `reference` is like:
 * - 80e56b194c2aea3965247d87a0d68efc925ddca9\tHEAD
 * - 80e56b194c2aea3965247d87a0d68efc925ddca9\trefs/heads/main
 *
 * `referencePath` is like:
 * - HEAD
 * - refs/heads/main
 * - refs/tags/v0.0.1
 *
 */
function resolveGithubRepoInfo(reference: string): GithubRepoInfo {
  const [hash, referencePath] = reference.split('\t')

  if (referencePath === 'HEAD') {
    return {
      type: GithubRepoInfoType.HEAD,
      name: 'HEAD',
      hash,
    }
  }

  const [, type, referenceName] = referencePath.split('/')
  let resolvedGithubRepoInfoType: GithubRepoInfoType

  switch (type) {
    case 'heads':
      resolvedGithubRepoInfoType = GithubRepoInfoType.Branch
      break

    case 'tags':
      resolvedGithubRepoInfoType = GithubRepoInfoType.Tag
      break

    default:
      throw new Error(`unknown referencePath type: ${type}`)
  }

  return {
    type: resolvedGithubRepoInfoType,
    name: referenceName,
    hash,
  }
}
