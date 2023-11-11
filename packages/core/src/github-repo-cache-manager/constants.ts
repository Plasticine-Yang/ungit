import { homedir } from 'os'
import { resolve } from 'path'

export const DEFAULT_CACHE_PATH = resolve(homedir(), '.ungit')
