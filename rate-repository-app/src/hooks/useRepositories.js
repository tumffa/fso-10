import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  console.log('useRepositories data:', data);

  return {
    repositories: data?.repositories,
    loading,
    error,
  };
};

export default useRepositories;