import { resolveGithubRepoArchiveUrl } from './resolve-github-repo-archive-url'
import { resolveGithubRepoInfo } from './resolve-github-repo-info'
import { resolveGithubRepoInfoList } from './resolve-github-repo-info-list'
import { resolveGithubRepoUrl } from './resolve-github-repo-url'
import type { GithubRepoInfo, GithubRepoInfoQuery } from './types'

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

  public async resolveGithubRepoInfo(query?: GithubRepoInfoQuery) {
    const githubRepoInfoList = await this.resolveGithubRepoInfoList()

    return resolveGithubRepoInfo(githubRepoInfoList, query)
  }

  public async resolveGithubRepoArchiveUrl(hash: string) {
    return resolveGithubRepoArchiveUrl(this.userRepo, hash)
  }
}
