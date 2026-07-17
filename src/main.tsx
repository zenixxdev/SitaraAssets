import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAppStore } from './store.ts';
import App from './App.tsx';
import './index.css';

const RootComponent = () => {
  const theme = useAppStore((state) => state.theme);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <StrictMode>
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<RootComponent />);

