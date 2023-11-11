import { resolve } from 'path'

import { extractTarGZ } from '../extract-tar-gz'

describe('extractTarGZ', () => {
  test('should extract all files', async () => {
    await extractTarGZ(
      resolve(__dirname, 'fixtures/39a262dd82249751f175bf2b7f72ad74584fc921.tar.gz'),
      resolve(__dirname, 'fixtures/targets/full'),
    )
  })

  test('should extract subdirectory', async () => {
    // Plasticine-Yang.github.io-39a262dd82249751f175bf2b7f72ad74584fc921/docs/typescript/type-challenges/easy.md
    await extractTarGZ(
      resolve(__dirname, 'fixtures/39a262dd82249751f175bf2b7f72ad74584fc921.tar.gz'),
      resolve(__dirname, 'fixtures/targets/subdirectory'),
      { subDirectory: 'Plasticine-Yang.github.io-39a262dd82249751f175bf2b7f72ad74584fc921/docs' },
    )
  })
})
