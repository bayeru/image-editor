import { render } from '@testing-library/react';
import ImageViewer from '@/components/Editor/ImageViewer';

const imageUrl = 'https://picsum.photos/id/237/200/300';

describe('ImageViewer', () => {
	test('Renders the image', () => {
		const { getByAltText } = render(<ImageViewer loading={false} imageUrl={imageUrl} />);
		const image = getByAltText('Edit');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', imageUrl);
	});

	test('Displays a circular progress bar', () => {
		const { getByRole } = render(<ImageViewer loading={true} imageUrl={imageUrl} />);
		const spinner = getByRole('progressbar');
		expect(spinner).toBeInTheDocument();
	});

	test('Sets the image opacity to 0.3 when loading is true', () => {
		const { getByAltText } = render(<ImageViewer loading={true} imageUrl={imageUrl} />);
		const image = getByAltText('Edit');
		expect(image).toHaveStyle('opacity: 0.3');
	});

	test('should set the image opacity to 1 when loading is false', () => {
		const { getByAltText } = render(<ImageViewer loading={false} imageUrl={imageUrl} />);
		const image = getByAltText('Edit');
		expect(image).toHaveStyle('opacity: 1');
	});
});
