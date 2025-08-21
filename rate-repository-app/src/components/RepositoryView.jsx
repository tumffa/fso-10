import { View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositoryView from '../hooks/useRepositoryView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

const RepositoryView = () => {
  const { repositoryId } = useParams();
  const { repository } = useRepositoryView(repositoryId);

  return (
    <View style={styles.container}>
      <RepositoryItem repository={repository}/>
    </View>
  );
};

export default RepositoryView;