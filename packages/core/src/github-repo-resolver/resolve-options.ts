import { GithubRepoInfoType } from './enum'
import type { ResolveGithubRepoArchiveUrlOptions } from './types'

export function resolveGithubRepoArchiveUrlOptions(
  options?: ResolveGithubRepoArchiveUrlOptions,
): Required<ResolveGithubRepoArchiveUrlOptions> {
  return {
    hash: options?.hash ?? '',
    referenceType: options?.referenceType ?? GithubRepoInfoType.HEAD,
    referenceName: options?.referenceName ?? 'HEAD',
  }
}
