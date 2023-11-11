import { readFile } from 'fs/promises'
import { resolve } from 'path'

import { GithubRepoInfo, GithubRepoInfoType } from '../../github-repo-info'
import { resolveGitLsRemoteStdout } from '../resolve-git-ls-remote-stdout'
import { resolveGithubRepoArchiveUrl } from '../resolve-github-repo-archive-url'

describe('resolveGithubRepoArchiveUrl', () => {
  let githubRepoInfoList: GithubRepoInfo[]

  beforeAll(async () => {
    const stdout = await readFile(resolve(__dirname, 'fixtures/git-ls-remote-stdout.txt'), 'utf-8')
    githubRepoInfoList = resolveGitLsRemoteStdout(stdout)
  })

  test('should be resolved with HEAD default', () => {
    const result = resolveGithubRepoArchiveUrl('Plasticine-Yang/Plasticine-Yang.github.io', githubRepoInfoList)

    expect(result).toMatchInlineSnapshot(
      '"https://github.com/Plasticine-Yang/Plasticine-Yang.github.io/archive/39a262dd82249751f175bf2b7f72ad74584fc921.tar.gz"',
    )
  })

  test('should be resolved with branch reference', () => {
    const result = resolveGithubRepoArchiveUrl('Plasticine-Yang/Plasticine-Yang.github.io', githubRepoInfoList, {
      referenceType: GithubRepoInfoType.Branch,
      referenceName: 'main',
    })

    expect(result).toMatchInlineSnapshot(
      '"https://github.com/Plasticine-Yang/Plasticine-Yang.github.io/archive/39a262dd82249751f175bf2b7f72ad74584fc921.tar.gz"',
    )
  })

  test('should be resolved with tag reference', () => {
    const result = resolveGithubRepoArchiveUrl('Plasticine-Yang/Plasticine-Yang.github.io', githubRepoInfoList, {
      referenceType: GithubRepoInfoType.Tag,
      referenceName: 'v0.0.1',
    })

    expect(result).toMatchInlineSnapshot(
      '"https://github.com/Plasticine-Yang/Plasticine-Yang.github.io/archive/3b978fb8e00f01bb43903a0291f5c0e5c92c8b74.tar.gz"',
    )
  })
})
