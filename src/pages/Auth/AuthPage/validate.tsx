import * as Yup from 'yup';

import { validateFormValues } from 'utils/validate';

import { AuthFormType } from './types';

const validationSchema: Yup.SchemaOf<AuthFormType> = Yup.object().shape({
  username: Yup.string().required('обязательное поле'),
  password: Yup.string().required('обязательное поле'),
});

export const validateAuthForm = validateFormValues<AuthFormType>(validationSchema);
