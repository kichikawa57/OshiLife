import { Database } from "../../../api/schema";
import { Overwrite } from "../../../shared/types";
import { Phantom } from "../../helper";

export type ProfileId = Phantom<string, "ProfileId">;

export type Profiles = Overwrite<
  Database["public"]["Tables"]["profiles"]["Row"],
  { id: ProfileId; sex: "men" | "women" }
>;
