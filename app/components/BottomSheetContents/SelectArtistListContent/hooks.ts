import { useMemo, useState } from "react";
import { Alert } from "react-native";

import { DEFAULT_MESSAGE, getArtistsGroups } from "../../../api";
import { getMinutes } from "../../../shared/utils";
import { useQuery } from "../../../query";
import { ArtistsGroups, convertOrigenalToModelForArtistGroup } from "../../../model/artists";

export const useSelectArtistListContent = () => {
  const [searchText, setSearchText] = useState("");
  const [prevSearchText, setPrevSearchText] = useState("");

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
      cacheTime: getMinutes(30),
      staleTime: getMinutes(30),
    },
  );

  const searchArtists = () => {
    setPrevSearchText(searchText);
  };

  const resetSearchArtists = () => {
    setPrevSearchText("");
  };

  const filterArtistsGroups = useMemo<ArtistsGroups[]>(() => {
    if (!data) return [];
    if (prevSearchText === "") return data;

    return data
      .reduce<ArtistsGroups[]>((prev, current) => {
        if (current.artists === null) return prev;

        const filterArtists = current.artists.filter((artist) => {
          if (artist.furigana === null) {
            return artist.name.indexOf(prevSearchText) !== -1;
          }

          return (
            artist.name.indexOf(prevSearchText) !== -1 ||
            artist.furigana.indexOf(prevSearchText) !== -1
          );
        });

        prev.push({
          ...current,
          artists: filterArtists,
        });

        return prev;
      }, [])
      .filter((groups) => (groups.artists ? groups.artists.length !== 0 : false));
  }, [data, prevSearchText]);

  return {
    isLoading,
    searchText,
    artistsGroups: filterArtistsGroups,
    resetSearchArtists,
    setSearchText,
    searchArtists,
  };
};
