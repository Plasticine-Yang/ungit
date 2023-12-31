import { readFile } from 'fs/promises'
import { resolve } from 'path'

import { GithubRepoRefType } from '../enum'
import { resolveGithubRepoRefsFromGitLsRemoteStdout } from '../resolve-git-ls-remote-stdout'
import { resolveGithubRepoRef } from '../resolve-github-repo-info'
import { GithubRepoRef } from '../types'

describe('resolveGithubRepoRef', () => {
  let githubRepoRefs: GithubRepoRef[]

  beforeAll(async () => {
    const stdout = await readFile(resolve(__dirname, 'fixtures/git-ls-remote-stdout.txt'), 'utf-8')
    githubRepoRefs = resolveGithubRepoRefsFromGitLsRemoteStdout(stdout)
  })

  test('should be resolved with HEAD refs', async () => {
    const result = resolveGithubRepoRef(githubRepoRefs, {
      reference: { type: GithubRepoRefType.HEAD, name: 'HEAD' },
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "hash": "39a262dd82249751f175bf2b7f72ad74584fc921",
        "name": "HEAD",
        "type": "HEAD",
      }
    `)
  })

  test('should be resolved with branch refs', () => {
    const result = resolveGithubRepoRef(githubRepoRefs, {
      reference: { type: GithubRepoRefType.Branch, name: 'feat/plasticine-react' },
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "hash": "1b340ab7654f2b6d6f7aba0ecfec8c8fac4c6c21",
        "name": "feat/plasticine-react",
        "type": "branch",
      }
    `)
  })

  test('should be resolved with tag refs', () => {
    const result = resolveGithubRepoRef(githubRepoRefs, {
      reference: { type: GithubRepoRefType.Tag, name: 'v0.0.1' },
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "hash": "3b978fb8e00f01bb43903a0291f5c0e5c92c8b74",
        "name": "v0.0.1",
        "type": "tag",
      }
    `)
  })

  test('should be resolved with hash', () => {
    const result = resolveGithubRepoRef(githubRepoRefs, {
      hash: 'a5232feef1a585974b4faecdfc053d626be945a8',
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "hash": "a5232feef1a585974b4faecdfc053d626be945a8",
        "name": "v0.0.2",
        "type": "tag",
      }
    `)
  })

  test('should be resolved when hash and references both exist, and hash has higher priority', () => {
    const result = resolveGithubRepoRef(githubRepoRefs, {
      // hash of v0.0.2 tag
      hash: 'a5232feef1a585974b4faecdfc053d626be945a8',

      // v0.0.1 tag
      reference: { type: GithubRepoRefType.Tag, name: 'v0.0.1' },
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "hash": "a5232feef1a585974b4faecdfc053d626be945a8",
        "name": "v0.0.2",
        "type": "tag",
      }
    `)
  })

  test('should be resolved with HEAD by default', async () => {
    const result = resolveGithubRepoRef(githubRepoRefs)

    expect(result).toMatchInlineSnapshot(`
      {
        "hash": "39a262dd82249751f175bf2b7f72ad74584fc921",
        "name": "HEAD",
        "type": "HEAD",
      }
    `)
  })
})
