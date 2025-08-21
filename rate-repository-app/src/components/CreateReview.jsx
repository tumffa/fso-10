import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import FormikInput from './FormikInput';
import Text from './Text';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: theme.colors.repositoryItemLanguageTag,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: yup
    .string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikInput
        style={styles.input}
        name="ownerName"
        placeholder="Repository owner name"
        testID="ownerNameField"
      />
      <FormikInput
        style={styles.input}
        name="repositoryName"
        placeholder="Repository name"
        testID="repositoryNameField"
      />
      <FormikInput
        style={styles.input}
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        testID="ratingField"
      />
      <FormikInput
        style={styles.input}
        name="text"
        placeholder="Review"
        multiline
        numberOfLines={4}
        testID="reviewField"
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const data = await createReview({ ownerName, repositoryName, rating, text });
      const repositoryId = data.createReview.repositoryId;
      navigate(`/repositories/${repositoryId}`);
    } catch (e) {
      console.log('Error creating review:', e);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;