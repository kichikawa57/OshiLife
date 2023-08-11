import { z } from "zod";

import { checkFormData, validateEditSchedule } from "../../shared/validate";

export const formData = z.object(validateEditSchedule);

export type FormData = z.infer<typeof formData>;

export const formValidation = (data: FormData) => checkFormData(formData, data);
