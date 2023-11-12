import type { CommandRegister } from '../types'
import { defaultCommandAction } from './action'

export const registerDefaultCommand: CommandRegister = (cli) => {
  cli
    .command('<userRepo> [outputPath]', 'Download the github repo to output path')
    .option('-b, --branch', 'Which branch you want to download')
    .option('-t, --tag', 'Which tag you want to download, priority is lower than branch')
    .option('--hash', 'Download specific hash, highest priority')
    .option('-c, --cache-directory-path', 'Cache directory path')
    .option('--no-cache', 'Disable cache')
    .action(defaultCommandAction)
}
