import * as Yup from 'yup';

import { validateFormValues } from 'utils/validate';

import { VideoFormType } from './types';

const validationSchema: Yup.SchemaOf<VideoFormType> = Yup.object().shape({
  name: Yup.string().required('обязательное поле'),
  description: Yup.string().notRequired(),
  videoFile: Yup.string().oneOf([Yup.ref('source')], 'обязательное поле'),
  source: Yup.string().oneOf([Yup.ref('videoFile')], 'обязательное поле'),
  allowedGroups: Yup.array(Yup.string() as Yup.StringSchema<string>).notRequired(),
});

export const validateVideoForm = validateFormValues<VideoFormType>(validationSchema);
