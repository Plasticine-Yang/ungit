/**
 * 解析下载压缩包的 url
 *
 * url like:
 * https://github.com/Plasticine-Yang/templates/archive/602aaeb736af0fddcf9f2afc7ba7c5eac44f7c64.tar.gz
 */
export function resolveGithubRepoArchiveUrl(userRepo: string, hash: string): string {
  return `https://github.com/${userRepo}/archive/${hash}.tar.gz`
}
