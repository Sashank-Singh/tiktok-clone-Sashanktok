import React from 'react';
import Main from './components/Main';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Popreel</h1>
      </header>
      <Main />
    </div>
  );
};

export default App;
