import { describe, expect, test } from 'vitest'; 
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CarList from './components/CarList';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: false }
	}
});

const wrapper = ({children}: {children: React.ReactNode}) => (
	<QueryClientProvider client={queryClient}>
		{children}
	</QueryClientProvider>
);

describe(
	'CarList tests',
	() => {
		test(
			'component renders',
			() => {
				render(<CarList/>, {wrapper});
				expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
			}
		),
		test(
			'cars are fetched',
			async () => {
				render(<CarList/>, {wrapper});
				await waitFor(() => screen.getByText(/Add Car/i));
				expect(screen.getByText(/Ford/i)).toBeInTheDocument();
			}
		),
		test(
			'Open new car modal',
			async () => {
				render(<CarList/>, {wrapper});
				await waitFor(() => screen.getByText(/Add Car/i));
				await userEvent.click(screen.getByText(/Add Car/i));
				expect(screen.getByText(/Save/i)).toBeInTheDocument();
			}
		)
	}
);