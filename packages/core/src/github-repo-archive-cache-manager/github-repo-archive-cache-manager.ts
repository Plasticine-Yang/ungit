import { ensureDirectoryExist } from '@ungit/shared'
import { copyFile, rm, stat } from 'fs/promises'
import { resolve } from 'path'

import { resolveGithubRepoManagerCacheManagerOptions } from './resolve-options'
import type { GithubRepoArchiveCacheManagerOptions } from './types'

export class GithubRepoArchiveCacheManager {
  private resolvedOptions: Required<GithubRepoArchiveCacheManagerOptions>

  constructor(options?: GithubRepoArchiveCacheManagerOptions) {
    this.resolvedOptions = resolveGithubRepoManagerCacheManagerOptions(options)
  }

  private resolveCachedArchivePath(userRepo: string, hash: string) {
    const { cachePath } = this.resolvedOptions
    const cachedArchivePath = resolve(cachePath, userRepo, `${hash}.tar.gz`)

    return cachedArchivePath
  }

  /** 查询缓存目录下是否缓存了相关文件 */
  public async hasCached(userRepo: string, hash: string) {
    const { cachePath } = this.resolvedOptions
    const cacheFilePath = resolve(cachePath, userRepo, `${hash}.tar.gz`)

    try {
      const stats = await stat(cacheFilePath)

      return stats.isFile()
    } catch {
      return false
    }
  }

  /** 将仓库压缩包缓存到缓存目录中 */
  public async cacheRepoArchive(archivePath: string, userRepo: string, hash: string) {
    const { cachePath } = this.resolvedOptions
    const userRepoPath = resolve(cachePath, userRepo)
    const cachedArchivePath = this.resolveCachedArchivePath(userRepo, hash)
    const archiveFilename = `${hash}.tar.gz`

    // 确保 archivePath 的文件名与 hash 对应
    if (!archivePath.endsWith(archiveFilename)) {
      throw new Error(`archive filename of archive path does not match with ${hash}`)
    }

    // 确保 userRepo 目录存在
    await ensureDirectoryExist(userRepoPath)

    // 先删除已有的缓存文件
    try {
      await rm(cachedArchivePath, { force: true })
    } catch (error) {
      throw new Error('remove previous cached archive file failed', { cause: error })
    }

    try {
      await copyFile(resolve(archivePath), resolve(cachedArchivePath))
    } catch (error) {
      throw new Error(`copy archive file from ${archivePath} to ${cachedArchivePath} failed`, { cause: error })
    }
  }

  /** 获取缓存文件的路径 */
  public async getCachedRepoArchivePath(userRepo: string, hash: string) {
    const { cachePath } = this.resolvedOptions
    const cachedArchivePath = resolve(cachePath, userRepo, `${hash}.tar.gz`)

    try {
      const stats = await stat(cachedArchivePath)

      if (!stats.isFile()) {
        return ''
      }

      return cachedArchivePath
    } catch {
      return ''
    }
  }
}
