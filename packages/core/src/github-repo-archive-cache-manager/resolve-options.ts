import { DEFAULT_CACHE_PATH } from './constants'
import { GithubRepoArchiveCacheManagerOptions } from './types'

export function resolveGithubRepoManagerCacheManagerOptions(
  options?: GithubRepoArchiveCacheManagerOptions,
): Required<GithubRepoArchiveCacheManagerOptions> {
  return {
    cachePath: options?.cachePath ?? DEFAULT_CACHE_PATH,
  }
}
