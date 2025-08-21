import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import FormikInput from './FormikInput';
import Text from './Text';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

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
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikInput
        style={styles.input}
        name="username"
        placeholder="Username"
        testID="usernameField"
      />
      <FormikInput
        style={styles.input}
        name="password"
        placeholder="Password"
        secureTextEntry
        testID="passwordField"
      />
      <FormikInput
        style={styles.input}
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
        testID="passwordConfirmationField"
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log('Error during sign up:', e);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;