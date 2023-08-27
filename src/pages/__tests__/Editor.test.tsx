import { act, fireEvent, render, screen } from '@testing-library/react';
import { queryClient, routes } from '@/App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import 'fake-indexeddb/auto';
import userEvent from '@testing-library/user-event';

describe('Editor', () => {
	global.scrollTo = jest.fn();

	const router = createMemoryRouter(routes, {
		initialEntries: ['/images/0/edit'],
		initialIndex: 0,
	});

	test('Renders the editor page', async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		);

		// verify page content for default route
		const items = await screen.findAllByText(/alejandro/i);
		expect(items[0]).toBeInTheDocument();
	});

	test('Renders sidebar', async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		);

		const greyscale = await screen.findByRole('checkbox', { name: 'Greyscale' });
		expect(greyscale).toBeInTheDocument();

		const blur = await screen.findByTestId('blur-slider');
		expect(blur).toBeInTheDocument();
	});

	test('User can change the image width and height', async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		);

		const width = await screen.findByLabelText('Width');
		expect(width).toBeInTheDocument();
		await act(async () => {
			await userEvent.clear(width);
		});

		const height = await screen.findByLabelText('Height');
		expect(height).toBeInTheDocument();

		await act(async () => {
			await userEvent.clear(height);
		});

		await act(async () => {
			await userEvent.type(width, '100');
		});

		await act(async () => {
			await userEvent.type(height, '100');
		});

		expect(width).toHaveValue(100);
		expect(height).toHaveValue(100);
	});

	test('User can change the greyscale', async () => {

		render(
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		);

		const greyscale = await screen.findByRole('checkbox', { name: 'Greyscale' });
		expect(greyscale).toBeInTheDocument();

		await act(async () => {
			await userEvent.click(greyscale);
		});

		expect(greyscale).toBeChecked();
	});

	test('User can change the blur', async () => {

		render(
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		);

		const blur = await screen.findByTestId('blur-slider');
		const rangeInput = blur.querySelector('input[type="range"]') as HTMLInputElement;

		await act(async () => {
			await fireEvent.change(rangeInput, { target: { value: 5 } });
		});

		expect(rangeInput).toHaveValue('5');
	});
});
