import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: 'row',
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const { data } = useQuery(ME);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <Pressable style={styles.tabContainer}>
          <Link to="/">
            <Text style={styles.tabText}>Repositories</Text>
          </Link>
        </Pressable>
        {data?.me ? (
          <>
            <Pressable style={styles.tabContainer}>
              <Link to="/create-review">
                <Text style={styles.tabText}>Create a review</Text>
              </Link>
            </Pressable>
            <Pressable style={styles.tabContainer} onPress={signOut}>
              <Text style={styles.tabText}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <Pressable style={styles.tabContainer}>
            <Link to="/signin">
              <Text style={styles.tabText}>Sign in</Text>
            </Link>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;