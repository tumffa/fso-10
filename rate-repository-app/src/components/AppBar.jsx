import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import useAuthenticated from '../hooks/useAuthenticated';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    paddingHorizontal: theme.paddings.horizontalAppBar,
    paddingVertical: theme.paddings.bottomAppBar,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 10,
  },
  tabText: {
    color: theme.colors.textAppBar,
    fontSize: theme.fontSizes.appBar,
    fontFamily: theme.fontFamily,
  },
});

const AppBarTab = ({ children, onPress, to }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <Pressable style={styles.tab} onPress={handlePress}>
      <Text fontWeight="bold" style={styles.tabText}>
        {children}
      </Text>
    </Pressable>
  );
};

const AppBar = () => {
  const { me } = useAuthenticated();
  const signOut = useSignOut();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.tabContainer}>
          <AppBarTab to="/">
            Repositories
          </AppBarTab>
          {me ? (
            <AppBarTab onPress={handleSignOut}>
              Sign out
            </AppBarTab>
          ) : (
            <AppBarTab to="/signin">
              Sign in
            </AppBarTab>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;