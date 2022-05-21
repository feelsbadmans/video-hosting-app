import * as Yup from 'yup';

import { validateFormValues } from 'utils/validate';

import { UserFormType } from './types';

const validationSchema: Yup.SchemaOf<UserFormType> = Yup.object().shape({
  username: Yup.string().required('обязательное поле'),
  authorities: Yup.array().min(1, 'обязательное поле').required('обязательное поле'),
  group: Yup.string().required('обязательное поле'),
  locked: Yup.boolean().notRequired(),
});

export const validateUserForm = validateFormValues<UserFormType>(validationSchema);
