import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

const RepositoryListOrder = ({ selectedOrdering, setSelectedOrdering }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a sorting order</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedOrdering}
        onValueChange={(itemValue) => setSelectedOrdering(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export default RepositoryListOrder;