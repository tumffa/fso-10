import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useCurrentUser = (includeReviews = false) => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return {
    currentUser: data?.me,
    loading,
    error,
  };
};

export default useCurrentUser;