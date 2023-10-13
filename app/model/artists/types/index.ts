import { Database } from "../../../api/schema";
import { Overwrite } from "../../../shared/types";
import { Phantom } from "../../helper";

export type ArtistGroupId = Phantom<string, "ArtistGroupId">;
export type ArtistId = Phantom<string, "ArtistId">;

export type Artists = Overwrite<
  Database["public"]["Tables"]["artists"]["Row"],
  {
    id: ArtistId;
    group_id: ArtistGroupId;
  }
>;

export type ArtistsGroups = Overwrite<
  Database["public"]["Tables"]["artists_groups"]["Row"],
  {
    id: ArtistGroupId;
    artists: Artists[] | null;
  }
>;
