import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../SignIn';

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const mockSubmit = jest.fn();

      render(<SignInForm onSubmit={mockSubmit} />);

      fireEvent.changeText(screen.getByTestId('usernameField'), 'testuser');
      fireEvent.changeText(screen.getByTestId('passwordField'), 'testpassword');
      fireEvent.press(screen.getByTestId('submitButton'));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        
        const firstCallFirstArg = mockSubmit.mock.calls[0][0];
        expect(firstCallFirstArg).toEqual({
          username: 'testuser',
          password: 'testpassword',
        });
      });
    });
  });
});