import { resolve } from 'path'

const TEMP_DIRECTORY_NAME = `.ungit-temp-${Date.now()}`

export const TEMP_DIRECTORY_ROOT_PATH = resolve(process.cwd(), TEMP_DIRECTORY_NAME)
