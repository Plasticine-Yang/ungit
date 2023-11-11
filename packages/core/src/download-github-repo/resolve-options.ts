import { DEFAULT_OUTPUT_PATH } from './constants'
import type { DownloadGitRepoOptions } from './types'

export function resolveDownloadGitRepoOptions(options?: DownloadGitRepoOptions): DownloadGitRepoOptions {
  const voidFunction = () => {}

  return {
    outputPath: options?.outputPath ?? DEFAULT_OUTPUT_PATH,
    resolveGithubRepoArchiveUrlOptions: options?.resolveGithubRepoArchiveUrlOptions,
    onProgress: options?.onProgress ?? voidFunction,
  }
}
