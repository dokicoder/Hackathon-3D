import React from 'react';
import { createRoot } from 'react-dom/client';
import { TestScene } from './TestScene';
import './main.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <div id="main-container">
      <h2>Wunddokumentation</h2>
      <TestScene />
    </div>
  </React.StrictMode>
);
