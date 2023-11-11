import { resolveGithubRepoUrl } from '../resolve-github-repo-url'

describe('resolveGithubRepoUrl', () => {
  test('should be resolved', () => {
    const result = resolveGithubRepoUrl('Plasticine-Yang/Plasticine-Yang.github.io')
    expect(result).toMatchInlineSnapshot('"https://github.com/Plasticine-Yang/Plasticine-Yang.github.io"')
  })
})
