import cac from 'cac'
import pkg from '../package.json'

import { registerDefaultCommand } from './default-command'

const cli = cac('ungit')

registerDefaultCommand(cli)

cli.help()
cli.version(pkg.version)
cli.parse()
