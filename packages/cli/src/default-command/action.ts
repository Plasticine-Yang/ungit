import {
  GithubRepoArchiveCacheManager,
  GithubRepoInfo,
  GithubRepoResolver,
  downloadGitRepo,
  extractTarGZ,
} from '@ungit/core'
import { ensureDirectoryExist } from '@ungit/shared'

import { rm } from 'fs/promises'
import { resolve } from 'path'
import { TEMP_DIRECTORY_ROOT_PATH } from './constants'
import {
  resolveDefaultCommandOptions,
  resolveGithubRepoInfoQuery,
  resolveSubDirectory,
  resolveUserRepo,
} from './helpers'
import { DefaultCommandOptions } from './types'

export async function defaultCommandAction(
  userRepo: string,
  outputPath = process.cwd(),
  options?: DefaultCommandOptions,
) {
  const resolvedOptions = resolveDefaultCommandOptions(options)
  const { repo, resolvedUserRepo, subDirectory } = resolveUserRepo(userRepo)

  // 不缓存则先下载到临时目录，提取指定文件到 outputPath 后再删除临时目录
  if (!resolvedOptions.cache) {
    await download(userRepo, outputPath, resolvedOptions)
    return
  }

  // 缓存则优先从缓存目录中读取缓存文件，有缓存则直接提取缓存文件的指定文件到 outputPath
  // 无缓存则触发下载的逻辑，并将下载的临时目录中的文件放到缓存目录中，再将临时目录删除
  const githubRepoResolver = new GithubRepoResolver(resolvedUserRepo)
  const githubRepoInfo = await githubRepoResolver.resolveGithubRepoInfo(resolveGithubRepoInfoQuery(resolvedOptions))

  if (githubRepoInfo !== null) {
    const manager = new GithubRepoArchiveCacheManager({ cacheDirectoryPath: resolvedOptions.cacheDirectoryPath })
    const cachedRepoArchivePath = await manager.getCachedRepoArchivePath(resolvedUserRepo, githubRepoInfo.hash)

    if (cachedRepoArchivePath) {
      console.log('缓存命中')
      try {
        const resolvedSubDirectory = resolveSubDirectory(repo, githubRepoInfo.hash, subDirectory)
        extractTarGZ(cachedRepoArchivePath, outputPath, { subDirectory: resolvedSubDirectory })
      } catch (error) {
        // 提取失败时兜底触发下载逻辑
        await download(userRepo, outputPath, resolvedOptions, true, githubRepoInfo)
      }
    } else {
      console.log('没有缓存')
      await download(userRepo, outputPath, resolvedOptions, true, githubRepoInfo)
    }
  } else {
    throw new Error('github repo info not found')
  }
}

/** 下载到临时目录 */
async function download(
  userRepo: string,
  outputPath: string,
  defaultCommandOptions: DefaultCommandOptions,
  enableCache?: boolean,
  githubRepoInfo?: GithubRepoInfo,
) {
  const { repo, resolvedUserRepo, subDirectory } = resolveUserRepo(userRepo)
  const tempDirectoryPath = resolve(TEMP_DIRECTORY_ROOT_PATH, resolvedUserRepo)
  const manager = new GithubRepoArchiveCacheManager({ cacheDirectoryPath: defaultCommandOptions.cacheDirectoryPath })

  // 确保临时目录存在
  await ensureDirectoryExist(tempDirectoryPath)

  // 下载文件到临时目录中
  console.log('downloading...')
  const { downloadedFilePath, downloadedGithubRepoInfo } = await downloadGitRepo(resolvedUserRepo, {
    outputPath: tempDirectoryPath,
    githubRepoInfoQuery: resolveGithubRepoInfoQuery(defaultCommandOptions),
    onProgress(downloadedSize, totalSize) {
      console.log(downloadedSize, totalSize)
    },
  })
  console.log('download success')

  // 提取指定文件到 outputPath - github 下载的压缩包会有一个 repo-hash 的一级目录，要与外部传入的子目录拼接才能作为真正的子目录
  const resolvedSubDirectory = resolveSubDirectory(repo, downloadedGithubRepoInfo.hash, subDirectory)
  await extractTarGZ(downloadedFilePath, outputPath, { subDirectory: resolvedSubDirectory })

  // 如果启用了缓存则将下载的文件缓存到缓存目录中
  if (enableCache && githubRepoInfo) {
    await manager.cacheRepoArchive(downloadedFilePath, resolvedUserRepo, githubRepoInfo.hash)
  }

  // 删除临时目录
  await rm(TEMP_DIRECTORY_ROOT_PATH, { force: true, recursive: true })

  return
}
