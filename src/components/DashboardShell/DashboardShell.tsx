import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardHeader } from './DashboardHeader';
import { DashboardNavbar } from './DashboardNavbar';

export const DashboardShell = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={<DashboardNavbar open={navbarOpen} onNavbarClose={() => setNavbarOpen(false)} />}
            header={<DashboardHeader navbarOpen={navbarOpen} onBurgerMenuClick={() => setNavbarOpen(!navbarOpen)} />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <Outlet />
        </AppShell>
    );
};
