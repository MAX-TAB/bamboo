import NeteaseCloudMusicApi, { type SearchType } from "NeteaseCloudMusicApi"

import { REAL_IP } from "@/common/utils/config"

import type {
  NeteaseCloudSearchSongResult,
  NeteaseSong,
} from "../../interfaces"

export const searchSong = async (
  query: string,
  cookie?: string,
): Promise<NeteaseSong | null> => {
  return NeteaseCloudMusicApi.cloudsearch({
    keywords: query,
    type: 1 as SearchType,
    cookie,
    realIP: REAL_IP,
  })
    .then((rawResult) => {
      const result = rawResult.body.result as NeteaseCloudSearchSongResult
      const songs = result.songs as NeteaseSong[]

      return songs[0] ?? null
    })
    .catch((error) => {
      console.error("❌ Error in search:", error)
      return null
    })
}
