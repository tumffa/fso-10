import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    width: 450,
    paddingTop: theme.paddings.topAppBar,
    paddingBottom: theme.paddings.bottomAppBar,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.paddings.horizontalAppBar,
  },
  link: {
    textDecorationLine: 'none',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/" style={styles.link}>
        <Text comp="textAppBar" style={{ color: theme.colors.textAppBar, fontWeight: 'bold', fontSize: theme.fontSizes.appBar }}>
          Repositories
        </Text>
      </Link>
      <Link to="/signin" style={styles.link}>
        <Text comp="textAppBar" style={{ color: theme.colors.textAppBar, fontWeight: 'bold', fontSize: theme.fontSizes.appBar }}>
          Sign In
        </Text>
      </Link>
    </View>
  );
};

export default AppBar;