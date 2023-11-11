import type { ExtractTarGZOptions } from './types'

export function resolveExtractTarGZOptions(options?: ExtractTarGZOptions): Required<ExtractTarGZOptions> {
  return {
    subDirectory: options?.subDirectory ?? '',
  }
}
