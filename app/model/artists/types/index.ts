import { Model, Phantom } from "../../helper";

export type ArtistId = Phantom<string, "ArtistId">;

export type Artists = Model<
  ArtistId,
  {
    name: string;
    furigana: string | null;
  }
>;
