import type { ExecException } from 'child_process'

import { resolveGithubRepoRef } from './resolve-github-repo-info'
import { resolveGithubRepoRefs } from './resolve-github-repo-info-list'
import type { GithubRepoArchive, GithubRepoRef, GithubRepoRefQuery, GithubRepoResolverOptions } from './types'

export class GithubRepoResolver {
  private githubRepoRefs: GithubRepoRef[] | null

  constructor(private userRepo: string, private options?: GithubRepoResolverOptions) {
    this.githubRepoRefs = null
  }

  private resolveGithubRepoUrl() {
    return `https://github.com/${this.userRepo}`
  }

  private async resolveGithubRepoRefs() {
    if (this.githubRepoRefs === null) {
      const githubRepoUrl = this.resolveGithubRepoUrl()
      const githubRepoRefs = await resolveGithubRepoRefs(githubRepoUrl)

      this.githubRepoRefs = githubRepoRefs
    }

    return this.githubRepoRefs
  }

  public async resolveGithubRepoRef(query?: GithubRepoRefQuery) {
    this.options?.beforeResolveRepoRefs?.()

    const githubRepoRefs = await this.resolveGithubRepoRefs()
      .then((result) => {
        this.options?.onResolveRepoRefsSuccess?.()

        return result
      })
      .catch((error) => {
        this.options?.onResolveRepoRefsFailed?.(error as ExecException | null)

        throw error
      })

    return resolveGithubRepoRef(githubRepoRefs, query)
  }

  public resolveGithubRepoArchive(githubRepoRef: GithubRepoRef) {
    const { hash } = githubRepoRef
    const url = `https://github.com/${this.userRepo}/archive/${hash}.tar.gz`
    const filename = `${hash}.tar.gz`

    return {
      url,
      filename,
    } as GithubRepoArchive
  }
}
