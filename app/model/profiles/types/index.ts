import { Model, Phantom } from "../../helper";

export type ProfileId = Phantom<string, "ProfileId">;

export type Profiles = Model<
  ProfileId,
  {
    email: string;
    name: string;
    sex: "men" | "women";
  }
>;
