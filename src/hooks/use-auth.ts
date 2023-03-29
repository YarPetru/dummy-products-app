import { IUserState } from 'types/types';
import { useAppSelector } from './redux-hooks';

export const useAuth = () => {
  const { id, email } = useAppSelector((state: IUserState) => state.auth.user);

  return { isAuth: !!email, id, email };
};
