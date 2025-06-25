import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';

// تهيئة المديرين
import LinkManager from './core/linking/LinkManager';
LinkManager.getInstance().loadLinks();

import DatabaseEngine from './core/database/DatabaseEngine';
DatabaseEngine.getInstance().loadDatabase('default');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);