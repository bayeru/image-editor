import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toolbar from '@/components/Editor/Toolbar';

describe('Toolbar', () => {
	test('Toolbar component renders correctly', () => {
		const onReset = jest.fn();
		const onDownload = jest.fn();
		render(<Toolbar onReset={onReset} onDownload={onDownload} />);
		const resetButton = screen.getByTitle('Reset');
		const downloadButton = screen.getByTitle('Download');
		expect(resetButton).toBeInTheDocument();
		expect(downloadButton).toBeInTheDocument();
	});

	test('Toolbar component calls onReset and onDownload functions when buttons are clicked', async () => {
		const onReset = jest.fn();
		const onDownload = jest.fn();
		render(<Toolbar onReset={onReset} onDownload={onDownload} />);
		const resetButton = await screen.findByTitle('Reset');
		const downloadButton = await screen.findByTitle('Download');
		await act(async () => {
			await userEvent.click(resetButton);
		});
		await act(async () => {
			await userEvent.click(downloadButton);
		});
		expect(onReset).toHaveBeenCalledTimes(1);
		expect(onDownload).toHaveBeenCalledTimes(1);
	});
});
