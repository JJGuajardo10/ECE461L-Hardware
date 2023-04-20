import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginPortal from './LoginPortal';
import Logout from './Logout';

describe('Logout', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(Logged, 'handleLogout');
  });

  afterEach(() => {
    window.alert.mockRestore();
    Logged.handleLogout.mockRestore();
  });

  test('displays success message', () => {
    render(<Logout />);
    expect(screen.getByText(/you have successfully logged out/i)).toBeInTheDocument();
  });

  test('calls handleLogout', () => {
    render(<Logout />);
    expect(Logged.handleLogout).toHaveBeenCalled();
  });
});


describe('LoginPortal', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            valid: true,
          }),
      })
    );
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  test('calls sendCredentials with correct details on submit', async () => {
    render(<LoginPortal />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(emailInput, { target: { value: 'admin@admin.com' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith('/verifyuser', {
        method: 'POST',
        body: JSON.stringify({
          userid: 'admin@admin.com',
          password: 'admin123',
        }),
      });
    });
  });

  test('updates state correctly on successful login', async () => {
    render(<LoginPortal />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(emailInput, { target: { value: 'admin@admin.com' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/welcome, admin@admin.com!/i)).toBeInTheDocument();
    });
  });
});