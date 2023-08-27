import { render, screen } from '@testing-library/react';
import App from '@/App';

it('Should render the main layout component', () => {
	render(<App />);
	const linkElement = screen.getByText(/imaged/i);
	expect(linkElement).toBeInTheDocument();
});
