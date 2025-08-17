import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const changeNumber = (number) => {
  return number >= 1000 ? `${(number / 1000).toFixed(1)}k` : number.toString();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItem,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  languageTag: {
    backgroundColor: theme.colors.repositoryItemLanguageTag,
    color: theme.colors.repositoryItem,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
    fontSize: theme.fontSizes.textSecondary,
    fontFamily: theme.fontFamily,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.ownerAvatar} />
        <View style={styles.info}>
          <Text comp="textPrimary">
            {repository.fullName}
          </Text>
          <Text comp="textSecondary">
            {repository.description}
          </Text>
          <Text style={styles.languageTag}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text comp="textPrimary">
            {changeNumber(repository.stargazersCount)}
          </Text>
          <Text comp="textSecondary">Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text comp="textPrimary">
            {changeNumber(repository.forksCount)}
          </Text>
          <Text comp="textSecondary">Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text comp="textPrimary">
            {changeNumber(repository.reviewCount)}
          </Text>
          <Text comp="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text comp="textPrimary">
            {changeNumber(repository.ratingAverage)}
          </Text>
          <Text comp="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;