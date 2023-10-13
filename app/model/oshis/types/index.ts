import { Database } from "../../../api/schema";
import { Overwrite } from "../../../shared/types";
import { ArtistId, Artists } from "../../artists";
import { Phantom } from "../../helper";
import { ProfileId } from "../../profiles";

export type OshiId = Phantom<string, "OshiId">;

export type Oshis = Overwrite<
  Database["public"]["Tables"]["oshis"]["Row"],
  {
    id: OshiId;
    user_id: ProfileId;
    artist_id: ArtistId;
    artists: Artists | null;
  }
>;
