import { Text, View, Image } from 'react-native';

const RepositoryItem = ({ repository }) => {
  return (
    <View>
      <Text>{repository.fullName}</Text>
      <Text>{repository.description}</Text>
      <Text>{repository.language}</Text>
      <Text>Forks: {repository.forksCount}</Text>
      <Text>Stars: {repository.stargazersCount}</Text>
      <Text>Rating: {repository.ratingAverage}</Text>
      <Text>Reviews: {repository.reviewCount}</Text>
      <Image source={{ uri: repository.ownerAvatarUrl }} style={{ width: 20, height: 20 }} />
    </View>
  );
}

export default RepositoryItem;