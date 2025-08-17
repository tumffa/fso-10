import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import { useRef, useEffect } from 'react';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: theme.paddings.topAppBar,
    paddingBottom: theme.paddings.bottomAppBar,
    backgroundColor: theme.colors.appBar,
  },
  scrollView: {
    ...(Platform.OS === 'web' ? { overflowX: 'auto' } : {}),
  },
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: theme.paddings.horizontalAppBar,
    ...(Platform.OS === 'web' ? { minWidth: '150%' } : {}),
  },
  link: {
    textDecorationLine: 'none',
    marginRight: 20,
  },
  textAppBar: {
    color: theme.colors.textAppBar,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.appBar,
  },
});

const AppBar = () => {
  const scrollViewRef = useRef(null);
  
  useEffect(() => {
    if (Platform.OS === 'web' && scrollViewRef.current) {
      const scrollView = scrollViewRef.current;
      if (scrollView && scrollView.getScrollableNode) {
        const nativeScrollView = scrollView.getScrollableNode();
        const handleWheel = (event) => {
          if (event.deltaY !== 0) {
            event.preventDefault();
            nativeScrollView.scrollLeft += event.deltaY;
          }
        };
        nativeScrollView.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
          nativeScrollView.removeEventListener('wheel', handleWheel);
        };
      }
    }
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer} 
        showsHorizontalScrollIndicator={true}
        scrollEnabled={true}
      >
        <Link to="/" style={styles.link}>
          <Text style={styles.textAppBar}>Repositories</Text>
        </Link>
        <Link to="/signin" style={styles.link}>
          <Text style={styles.textAppBar}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;