import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext.jsx';
import { router } from './router.jsx';

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}
