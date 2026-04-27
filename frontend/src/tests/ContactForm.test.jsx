import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ContactForm from '@/pages/ContactForm';

// Mock fetch to prevent actual API calls
global.fetch = vi.fn();

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <BrowserRouter>
        <ContactForm />
      </BrowserRouter>
    );
  });

  it('shows the name error when the name field is empty', async () => {
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    
    // Submit with everything empty
    fireEvent.click(submitBtn);

    // Should catch the first gate (Name)
    expect(await screen.findByText(/Please enter your name/i)).toBeInTheDocument();
  });

  it('shows an email error when name is valid but email is not', async () => {
    // Fill Name to "clear the path"
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'John Doe' } });
    
    // Provide bad email
    fireEvent.change(screen.getByPlaceholderText(/Your Email Address/i), { target: { value: 'not-an-email' } });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('shows message length error when name and email are valid but message is too short', async () => {
    // Clear the path for Name and Email
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Email Address/i), { target: { value: 'test@example.com' } });
    
    // Provide short message
    fireEvent.change(screen.getByPlaceholderText(/Your Message Here/i), { target: { value: 'Short' } });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/at least 10 characters/i)).toBeInTheDocument();
  });

  it('detects profanity when all other fields are valid', async () => {
    // Clear the path
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Email Address/i), { target: { value: 'test@example.com' } });
    
    // Use a word that triggers leo-profanity
    fireEvent.change(screen.getByPlaceholderText(/Your Message Here/i), { target: { value: 'This message contains a fuck' } });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/please ensure your message remains professional/i)).toBeInTheDocument();
  });

  it('successfully swaps to success view on valid submission', async () => {
    // Mock successful fetch
    fetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    // Fill every field correctly
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Email Address/i), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'B-1/B-2 Tourist Visa' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Message Here/i), { target: { value: 'I would like to extend my B-1 visa for six months.' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for the success screen
    expect(await screen.findByText(/Message sent successfully/i)).toBeInTheDocument();
    
    // Verify buttons are present
    expect(screen.getByText(/Back to Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Fill out another form/i)).toBeInTheDocument();
    
    // Verify form is no longer visible
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  it('resets to the form view when "Fill out another form" is clicked', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    // Fill and submit
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Email Address/i), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Message Here/i), { target: { value: 'Valid message content' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for success screen
    const resetBtn = await screen.findByText(/Fill out another form/i);
    fireEvent.click(resetBtn);

    // Verify form fields are back and empty
    expect(screen.getByPlaceholderText(/Full Name/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/Your Email Address/i)).toHaveValue('');
  });
});