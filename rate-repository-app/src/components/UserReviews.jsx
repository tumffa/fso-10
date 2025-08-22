import { FlatList, View, StyleSheet } from 'react-native';
import UserReviewItem from './UserReviewItem';
import Text from './Text';
import useUser from '../hooks/useUser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
  separator: {
    height: 10,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { currentUser, loading, error } = useUser(true);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading reviews...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>Error loading reviews: {error.message}</Text>
      </View>
    );
  }

  const reviews = currentUser?.reviews 
    ? currentUser.reviews.edges.map(edge => edge.node)
    : [];

  if (reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>You haven't written any reviews yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <UserReviewItem 
            review={item} 
          />
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default UserReviews;