import { ArtistId } from "../../model/artists";
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
  const res = await supabase
    .from("artists_groups")
    .select("id, name, furigana, deleted_at, artists!inner (id, name, furigana, deleted_at)")
    .is("deleted_at", null);

  if (res.data !== null) {
    res.data = res.data
      .map((artistsGroup) => {
        return {
          ...artistsGroup,
          artists: [
            ...artistsGroup.artists.filter((artist) => {
              return artist.deleted_at === null;
            }),
          ],
        };
      })
      .filter((artistsGroup) => artistsGroup.artists.length > 0);
  }

  return res;
};
