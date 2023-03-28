import { IUserState } from 'types/types';
import { useAppSelector } from './redux-hooks';

export const useAuth = () => {
  // const { id, email, token } = useSelector((state: IState) => state.auth.user);

  const { id, email } = useAppSelector((state: IUserState) => state.auth.user);

  return { isAuth: !!email, id, email };
};
