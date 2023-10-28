import RNFS from "react-native-fs";
import { decode } from "base64-arraybuffer";

import { ArtistId } from "../../model/artists";
import { ProfileId } from "../../model/profiles";
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

export const uploadImage = async (id: ProfileId, imagePath: string) => {
  const fileName = `image-oshi-${id}-${Date.now()}.jpg`;

  const base64 = await RNFS.readFile(imagePath, "base64");
  const imageData = decode(base64);

  const uploadImageData = await supabase.storage.from("oshis").upload(fileName, imageData, {
    contentType: "image/jpeg",
  });

  if (uploadImageData.error !== null) {
    return uploadImageData;
  }

  const getPublicData = supabase.storage.from("oshis").getPublicUrl(fileName);

  return { data: getPublicData.data, error: null };
};
