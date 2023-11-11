import { DEFAULT_CACHE_PATH } from './constants'
import { GithubRepoManagerCacheManagerOptions } from './types'

export function resolveGithubRepoManagerCacheManagerOptions(
  options?: GithubRepoManagerCacheManagerOptions,
): Required<GithubRepoManagerCacheManagerOptions> {
  return {
    cachePath: options?.cachePath ?? DEFAULT_CACHE_PATH,
  }
}
