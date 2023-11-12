import { DEFAULT_CACHE_DIRECTORY_PATH } from '@ungit/shared'
import { GithubRepoArchiveCacheManagerOptions } from './types'

export function resolveGithubRepoManagerCacheManagerOptions(
  options?: GithubRepoArchiveCacheManagerOptions,
): Required<GithubRepoArchiveCacheManagerOptions> {
  return {
    cacheDirectoryPath: options?.cacheDirectoryPath ?? DEFAULT_CACHE_DIRECTORY_PATH,
  }
}
