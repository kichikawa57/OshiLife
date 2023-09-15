import { z } from "zod";

import { checkFormData, validateEditProfile } from "../../../shared/validate";

export const formData = z.object(validateEditProfile);

export type FormData = z.infer<typeof formData>;

export const formValidation = (data: FormData) => checkFormData(formData, data);
