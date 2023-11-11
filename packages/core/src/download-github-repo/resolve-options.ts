import { DEFAULT_GITHUB_REPO_INFO_QUERY } from '../github-repo-resolver'
import { DEFAULT_OUTPUT_PATH } from './constants'
import type { DownloadGitRepoOptions } from './types'

export function resolveDownloadGitRepoOptions(options?: DownloadGitRepoOptions): Required<DownloadGitRepoOptions> {
  const voidFunction = () => {}

  return {
    outputPath: options?.outputPath ?? DEFAULT_OUTPUT_PATH,
    githubRepoInfoQuery: options?.githubRepoInfoQuery ?? DEFAULT_GITHUB_REPO_INFO_QUERY,
    onProgress: options?.onProgress ?? voidFunction,
  }
}
