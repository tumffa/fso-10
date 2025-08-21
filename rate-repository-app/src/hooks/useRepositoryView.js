import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (repositoryId) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network',
    skip: !repositoryId,
  });

  return {
    repository: data?.repository,
    loading,
    error,
  };
};

export default useRepository;