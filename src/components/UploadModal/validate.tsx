import * as Yup from 'yup';

import { validateFormValues } from 'utils/validate';

import { VideoFormType } from './types';

const validationSchema = (filename: string): Yup.SchemaOf<VideoFormType> => {
  return Yup.object().shape(
    {
      name: Yup.string().when({
        is: () => filename === '' || !filename,
        then: Yup.string().required('обязательное поле'),
      }),
      description: Yup.string().notRequired(),
      videoFile: Yup.string().when('source', {
        is: (source: string | undefined) => source === '' || !source,
        then: Yup.string().required('обязательное поле'),
      }),
      source: Yup.string().when('videoFile', {
        is: (videoFile: string | undefined) => videoFile === '' || !videoFile,
        then: Yup.string().required('обязательное поле'),
      }),
      allowedGroups: Yup.array(Yup.string() as Yup.StringSchema<string>).notRequired(),
    },
    [['source', 'videoFile']],
  ) as unknown as Yup.SchemaOf<VideoFormType>;
};

const validationEditSchema = (filename: string): Yup.SchemaOf<VideoFormType> => {
  return Yup.object().shape(
    {
      name: Yup.string().when({
        is: () => filename === '' || !filename,
        then: Yup.string().required('обязательное поле'),
      }),
      description: Yup.string().notRequired(),
      allowedGroups: Yup.array(Yup.string() as Yup.StringSchema<string>).notRequired(),
    },
    [['source', 'videoFile']],
  ) as unknown as Yup.SchemaOf<VideoFormType>;
};

export const validateVideoForm = (filename: string) => validateFormValues<VideoFormType>(validationSchema(filename));
export const validateEditVideoForm = (filename: string) =>
  validateFormValues<VideoFormType>(validationEditSchema(filename));
