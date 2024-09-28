import { Box, NavLink } from '@mantine/core';
import { IconBuildingStore, IconDashboard, IconGitCompare, IconReceipt } from '@tabler/icons';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
    const location = useLocation();

    const isActiveLink = (path: string) => {
        const pathArray = location.pathname.split('/');
        const lastPath = pathArray[pathArray.length - 1];
        return lastPath === path;
    };

    return (
        <Box py="md">
            <NavLink
                variant="filled"
                icon={<IconDashboard />}
                component={RouterNavLink}
                label="Dashboard"
                to="."
                active={isActiveLink('')}
            />
            <NavLink
                variant="filled"
                icon={<IconReceipt />}
                component={RouterNavLink}
                label="Sales"
                to="./sales"
                active={isActiveLink('sales')}
            />
            <NavLink
                variant="filled"
                icon={<IconBuildingStore />}
                component={RouterNavLink}
                label="Shops"
                to="./shops"
                active={isActiveLink('shops')}
            />
            <NavLink
                variant="filled"
                icon={<IconGitCompare />}
                component={RouterNavLink}
                label="Compare"
                to="./compare"
                active={isActiveLink('compare')}
            />
        </Box>
    );
};

export default NavigationMenu;
