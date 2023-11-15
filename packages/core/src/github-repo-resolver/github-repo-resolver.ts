import { resolveGithubRepoInfo } from './resolve-github-repo-info'
import { resolveGithubRepoInfoList } from './resolve-github-repo-info-list'
import type { GithubRepoArchive, GithubRepoInfo, GithubRepoInfoQuery } from './types'

export class GithubRepoResolver {
  private githubRepoInfoList: GithubRepoInfo[] | null

  constructor(private userRepo: string) {
    this.githubRepoInfoList = null
  }

  private resolveGithubRepoUrl() {
    return `https://github.com/${this.userRepo}`
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

  public async resolveGithubRepoArchive(query?: GithubRepoInfoQuery) {
    const { hash } = await this.resolveGithubRepoInfo(query)
    const url = `https://github.com/${this.userRepo}/archive/${hash}.tar.gz`
    const filename = `${hash}.tar.gz`

    return {
      url,
      filename,
    } as GithubRepoArchive
  }
}
