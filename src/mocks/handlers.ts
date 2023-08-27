import { rest } from 'msw';
import { mockData } from './data/data';

export const handlers = [
	rest.get('https://picsum.photos/v2/list?page=1', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(mockData.slice(0, 30)));
	}),

	rest.get('https://picsum.photos/v2/list?page=2', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(mockData.slice(30, 60)));
	}),
];
