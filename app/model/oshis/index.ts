import { Database } from "../../api/schema";
import { artistGroupId, artistId } from "../artists";
import { profileId } from "../profiles";

import { OshiId, Oshis } from "./types";

export * from "./types";

export const oshiId = (n: string) => n as OshiId;

export const getArtistOfOshi = (oshiId: OshiId, oshis: Oshis[]) => {
  if (!oshis) return null;

  const oshi = oshis.find(({ id }) => oshiId === id);

  if (oshi === undefined || oshi.artists === null) return null;

  return { ...oshi.artists, imageUrl: oshi.image_url };
};

export const convertOrigenalToModelForOshi: (
  oshi: Database["public"]["Tables"]["oshis"]["Row"],
  artist: Partial<Database["public"]["Tables"]["artists"]["Row"]> | null,
) => Oshis = (
  oshi: Database["public"]["Tables"]["oshis"]["Row"],
  artist: Partial<Database["public"]["Tables"]["artists"]["Row"]> | null,
) => {
  return {
    id: oshiId(oshi.id),
    user_id: profileId(oshi.user_id),
    artist_id: artistId(oshi.artist_id),
    color: oshi.color,
    image_url: oshi.image_url,
    memo: oshi.memo,
    is_edit_color: oshi.is_edit_color,
    created_at: oshi.created_at,
    updated_at: oshi.updated_at,
    deleted_at: oshi.deleted_at,
    artists: artist
      ? {
          id: artistId(artist.id || ""),
          name: artist.name || "",
          furigana: artist.furigana || "",
          group_id: artistGroupId(artist.group_id || ""),
          created_at: artist.created_at || "",
          updated_at: artist.updated_at || "",
          deleted_at: artist.deleted_at || "",
        }
      : null,
  };
};
