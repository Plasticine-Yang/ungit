import { GithubRepoRefType, type GithubRepoRefQuery } from '@ungit/core'
import { DEFAULT_CACHE_DIRECTORY_PATH } from '@ungit/shared'

import { join } from 'path'
import type { DefaultCommandOptions, UserRepoInfo } from './types'

export function resolveDefaultCommandOptions(options?: DefaultCommandOptions): DefaultCommandOptions {
  return {
    cache: options?.cache ?? true,
    cacheDirectoryPath: options?.cacheDirectoryPath ?? DEFAULT_CACHE_DIRECTORY_PATH,
  }
}

/** 根据 cli 参数解析对应的 GithubRepoRefType，Branch 的优先级高于 Tag */
export function resolveGithubRepoRefQuery(options?: DefaultCommandOptions): GithubRepoRefQuery | undefined {
  // hash 优先级最高
  if (options?.hash) {
    return {
      hash: options.hash,
    }
  }

  // 其次是 branch
  if (options?.branch) {
    return {
      reference: {
        type: GithubRepoRefType.Branch,
        name: options.branch,
      },
    }
  }

  // 最后是 tag
  if (options?.tag) {
    return {
      reference: {
        type: GithubRepoRefType.Tag,
        name: options.tag,
      },
    }
  }
}

/**
 * 把类似 Plasticine-Yang/ungit/packages 这样的字符串解析成 UserRepoInfo
 */
export function resolveUserRepoInfo(userRepoMaybeWithSubDirectory: string) {
  try {
    const [user, repo, ...subDirectory] = userRepoMaybeWithSubDirectory.split('/')

    return {
      user,
      repo,
      userRepo: `${user}/${repo}`,
      subDirectory: subDirectory.join('/'),
    } as UserRepoInfo
  } catch (error) {
    throw new Error('resolveUserRepoInfo failed', { cause: error })
  }
}

/** github 下载的压缩包会有一个 repo-hash 的一级目录，要与外部传入的子目录拼接才能作为真正的子目录 */
export function resolveSubDirectory(repo: string, hash: string, subDirectory: string) {
  const subDirectoryRoot = `${repo}-${hash}`
  const resolvedSubDirectory = join(subDirectoryRoot, subDirectory)
  return resolvedSubDirectory
}
