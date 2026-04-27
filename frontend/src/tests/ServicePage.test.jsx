import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ServicePage from '@/pages/ServicePage';

describe('ServicePage Component', () => {

    it('fetches the text file and displays it', async () => {

        const fakeFileContent = "This is a fake B1/B2 description for testing purposes.";

        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            headers: {
                get: () => 'text/plain'
            },
            text: () => Promise.resolve(fakeFileContent)
        });

        render(
            <MemoryRouter initialEntries={['/services/b1-b2-visa']}>
                <Routes>
                    <Route path="/services/:serviceId" element={<ServicePage />} />
                </Routes>
            </MemoryRouter>
        );

        const loadedText = await screen.findByText(fakeFileContent);
        expect(loadedText).toBeInTheDocument();
        expect(fetchSpy).toHaveBeenCalled();
        fetchSpy.mockRestore();
    });
});