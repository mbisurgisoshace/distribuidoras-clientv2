import React from 'react';
import { AuthProvider } from './features/Auth/AuthProvider';

import Shell from './layouts/Shell';

function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}

export default App;
