import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.paddings.topAppBar,
    paddingBottom: theme.paddings.bottomAppBar,
    paddingLeft: theme.paddings.leftAppBar,
    backgroundColor: theme.colors.appBar,
  },
});

const AppBar = () => {
  return <View style={styles.container}>{
    <Pressable>
      <Text comp='textAppBar'>Repositories</Text>
    </Pressable>
  }</View>;
};

export default AppBar;