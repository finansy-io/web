import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from './providers/RouterProvider.tsx';
import {QueryClientProvider} from './providers/QueryClientProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider>
		<RouterProvider />
	</QueryClientProvider>,
);
