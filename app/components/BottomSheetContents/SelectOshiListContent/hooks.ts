import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { Alert } from "react-native";

import { DEFAULT_MESSAGE, ResponseForGetArtistsGroups, getArtistsGroups } from "../../../api";

export const useSelectOshiListContent = () => {
  const [searchText, setSearchText] = useState("");
  const [prevSearchText, setPrevSearchText] = useState("");
  const [artistsGroups, setArtistsGroups] = useState<ResponseForGetArtistsGroups>([]);

  const getArtistsMutation = useMutation(
    async () => {
      const { data, error } = await getArtistsGroups();

      if (error !== null) throw error;

      return data;
    },
    {
      onSuccess: (data) => {
        setArtistsGroups(data);
      },
      onError: () => {
        Alert.alert(DEFAULT_MESSAGE);
      },
    },
  );

  const searchArtists = () => {
    setPrevSearchText(searchText);
  };

  const filterArtistsGroups = useMemo<ResponseForGetArtistsGroups>(() => {
    if (prevSearchText === "") return artistsGroups;

    return artistsGroups
      .reduce<ResponseForGetArtistsGroups>((prev, current) => {
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
      .filter((groups) => groups.artists.length !== 0);
  }, [artistsGroups, prevSearchText]);

  useEffect(() => {
    getArtistsMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading: getArtistsMutation.isLoading,
    searchText,
    artistsGroups: filterArtistsGroups,
    setSearchText,
    searchArtists,
  };
};
