"use client";

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SocketProvider } from './context/SocketContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SocketProvider>
        {children}
      </SocketProvider>
    </Provider>
  );
}
