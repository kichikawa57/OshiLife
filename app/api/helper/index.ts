type Result<T = null, K = null> = {
  ok: boolean;
  err: boolean;
  resolve: T;
  reject: K;
};

export type SupabaseError = {
  message: string;
  details: string;
  hint?: string;
  code?: string;
};

export type DefaultRemoveTypeToCreateRow = "id" | "updated_at" | "created_at" | "deleted_at";

export type DefaultRemoveTypeToUpdateRow = "id" | "updated_at" | "created_at" | "deleted_at";

export const ok: <T = null>(value: T) => Result<T> = <T = null>(value: T) => {
  return {
    ok: true,
    err: false,
    resolve: value,
    reject: null,
  };
};

export const err: <T = Error>(value: T) => Result<null, T> = <T = Error>(value: T) => {
  return {
    ok: false,
    err: true,
    resolve: null,
    reject: value,
  };
};
