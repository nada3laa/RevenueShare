import { Burger, Flex, Header, Image, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useLocation } from 'react-router-dom';

import logoImage from '../../assets/logo.png';
import { useAppSelector } from '../../store/hooks';
import UserMenu from '../UserMenu/index';

type DashboardHeaderProps = {
    navbarOpen: boolean;
    onBurgerMenuClick: () => void;
};

export const DashboardHeader = ({ onBurgerMenuClick, navbarOpen }: DashboardHeaderProps) => {
    const scope = useAppSelector((state) => state.currentScope);
    const theme = useMantineTheme();
    const location = useLocation();
    const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`, true, {
        getInitialValueInEffect: false,
    });

    const getTitle = () => {
        let title = '';
        const pageName = location.pathname.substring(1);

        title = pageName.length ? pageName : 'Dashboard';

        return title;
    };

    return (
        <Header height={{ base: 70 }}>
            <Flex justify="space-between" align="center" wrap="nowrap">
                <Flex justify="space-between" align="center" p={5}>
                    <Burger
                        hidden={!isSmallScreen}
                        opened={navbarOpen}
                        onClick={() => onBurgerMenuClick()}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                    <Image src={logoImage} width={60} />
                    <Title
                        order={4}
                        truncate
                        maw={300}
                        transform="capitalize"
                        ml={20}
                        color="primary"
                        hidden={isSmallScreen}
                    >
                        {`${scope.name} - ${getTitle()}`}
                    </Title>
                </Flex>
                <UserMenu />
            </Flex>
        </Header>
    );
};
