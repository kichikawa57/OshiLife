import { Database } from "../../api/schema";

import { ArtistGroupId, ArtistId, Artists, ArtistsGroups } from "./types";

export * from "./types";

export const artistGroupId = (n: string) => n as ArtistGroupId;
export const artistId = (n: string) => n as ArtistId;

export const convertOrigenalToModelForArtistGroup: (
  artistsGroup: Database["public"]["Tables"]["artists_groups"]["Row"],
  artists: Array<Partial<Database["public"]["Tables"]["artists"]["Row"]>> | null,
) => ArtistsGroups = (
  artistsGroup: Database["public"]["Tables"]["artists_groups"]["Row"],
  artists: Array<Partial<Database["public"]["Tables"]["artists"]["Row"]>> | null,
) => {
  return {
    id: artistGroupId(artistsGroup.id),
    name: artistsGroup.name,
    furigana: artistsGroup.furigana,
    created_at: artistsGroup.created_at,
    updated_at: artistsGroup.updated_at,
    deleted_at: artistsGroup.deleted_at,
    artists: artists
      ? artists.map((artist) => {
          return {
            id: artistId(artist.id || ""),
            name: artist.name || "",
            furigana: artist.furigana || "",
            group_id: artistGroupId(artist.group_id || ""),
            created_at: artist.created_at || "",
            updated_at: artist.updated_at || "",
            deleted_at: artist.deleted_at || "",
          };
        })
      : null,
  };
};

export const convertOrigenalToModelForArtist: (
  artists: Database["public"]["Tables"]["artists"]["Row"],
) => Artists = (artists: Database["public"]["Tables"]["artists"]["Row"]) => {
  return {
    id: artistId(artists.id),
    name: artists.name,
    furigana: artists.furigana,
    group_id: artistGroupId(artists.group_id),
    created_at: artists.created_at,
    updated_at: artists.updated_at,
    deleted_at: artists.deleted_at,
  };
};
