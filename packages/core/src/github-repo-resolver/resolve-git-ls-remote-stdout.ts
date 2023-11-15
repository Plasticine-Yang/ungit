import { GithubRepoRefType } from './enum'
import type { GithubRepoRef } from './types'

export function resolveGithubRepoRefsFromGitLsRemoteStdout(stdout: string): GithubRepoRef[] {
  const githubRepoRefs: GithubRepoRef[] = []

  for (const reference of stdout.trim().split('\n')) {
    if (reference) {
      githubRepoRefs.push(resolveGithubRepoRefFromStdoutReference(reference))
    }
  }

  return githubRepoRefs
}

/**
 * 从 git ls-remote 的 stdout 中解析出 GithubRepoRef 对象
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
function resolveGithubRepoRefFromStdoutReference(reference: string): GithubRepoRef {
  const [hash, referencePath] = reference.split('\t')

  if (referencePath === 'HEAD') {
    return {
      type: GithubRepoRefType.HEAD,
      name: 'HEAD',
      hash,
    }
  }

  const splittedReferencePath = referencePath.split('/')
  const type = splittedReferencePath.at(1)

  // refs/heads/hello-world => referenceName should be `hello-world`
  // refs/heads/feat/hello-world => referenceName should be `feat/hello-world`
  const referenceNameItems = splittedReferencePath.slice(2)
  const referenceName = referenceNameItems.length > 1 ? referenceNameItems.join('/') : referenceNameItems.at(0)

  if (referenceName === undefined) {
    throw new Error('reference name not found', { cause: reference })
  }

  let resolvedGithubRepoRefType: GithubRepoRefType

  switch (type) {
    case 'heads':
      resolvedGithubRepoRefType = GithubRepoRefType.Branch
      break

    case 'tags':
      resolvedGithubRepoRefType = GithubRepoRefType.Tag
      break

    default:
      throw new Error(`unknown reference type: ${type}`)
  }

  return {
    type: resolvedGithubRepoRefType,
    name: referenceName,
    hash,
  }
}
