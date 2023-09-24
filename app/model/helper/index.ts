type DefaultSchema<T> = {
  id: T;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Model<I, T> = DefaultSchema<I> & T;

export type Phantom<T, U extends string> = T & { [key in U]: never };
