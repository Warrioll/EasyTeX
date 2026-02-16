import '@mantine/core/styles.css';
import './global.css';

import { ErrorBoundary } from 'react-error-boundary';
import { MantineProvider } from '@mantine/core';
import ErrorPage from './pages/Error/ErrorPage';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Router />
      </ErrorBoundary>
    </MantineProvider>
  );
}
