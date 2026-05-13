import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/* Global Styles — order matters */
import './styles/variables.css';
import './styles/reset.css';
import './styles/animations.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
