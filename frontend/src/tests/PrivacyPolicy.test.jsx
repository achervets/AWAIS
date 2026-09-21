import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

describe('PrivacyPolicy Component', () => {
  it('describes the contact form processor and sensitive-data guidance', () => {
    render(<PrivacyPolicy />);

    expect(screen.getByRole('heading', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByText(/processed by Web3Forms/i)).toBeInTheDocument();
    expect(screen.getByText(/Please do not send Social Security numbers/i)).toBeInTheDocument();
  });
});
