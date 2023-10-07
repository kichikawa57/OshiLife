import uuid from "react-native-uuid";

import { OshiId, Oshis } from "../../model/oshis";
import { DefaultRemoveTypeToCreateRow, DefaultRemoveTypeToUpdateRow, err, ok } from "../helper";
import { supabase } from "../init";

export const createOshi = async (params: Omit<Oshis, DefaultRemoveTypeToCreateRow>) => {
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
  try {
    const data = await supabase.from("oshis").update(params).eq("id", id);

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteOshi = async (id: OshiId) => {
  try {
    const data = await supabase.from("oshis").update({ deleted_at: "" }).eq("id", id);

    return ok(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return err(e);
  }
};
