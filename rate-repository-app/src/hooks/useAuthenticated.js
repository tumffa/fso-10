import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useAuthenticated = () => {
  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    me: data ? data.me : undefined,
    loading,
    refetch,
  };
};

export default useAuthenticated;