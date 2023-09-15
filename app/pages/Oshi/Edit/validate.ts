import { z } from "zod";

import { checkFormData, validateEditOshi } from "../../../shared/validate";

export const formData = z.object(validateEditOshi);

export type FormData = z.infer<typeof formData>;

export const formValidation = (data: FormData) => checkFormData(formData, data);
