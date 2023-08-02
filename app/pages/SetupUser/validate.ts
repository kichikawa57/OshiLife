import { z } from "zod";

import { checkFormData, validateEmailAndPassword } from "../../shared/validate";

export const formData = z.object({
  ...validateEmailAndPassword,
});

export type FormData = z.infer<typeof formData>;

export const formValidation = (data: FormData) => checkFormData(formData, data);
