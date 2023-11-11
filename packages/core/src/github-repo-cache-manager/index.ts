import { resolveGithubRepoManagerCacheManagerOptions } from './resolve-options'
import type { GithubRepoManagerCacheManagerOptions } from './types'

export class GithubRepoManagerCacheManager {
  private resolvedOptions: Required<GithubRepoManagerCacheManagerOptions>

  constructor(options?: GithubRepoManagerCacheManagerOptions) {
    this.resolvedOptions = resolveGithubRepoManagerCacheManagerOptions(options)
  }
}
