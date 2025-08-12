import { View, StyleSheet, Pressable, Text } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.paddings.topAppBar,
    paddingBottom: theme.paddings.bottomAppBar,
    backgroundColor: theme.colors.appBar,
  },
  text: {
    color: theme.colors.appBarText,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const AppBar = () => {
  return <View style={styles.container}>{
    <Pressable>
      <Text style={styles.text}>Repositories</Text>
    </Pressable>
  }</View>;
};

export default AppBar;