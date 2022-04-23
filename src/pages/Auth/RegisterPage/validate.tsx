import * as Yup from 'yup';

import { validateFormValues } from 'utils/validate';

import { RegisterFormType } from './types';

const validationSchema: Yup.SchemaOf<RegisterFormType> = Yup.object().shape({
  username: Yup.string().required('обязательное поле'),
  password: Yup.string().min(6, 'пароль должен содержать минимум 6 символов').required('обязательное поле'),
  passwordReply: Yup.string().equals([Yup.ref('password')], 'пароли должны совпадать'),
});

export const validateRegisterForm = validateFormValues<RegisterFormType>(validationSchema);
