import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage Component', () => {
    it('assembles the WhatsApp number and opens a new tab when clicked', () => {
        const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {});

        /* Without this the router crashes because it can't find the web address */
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        const whatsAppButton = screen.getByText('Message Us on WhatsApp!');
        fireEvent.click(whatsAppButton);

        expect(openSpy).toHaveBeenCalledWith(expect.stringContaining('https://wa.me/17077619120'),
                '_blank'
                ,'noopener,noreferrer'
            );
        
        openSpy.mockRestore();
    });

    it('uses the correct internal routing path for the B1/B2 service link', () => {

        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        const b1b2Link = screen.getByRole('link', { name: /^b-1\/b-2 tourist visa$/i });

        expect(b1b2Link).toHaveAttribute('href', '/services/b1-b2-visa');
    });
});