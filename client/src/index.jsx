import React from 'react';
import { render } from 'react-dom';
import './styles/styles.css';

const App = () => (
  <div className="container">
    <h1>Сборка автоматизации под стек MERN (01.2021)</h1>
  </div>
);

render(<App />, document.getElementById('app'));
