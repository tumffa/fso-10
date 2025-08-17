import { Platform } from 'react-native';

const theme = {
  colors: {
    main: '#e1e4e8',
    textPrimary: '#1b1b1bff',
    textSecondary: '#586069ff',
    appBar: '#1b1b1bff',
    textAppBar: '#ffffff',
    repositoryItem: '#ffffffff',
    repositoryItemLanguageTag: '#0366d6',
  },
  paddings: {
    topAppBar: 30,
    bottomAppBar: 10,
    horizontalAppBar: 10,
  },
  fontSizes: {
    appBar: 20,
    textPrimary: 15,
    textSecondary: 12,
  },
  fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Roboto',
    default: 'System',
  }),
};

export default theme;