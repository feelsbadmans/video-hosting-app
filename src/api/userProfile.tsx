import { AuthApiApi, CreateUserDto, LoginUserDto } from 'api_generated';

// import axios from 'axios';

export const login = async (options: LoginUserDto) => {
  const service = new AuthApiApi();

  await service
    .login(options)
    .then((res) => {
      const token = res.headers['authorization'];

      localStorage.setItem('token', token);
      localStorage.setItem('username', res.data.user?.username || '');
    })
    .catch(console.error);
};

export const register = async (options: CreateUserDto) => {
  const service = new AuthApiApi();

  try {
    await service.register(options);
    await login({ username: options.username, password: options.password });
  } catch (err) {
    console.error(err);
  }
};
