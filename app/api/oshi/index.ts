import uuid from "react-native-uuid";
import dayjs from "dayjs";

import { OshiId, Oshis } from "../../model/oshis";
import { DefaultRemoveTypeToCreateRow, DefaultRemoveTypeToUpdateRow } from "../helper";
import { supabase } from "../init";
import { ProfileId } from "../../model/profiles";

export const getOshis = async (userId: ProfileId) => {
  const data = await supabase
    .from("oshis")
    .select(
      "id, artist_id, artist_id, memo, color, is_edit_color, image_url, deleted_at, artists(name)",
    )
    .order("updated_at", { ascending: false })
    .eq("user_id", userId)
    .is("deleted_at", null);

  return data;
};

export const createOshi = async (params: Omit<Oshis, DefaultRemoveTypeToCreateRow | "artists">) => {
  const id = String(uuid.v4());

  const data = await supabase.from("oshis").insert({
    id,
    ...params,
  });

  return data;
};

export const updateOshi = async (
  id: OshiId,
  params: Partial<Omit<Oshis, DefaultRemoveTypeToUpdateRow>>,
) => {
  const data = await supabase.from("oshis").update(params).eq("id", id);

  return data;
};

export const deleteOshi = async (id: OshiId) => {
  const deleted_at = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  const data = await supabase.from("oshis").update({ deleted_at }).eq("id", id);

  return data;
};
