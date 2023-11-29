import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ModeToggle } from '../components/forms/ModeToggle';


// Mock the useTheme hook
jest.mock('../components/forms/ModeToggle', () => ({
    useTheme: () => ({
        setTheme: jest.fn(),
    }),
}));

describe('ModeToggle component', () => {
    it('renders without crashing', () => {
        render(<ModeToggle />);
        // You can add more specific assertions here based on your component's structure
        expect(screen.getByText('Toggle theme')).toBeInTheDocument();
    });

    it('handles theme toggle', () => {
        render(<ModeToggle />);
        const lightOption = screen.getByText('Light');
        const darkOption = screen.getByText('Dark');
        const systemOption = screen.getByText('System');

        fireEvent.click(screen.getByText('Toggle theme'));

        expect(lightOption).toBeInTheDocument();
        expect(darkOption).toBeInTheDocument();
        expect(systemOption).toBeInTheDocument();

        fireEvent.click(lightOption);
        expect(useTheme.setTheme).toHaveBeenCalledWith('light');

        fireEvent.click(darkOption);
        expect(useTheme.setTheme).toHaveBeenCalledWith('dark');

        fireEvent.click(systemOption);
        expect(useTheme.setTheme).toHaveBeenCalledWith('system');
    });
});
