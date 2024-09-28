import { useTheme } from '@emotion/react';
import { Drawer, Navbar } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import NavigationMenu from '../NavigationMenu';

type DashboardNavbarProps = {
    open: boolean;
    onNavbarClose: () => void;
};

export const DashboardNavbar = ({ open, onNavbarClose }: DashboardNavbarProps) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`, true, {
        getInitialValueInEffect: false,
    });
    return (
        <>
            <Drawer hidden={!isSmallScreen} opened={open} onClose={onNavbarClose} title="Menu" padding="xl" size="md">
                <NavigationMenu />
            </Drawer>
            <Navbar hiddenBreakpoint="sm" hidden={isSmallScreen} width={{ sm: 250, lg: 300 }} p="md">
                <Navbar.Section>
                    <NavigationMenu />
                </Navbar.Section>
            </Navbar>
        </>
    );
};
