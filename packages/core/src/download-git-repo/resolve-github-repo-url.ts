/**
 * 传入 `user/repo`，获取仓库的 url
 *
 * 比如 Plasticine-Yang/ungit -> https://github.com/Plasticine-Yang/ungit
 */
export function resolveGithubRepoUrl(userRepo: string): string {
  return `https://github.com/${userRepo}`
}
