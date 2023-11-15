import { readFile } from 'fs/promises'
import { resolve } from 'path'

import { resolveGithubRepoRefsFromGitLsRemoteStdout } from '../resolve-git-ls-remote-stdout'

describe('resolveGithubRepoRefFromGitLsRemoteStdout', () => {
  test('should be succeed', async () => {
    const stdout = await readFile(resolve(__dirname, 'fixtures/git-ls-remote-stdout.txt'), 'utf-8')
    const result = resolveGithubRepoRefsFromGitLsRemoteStdout(stdout)

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "hash": "39a262dd82249751f175bf2b7f72ad74584fc921",
          "name": "HEAD",
          "type": "HEAD",
        },
        {
          "hash": "e96d34f90b383305761c004b825e9d75639b98ca",
          "name": "feat/cropperjs-learning",
          "type": "branch",
        },
        {
          "hash": "7082b029edd187c02945f2944a06fcfa104dff87",
          "name": "feat/linux",
          "type": "branch",
        },
        {
          "hash": "d9de13557af3a0c8ebe1a66b10d39e6225d07576",
          "name": "feat/plasticine-drop",
          "type": "branch",
        },
        {
          "hash": "1b340ab7654f2b6d6f7aba0ecfec8c8fac4c6c21",
          "name": "feat/plasticine-react",
          "type": "branch",
        },
        {
          "hash": "f151903fe439a153a1a01a6f410e109f909572d6",
          "name": "gh-pages",
          "type": "branch",
        },
        {
          "hash": "39a262dd82249751f175bf2b7f72ad74584fc921",
          "name": "main",
          "type": "branch",
        },
        {
          "hash": "3b978fb8e00f01bb43903a0291f5c0e5c92c8b74",
          "name": "v0.0.1",
          "type": "tag",
        },
        {
          "hash": "a5232feef1a585974b4faecdfc053d626be945a8",
          "name": "v0.0.2",
          "type": "tag",
        },
        {
          "hash": "7a08a89442da03012ed6572d92a68c4a05526473",
          "name": "v0.0.3",
          "type": "tag",
        },
        {
          "hash": "e9b5d8bbbfcca29fc899a1e50c715161c04370b1",
          "name": "v0.0.4",
          "type": "tag",
        },
        {
          "hash": "fbd0f9c5a0deea2829dfc2405440dc38bf624a18",
          "name": "v0.0.5",
          "type": "tag",
        },
        {
          "hash": "03d7836a6bbdaa5506426ea2d8af21cd3155db26",
          "name": "v0.0.6",
          "type": "tag",
        },
        {
          "hash": "231be64a2499bf0f5e2ad454bc185b8f3890cbf8",
          "name": "v0.1.0",
          "type": "tag",
        },
        {
          "hash": "56d20b5db429bb973938afee1f69845202817a6a",
          "name": "v0.2.0",
          "type": "tag",
        },
        {
          "hash": "90436d0c2fea01142bd512794ac227f8a7014af4",
          "name": "v0.3.0",
          "type": "tag",
        },
        {
          "hash": "dc80f19159f313bdc4843b7442729598d34bf102",
          "name": "v0.3.1",
          "type": "tag",
        },
        {
          "hash": "f715442884070c60ea6c37917b025ea25a4da7f7",
          "name": "v0.3.10",
          "type": "tag",
        },
        {
          "hash": "041141beb97d1f1b5e1a74127a4a32416fae50d8",
          "name": "v0.3.11",
          "type": "tag",
        },
        {
          "hash": "74f4814293e54c967578f42fee2fbc78d6200f04",
          "name": "v0.3.12",
          "type": "tag",
        },
        {
          "hash": "97c921a0245467673089f065b7f2b76b673e74df",
          "name": "v0.3.13",
          "type": "tag",
        },
        {
          "hash": "9543cc89d5018be6a64748361784ba5c634ea6d0",
          "name": "v0.3.14",
          "type": "tag",
        },
        {
          "hash": "cde74a1b5e36adc877dc7e70b745002840039f54",
          "name": "v0.3.15",
          "type": "tag",
        },
        {
          "hash": "1ba1987835ef4e254b34fb7b33ee1a4aae92cee0",
          "name": "v0.3.16",
          "type": "tag",
        },
        {
          "hash": "1fb5878798464b6e724010ab52a8cf5463917620",
          "name": "v0.3.17",
          "type": "tag",
        },
        {
          "hash": "a1bf44cf6b6effdbae36eabe072fe6cac7bff9cd",
          "name": "v0.3.18",
          "type": "tag",
        },
        {
          "hash": "ec01a56c9c971c0d601b01eda7f6dc488b6d88bf",
          "name": "v0.3.19",
          "type": "tag",
        },
        {
          "hash": "3a236cfb6158c65ffc2cadc4f076cfc814d66c25",
          "name": "v0.3.2",
          "type": "tag",
        },
        {
          "hash": "f080d61c48663e917f330a6a34468a776d7c6e9b",
          "name": "v0.3.20",
          "type": "tag",
        },
        {
          "hash": "a72cc1d4eeee8969c87291e245833eac9ed801d7",
          "name": "v0.3.21",
          "type": "tag",
        },
        {
          "hash": "16431a83b0d8ecc2dd11e66fc018793c17de50fc",
          "name": "v0.3.22",
          "type": "tag",
        },
        {
          "hash": "583b8a4ff1011e9d007f7ca3df9cae436f0dbc4d",
          "name": "v0.3.3",
          "type": "tag",
        },
        {
          "hash": "a3d0e8776b9944e1c5a7ebafb09419d6c7350359",
          "name": "v0.3.4",
          "type": "tag",
        },
        {
          "hash": "acd43fd2fd81292fb68a7c57ee3318c0aac87da7",
          "name": "v0.3.5",
          "type": "tag",
        },
        {
          "hash": "09f59d05d247fe45ff7cb59546b075f4820e429d",
          "name": "v0.3.6",
          "type": "tag",
        },
        {
          "hash": "892d8f551f4193730c524c95accdfd3de5995e75",
          "name": "v0.3.7",
          "type": "tag",
        },
        {
          "hash": "ab628a584be3d4e0c858b7f317d2b43c2d85ede2",
          "name": "v0.3.8",
          "type": "tag",
        },
        {
          "hash": "0f20916f4948a45240af4bef5a05120ae51c6358",
          "name": "v0.3.9",
          "type": "tag",
        },
      ]
    `)
  })
})
