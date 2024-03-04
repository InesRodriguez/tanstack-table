import { useQuery } from '@tanstack/react-query';
import { platziApi } from '../../../api/platziApi';
import { User } from '../interfaces';

const getUsers = async (): Promise<User[]> => {
  const {data} = await platziApi.get('/users');
  console.log('data', data)
  return data;
};

export const useUsers = () => {
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: getUsers, staleTime: 1000 * 60 * 60 });
  return {usersQuery};
};
