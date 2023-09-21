import { z } from "zod";

import { checkFormData, validateSetupUserData } from "../../shared/validate";

export const formData = z.object({
  ...validateSetupUserData,
});

export type FormData = z.infer<typeof formData>;

export const formValidation = (data: FormData) => checkFormData(formData, data);
