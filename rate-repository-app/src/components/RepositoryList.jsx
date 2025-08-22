import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import RepositoryListOrder from './RepositoryListOrder';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
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

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListOrder 
        searchKeyword={props.searchKeyword}
        setSearchKeyword={props.setSearchKeyword}
        selectedOrdering={props.selectedOrdering}
        setSelectedOrdering={props.setSelectedOrdering}
      />
    );
  };

  render() {
    const { repositories, navigate } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    const handleRepositoryPress = (repository) => {
      navigate(`/repositories/${repository.id}`);
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
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedOrdering, setSelectedOrdering] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const getOrderVariables = (ordering) => {
    switch (ordering) {
      case 'latest':
        return {
          orderBy: 'CREATED_AT',
          orderDirection: 'DESC',
        };
      case 'highest':
        return {
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'DESC',
        };
      case 'lowest':
        return {
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'ASC',
        };
      default:
        return {
          orderBy: 'CREATED_AT',
          orderDirection: 'DESC',
        };
    }
  };

  const orderVariables = getOrderVariables(selectedOrdering);
  const variables = {
    ...orderVariables,
    searchKeyword: debouncedSearchKeyword || undefined,
  };

  const { repositories, loading, error } = useRepositories(variables);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading repositories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>Error loading repositories: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RepositoryListContainer 
        repositories={repositories}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        selectedOrdering={selectedOrdering}
        setSelectedOrdering={setSelectedOrdering}
        navigate={navigate}
      />
    </View>
  );
};

export default RepositoryList;