export interface DownloadGitRepoOptions {
  /**
   * 下载的输出目录
   *
   * @default process.cwd()
   */
  outputPath?: string

  onProgress?: (downloadedSize: number, totalSize: number) => void
}
