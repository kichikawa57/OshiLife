import { ArtistId } from "../../artists";
import { Model, Phantom } from "../../helper";
import { ProfileId } from "../../profiles";

export type OshiId = Phantom<string, "OshiId">;

export type Oshis = Model<
  OshiId,
  {
    user_id: ProfileId;
    artist_id: ArtistId;
    artist_name: string;
    image_url: string | null;
    memo: string | null;
    color: string;
    is_edit_color: boolean;
  }
>;
