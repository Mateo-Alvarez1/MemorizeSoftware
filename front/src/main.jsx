import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster richColors />
      <Suspense>
        <Router />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
