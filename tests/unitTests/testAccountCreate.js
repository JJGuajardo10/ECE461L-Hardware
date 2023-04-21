import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import CreateAccount from './CreateAccount';
import AccountForm from './components/AccountForm';

// Mock fetch function to return successful response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ errorcode: 0 }),
  })
);

describe('CreateAccount', () => {
  test('Renders the login form', () => {
    render(<CreateAccount />);
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
  });

  test('Displays error if username and password are empty', async () => {
    render(<AccountForm />);
    const usernameInput = screen.queryByLabelText(/Username/i);
    const passwordInput = screen.queryByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Username and Password must be greater than 0')).toBeInTheDocument();
    });
  });

  test('Displays error if username contains invalid characters', async () => {
    render(<AccountForm />);
    const usernameInput = screen.queryByLabelText(/Username/i);
    const passwordInput = screen.queryByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    fireEvent.change(usernameInput, { target: { value: 'invalid username!' } });
    fireEvent.change(passwordInput, { target: { value: 'valid_password1#' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Please use valid characters')).toBeInTheDocument();
    });
  });

  test('Displays error if password contains invalid characters', async () => {
    render(<AccountForm />);
    const usernameInput = screen.queryByLabelText(/Username/i);
    const passwordInput = screen.queryByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    fireEvent.change(usernameInput, { target: { value: 'valid_username_123' } });
    fireEvent.change(passwordInput, { target: { value: 'invalid password!' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Please use valid characters')).toBeInTheDocument();
    });
  });

  test('Displays server response message on successful submit', async () => {
    render(<AccountForm />);
    const usernameInput = screen.queryByLabelText(/Username/i);
    const passwordInput = screen.queryByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    fireEvent.change(usernameInput, { target: { value: 'valid_username_123' } });
    fireEvent.change(passwordInput, { target: { value: 'valid_password1#' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Added User!')).toBeInTheDocument();
    });
  });

  test('Displays server response message on unsuccessful submit', async () => {
    // Mock fetch function to return failure
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ errorcode: 1 }) }));
    render(<AccountForm />);
    const usernameInput = screen.queryByLabelText(/Username/i);
    const passwordInput = screen.queryByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    fireEvent.change(usernameInput, { target: { value: 'valid_username_123' } });
    fireEvent.change(passwordInput, { target: { value: 'valid_password1#' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Did not add new user.')).toBeInTheDocument();
    });
  });
});