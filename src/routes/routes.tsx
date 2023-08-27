import { Navigate, Route, createRoutesFromElements } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import Editor from '@/pages/Editor';
import Home from '@/pages/Home';
import { loader as homeLoader } from '@/loaders/home-loader';
import { loader as editorLoader } from '@/loaders/editor-loader';
import Error from '@/components/Error';
import { queryClient } from "@/common/query-client";

export const routes = createRoutesFromElements(
	<>
		<Route path="/" element={<MainLayout />} errorElement={<Error />}>
			<Route path="/" element={<Navigate to="/images?page=1" replace={true} />} />
			<Route path="/images" element={<Home />} loader={homeLoader(queryClient)} />
			<Route path="/images/:imageId/edit" element={<Editor />} loader={editorLoader(queryClient)} />
		</Route>
	</>
);