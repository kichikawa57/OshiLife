import { ArtistId, artistId } from "../../model/artists";
import { supabase } from "../init";

export type ArtistsInGetArtistsGroups = {
  furigana: string | null;
  id: ArtistId;
  name: string;
}[];

export type ResponseForGetArtistsGroups = {
  furigana: string | null;
  name: string;
  artists: ArtistsInGetArtistsGroups;
}[];

export const getArtistsGroups = async () => {
  const { data, error } = await supabase
    .from("artists_groups")
    .select("id, name, furigana, deleted_at, artists(id, name, furigana)")
    .is("deleted_at", null);

  if (error !== null) {
    return {
      error,
      data: null,
    };
  }

  const res: ResponseForGetArtistsGroups = data.map((r) => {
    const artists: ArtistsInGetArtistsGroups = r.artists.map((artist) => {
      return {
        furigana: artist.furigana,
        name: artist.name,
        id: artistId(artist.id),
      };
    });

    return {
      furigana: r.furigana,
      name: r.name,
      artists,
    };
  });

  return {
    error: null,
    data: res,
  };
};
