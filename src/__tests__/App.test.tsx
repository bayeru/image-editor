import { act, render, screen } from '@testing-library/react';
import { queryClient, routes } from '@/App';
import {  RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from "@tanstack/react-query";
import "fake-indexeddb/auto";
import userEvent from "@testing-library/user-event";

describe('App', () => {

	global.scrollTo = jest.fn()

	const router = createMemoryRouter(routes, {
		initialEntries: ['/', '/images', '/images?page=1'],
		initialIndex: 2,
	});

	test('Renders items for the given route', async () => {

		render(
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		);

		// verify page content for default route
		const items = await screen.findAllByText(/alejandro/i);
		expect(items[0]).toBeInTheDocument();

	});

	test('Renders pagination', async () => {

		render(
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		);
		
		const pagination = await screen.findByRole('navigation');
		expect(pagination).toBeInTheDocument();

	});

	test('Page has 30 items', async () => {
		
		render(
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		);

		const items = await screen.findAllByRole('img');
		expect(items.length).toBe(30);

	});

	test('Can goto page 2', async () => {

		const router = createMemoryRouter(routes, {
			initialEntries: ['/', '/images', '/images?page=1'],
			initialIndex: 2,
		});
		
		render(
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		);

		const page2 = await screen.findByLabelText('Go to page 2');
		await act(async () => {
			await userEvent.click(page2);
		});

		// Verify page content with author name
		const items = await screen.findAllByText(/tony/i);
		expect(items[0]).toBeInTheDocument();

	});

	test('Clicking on an image takes you to the editor', async () => {
		
		render(
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		);

		const item = (await screen.findAllByText(/alejandro/i))[0];
		await act(async () => {
			await userEvent.click(item);
		});

		const editorImage = await screen.findByAltText('Edit');
		expect(editorImage).toBeInTheDocument();

	});

});
