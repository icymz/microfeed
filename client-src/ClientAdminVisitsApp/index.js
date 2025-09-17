import React from 'react';
import { createRoot } from 'react-dom/client';
import VisitsApp from './components/VisitsApp';

const mount = document.getElementById('react-root') ||
              document.getElementById('admin-app-root') ||
              document.getElementById('root');

const root = createRoot(mount || document.body.appendChild(document.createElement('div')));
root.render(<VisitsApp />);