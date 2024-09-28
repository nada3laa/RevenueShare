import { ColorSchemeProvider, MantineProvider, type ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { RouterProvider } from 'react-router-dom';

import { THEME_STORAGE_KEY } from './constants';
import { AuthProvider } from './context/AuthContext';
import router from './router';
import { clientTheme } from './theme';

const App = () => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: THEME_STORAGE_KEY,
        defaultValue: 'light',
    });
    const toggleColorScheme = () => setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme, ...clientTheme }} withGlobalStyles withNormalizeCSS>
                <NavigationProgress autoReset={true} />
                <NotificationsProvider>
                    <AuthProvider>
                        <RouterProvider router={router} />
                    </AuthProvider>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default App;
