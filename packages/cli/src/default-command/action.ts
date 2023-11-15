import {
  GithubRepoArchiveCacheManager,
  GithubRepoResolver,
  downloadGithubRepoArchive,
  extractTarGZ,
  type GithubRepoArchive,
} from '@ungit/core'
import { ensureDirectoryExist } from '@ungit/shared'
import { rm } from 'fs/promises'
import ora from 'ora'
import chalk from 'chalk'
import { resolve } from 'path'

import { TEMP_DIRECTORY_ROOT_PATH } from './constants'
import {
  resolveDefaultCommandOptions,
  resolveGithubRepoRefQuery,
  resolveSubDirectory,
  resolveUserRepoInfo,
} from './helpers'
import type { DefaultCommandOptions, DownloadToTempDirectoryOptions } from './types'

export async function defaultCommandAction(
  userRepoMaybeWithSubDirectory: string,
  outputPath = process.cwd(),
  options?: DefaultCommandOptions,
) {
  const resolvedOptions = resolveDefaultCommandOptions(options)
  const { cacheDirectoryPath } = resolvedOptions
  const userRepoInfo = resolveUserRepoInfo(userRepoMaybeWithSubDirectory)
  const { repo, userRepo, subDirectory } = userRepoInfo

  const githubRepoRefQuery = resolveGithubRepoRefQuery(resolvedOptions)
  const githubRepoResolver = new GithubRepoResolver(userRepo)
  const githubRepoRef = await githubRepoResolver.resolveGithubRepoRef(githubRepoRefQuery)
  const githubRepoArchive = githubRepoResolver.resolveGithubRepoArchive(githubRepoRef)

  const downloadToTempDirectoryOptions: DownloadToTempDirectoryOptions = {
    defaultCommandOptions: resolvedOptions,
    githubRepoRef,
    userRepoInfo,
  }

  // 不启用缓存则先下载到临时目录，提取指定文件到 outputPath 后再删除临时目录
  if (!resolvedOptions.cache) {
    await downloadToTempDirectory(githubRepoArchive, outputPath, downloadToTempDirectoryOptions)
    return
  }

  // 启用缓存则优先从缓存目录中读取缓存文件
  // - 有缓存则直接提取缓存文件的指定文件到 outputPath
  // - 无缓存则触发下载的逻辑，并将下载的临时目录中的文件放到缓存目录中，再将临时目录删除
  const manager = new GithubRepoArchiveCacheManager({ cacheDirectoryPath })
  const cachedRepoArchivePath = await manager.getCachedRepoArchivePath(userRepo, githubRepoRef.hash)

  if (cachedRepoArchivePath) {
    console.log(chalk.cyan('cache hit!'))
    try {
      const resolvedSubDirectory = resolveSubDirectory(repo, githubRepoRef.hash, subDirectory)
      extractTarGZ(cachedRepoArchivePath, outputPath, { subDirectory: resolvedSubDirectory })
    } catch {
      console.log(chalk.red('extract cached tar.gz file error'))
      // 提取失败时兜底触发下载逻辑
      await downloadToTempDirectory(githubRepoArchive, outputPath, downloadToTempDirectoryOptions)
    }
  } else {
    console.log(chalk.yellow('cache not found'))
    await downloadToTempDirectory(githubRepoArchive, outputPath, downloadToTempDirectoryOptions)
  }
}

/** 下载到临时目录 */
async function downloadToTempDirectory(
  githubRepoArchive: GithubRepoArchive,
  outputPath: string,
  options: DownloadToTempDirectoryOptions,
) {
  const { githubRepoRef } = options
  const { cacheDirectoryPath, cache } = options.defaultCommandOptions
  const { repo, userRepo, subDirectory } = options.userRepoInfo

  const tempDirectoryPath = resolve(TEMP_DIRECTORY_ROOT_PATH, userRepo)
  const githubRepoArchiveCacheManager = new GithubRepoArchiveCacheManager({ cacheDirectoryPath })

  const spinner = ora()

  // 确保临时目录存在
  await ensureDirectoryExist(tempDirectoryPath)

  // 下载文件到临时目录中
  spinner.start('Downloading...')
  const downloadedFilePath = await downloadGithubRepoArchive(githubRepoArchive, {
    outputPath: tempDirectoryPath,
  })
  spinner.succeed('Download successfully!')

  // 提取指定文件到 outputPath - github 下载的压缩包会有一个 repo-hash 的一级目录，要与外部传入的子目录拼接才能作为真正的子目录
  spinner.start('Extracting...')
  const resolvedSubDirectory = resolveSubDirectory(repo, githubRepoRef.hash, subDirectory)
  await extractTarGZ(downloadedFilePath, outputPath, { subDirectory: resolvedSubDirectory })
  spinner.succeed(`Extract to ${outputPath} successfully!`)

  // 如果启用了缓存则将下载的文件缓存到缓存目录中
  if (cache) {
    spinner.start('Caching...')
    await githubRepoArchiveCacheManager.cacheRepoArchive(downloadedFilePath, userRepo, githubRepoRef.hash)
    spinner.succeed('Cache successfully!')
  }

  // 删除临时目录
  await rm(TEMP_DIRECTORY_ROOT_PATH, { force: true, recursive: true })

  return
}
