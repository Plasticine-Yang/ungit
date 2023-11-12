import { mkdir, stat } from 'fs/promises'

export async function ensureDirectoryExist(directoryPath: string) {
  try {
    await stat(directoryPath)
  } catch {
    await mkdir(directoryPath, { recursive: true })
  }
}
