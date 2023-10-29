import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";

import { DEFAULT_MESSAGE, getArtistsGroups } from "../../../api";
import { useQuery, useQueryClient } from "../../../query";
import {
  Artists,
  ArtistsGroups,
  convertOrigenalToModelForArtistGroup,
} from "../../../model/artists";

export const useSelectArtistListContent = () => {
  const [searchText, setSearchText] = useState("");
  const [prevSearchText, setPrevSearchText] = useState("");

  const { getQueryData } = useQueryClient();

  const { data, isLoading } = useQuery(
    "getArtists",
    async () => {
      const { data, error } = await getArtistsGroups();

      if (error !== null) throw error;

      return data.map<ArtistsGroups>((group) => {
        return convertOrigenalToModelForArtistGroup(
          { ...group, updated_at: "", created_at: "" },
          group.artists,
        );
      });
    },
    {
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const searchArtists = () => {
    setPrevSearchText(searchText);
  };

  const resetSearchArtists = () => {
    setPrevSearchText("");
  };

  const checkUnselectedOshi = useCallback(
    (artist: Artists) => {
      const oshis = getQueryData("getOshis");
      if (!oshis) return true;

      const isSelected = oshis.some((oshi) => artist.id === oshi.artist_id);

      return !isSelected;
    },
    [getQueryData],
  );

  const filterArtistsGroups = useMemo<ArtistsGroups[]>(() => {
    if (!data) return [];

    return data
      .reduce<ArtistsGroups[]>((prev, current) => {
        if (current.artists === null) return prev;

        const filterArtists = current.artists.filter((artist) => {
          if (prevSearchText === "") {
            return checkUnselectedOshi(artist);
          }

          if (artist.furigana === null) {
            return artist.name.indexOf(prevSearchText) !== -1;
          }

          const isSearchedName =
            artist.name.indexOf(prevSearchText) !== -1 ||
            artist.furigana.indexOf(prevSearchText) !== -1;

          return checkUnselectedOshi(artist) && isSearchedName;
        });

        prev.push({
          ...current,
          artists: filterArtists,
        });

        return prev;
      }, [])
      .filter((groups) => {
        if (!groups.artists) return false;

        return groups.artists.length !== 0;
      });
  }, [checkUnselectedOshi, data, prevSearchText]);

  return {
    isLoading,
    searchText,
    artistsGroups: filterArtistsGroups,
    resetSearchArtists,
    setSearchText,
    searchArtists,
  };
};
