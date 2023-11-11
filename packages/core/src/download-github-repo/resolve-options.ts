import { GithubRepoInfoType } from '../github-repo-info'
import { DEFAULT_OUTPUT_PATH } from './constants'
import type { DownloadGitRepoOptions, ResolveGithubRepoArchiveUrlOptions } from './types'

export function resolveDownloadGitRepoOptions(options?: DownloadGitRepoOptions): Required<DownloadGitRepoOptions> {
  const voidFunction = () => {}

  return {
    outputPath: options?.outputPath ?? DEFAULT_OUTPUT_PATH,
    onProgress: options?.onProgress ?? voidFunction,
    ...resolveGithubRepoArchiveUrlOptions({
      hash: options?.hash,
      referenceName: options?.referenceName,
      referenceType: options?.referenceType,
    }),
  }
}

export function resolveGithubRepoArchiveUrlOptions(
  options?: ResolveGithubRepoArchiveUrlOptions,
): Required<ResolveGithubRepoArchiveUrlOptions> {
  return {
    hash: options?.hash ?? '',
    referenceType: options?.referenceType ?? GithubRepoInfoType.HEAD,
    referenceName: options?.referenceName ?? 'HEAD',
  }
}
