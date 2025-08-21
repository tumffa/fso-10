import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate, useLocation } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handleRepositoryPress = (repository) => {
    console.log(repository.id)
    navigate(`/repositories/${repository.id}`);
    console.log('Navigating to:', `/repositories/${repository.id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleRepositoryPress(item)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return (
    <View style={styles.container}>
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;