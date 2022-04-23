import { setIn } from 'final-form';
import * as Yup from 'yup';

export const validateFormValues =
  <T = unknown,>(schema: Yup.SchemaOf<T>) =>
  async (values: T) => {
    return schema
      .validate(values, { abortEarly: false })
      .then(() => undefined)
      .catch((err: Yup.ValidationError) => {
        const errors = err.inner.reduce((formError, innerError) => {
          return setIn(formError, innerError.path || '', innerError.message);
        }, {});

        return errors;
      });
  };
