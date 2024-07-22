import { create } from 'zustand';

type TRole = '' | 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

interface ISetUserFields {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: TRole;
}

type TUserProfileStore = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: TRole;
  setUser: (fields: ISetUserFields) => void;
  clearUser: () => void;
};

export const useUserProfileStore = create<TUserProfileStore>(set => ({
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  role: '',
  settings: [],
  setUser: ({ id, email, firstName, lastName, username, role }: ISetUserFields) =>
    set(() => ({
      id,
      email,
      firstName,
      lastName,
      username,
      role,
    })),
  clearUser: () =>
    set(() => ({
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      role: '',
    })),
}));
