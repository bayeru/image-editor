import { render, screen } from '@testing-library/react';
import Sidebar from '@/components/Editor/Sidebar';

const mockImage = {
	id: '0',
	width: 750,
	height: 500,
	greyscale: false,
	blur: 0,
	cachedImage: null,
	author: 'Alejandro Escamilla',
};

const onWidthChange = jest.fn();
const onHeightChange = jest.fn();
const onGreyscaleChange = jest.fn();
const onBlurChange = jest.fn();
const onBlurChangeCommitted = jest.fn();

describe('Sidebar', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('Renders the author and id of the image', () => {
		render(
			<Sidebar
				imageState={mockImage}
				onWidthChange={onWidthChange}
				onHeightChange={onHeightChange}
				onGreyscaleChange={onGreyscaleChange}
				onBlurChange={onBlurChange}
				onBlurChangeCommitted={onBlurChangeCommitted}
			/>
		);

		const authorIdText = screen.getByText(`${mockImage.author} - #${mockImage.id}`);
		expect(authorIdText).toBeInTheDocument();
	});

});
