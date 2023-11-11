import { resolveGithubRepoArchiveUrl } from './resolve-github-repo-archive-url'
import { resolveGithubRepoInfoList } from './resolve-github-repo-info-list'
import { resolveGithubRepoUrl } from './resolve-github-repo-url'
import type { GithubRepoInfo, ResolveGithubRepoArchiveUrlOptions } from './types'

export class GithubRepoResolver {
  private githubRepoInfoList: GithubRepoInfo[] | null

  constructor(private userRepo: string) {
    this.githubRepoInfoList = null
  }

  private resolveGithubRepoUrl() {
    return resolveGithubRepoUrl(this.userRepo)
  }

  private async resolveGithubRepoInfoList() {
    if (this.githubRepoInfoList === null) {
      const githubRepoUrl = this.resolveGithubRepoUrl()
      const githubRepoInfoList = await resolveGithubRepoInfoList(githubRepoUrl)

      this.githubRepoInfoList = githubRepoInfoList
    }

    return this.githubRepoInfoList
  }

  public async resolveGithubRepoArchiveUrl(options?: ResolveGithubRepoArchiveUrlOptions) {
    try {
      const githubRepoInfoList = await this.resolveGithubRepoInfoList()

      return resolveGithubRepoArchiveUrl(this.userRepo, githubRepoInfoList, options)
    } catch (error) {
      throw new Error('resolve github repository info failed', { cause: error })
    }
  }
}
