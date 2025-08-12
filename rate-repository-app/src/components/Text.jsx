import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
  },
  textPrimary: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.textPrimary,
  },
  textAppBar: {
    color: theme.colors.textAppBar,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.appBar,
  },
});

const Text = ({ comp, ...props }) => {
  const textStyle = [
    styles.text,
    comp === 'textPrimary' && styles.textPrimary,
    comp === 'textAppBar' && styles.textAppBar,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;