import { resolve } from 'path'
import { GithubRepoArchiveCacheManager } from '../github-repo-archive-cache-manager'

describe('GithubRepoCacheManager', () => {
  let manager: GithubRepoArchiveCacheManager

  beforeAll(() => {
    manager = new GithubRepoArchiveCacheManager({ cacheDirectoryPath: resolve(__dirname, 'fixtures/.ungit') })
  })

  test('should cache repo archive', async () => {
    await manager.cacheRepoArchive(
      resolve(__dirname, 'fixtures/39a262dd82249751f175bf2b7f72ad74584fc921.tar.gz'),
      'Plasticine-Yang/ungit',
      '39a262dd82249751f175bf2b7f72ad74584fc921',
    )
  })

  test('should check whether archive has been cached', async () => {
    // exist
    const result1 = await manager.hasCached('Plasticine-Yang/ungit', '7a08a89442da03012ed6572d92a68c4a05526473')
    expect(result1).toBe(true)

    // not exist
    const result2 = await manager.hasCached('foo/repo1', 'xxx')
    expect(result2).toBe(false)
  })

  test('should get cached repo archive path', async () => {
    const cachedRepoArchivePath = await manager.getCachedRepoArchivePath(
      'Plasticine-Yang/ungit',
      '7a08a89442da03012ed6572d92a68c4a05526473',
    )

    const expectedPath = resolve(
      __dirname,
      'fixtures/.ungit/Plasticine-Yang/ungit/7a08a89442da03012ed6572d92a68c4a05526473.tar.gz',
    )

    expect(cachedRepoArchivePath).toBe(expectedPath)
  })
})
