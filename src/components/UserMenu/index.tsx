import {
    Avatar,
    createStyles,
    Flex,
    Group,
    Menu,
    ScrollArea,
    Switch,
    Text,
    ThemeIcon,
    UnstyledButton,
    useMantineColorScheme,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconCheck, IconChevronRight, IconLogout, IconMoonStars, IconSun } from '@tabler/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SCOPE_KEY, USER_STORAGE_KEY } from '../../constants';
import { setCurrentScope } from '../../store/currentScope';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initialUserState, setUser } from '../../store/user.slice';
import { EntityObj } from '../../types';

const useStyles = createStyles((theme) => ({
    userButton: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    },
}));

const UserMenu = () => {
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();
    const { user, scope } = useAppSelector((state) => state.user);
    const currentScope = useAppSelector((state) => state.currentScope);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { classes, theme } = useStyles();
    const [opened, setOpened] = useState(false);
    const dark = colorScheme === 'dark';
    const [, , removeStoredUser] = useLocalStorage({
        key: USER_STORAGE_KEY,
    });
    const [, setSavedScope] = useLocalStorage<EntityObj>({
        key: SCOPE_KEY,
    });

    const onLogout = () => {
        removeStoredUser();
        appDispatch(setUser({ ...initialUserState, isInitialized: true }));
        appDispatch(setCurrentScope({ name: '', id: '' }));
    };
    const onScopeClick = ({ name, id }: { name: string; id: string }) => {
        appDispatch(setCurrentScope({ name, id }));
        setSavedScope({ name, id });
        if (location.pathname.split('/').length === 3) {
            navigate('/');
        }
    };

    const renderScopes = () =>
        scope.map(({ name, id }) => (
            <Menu.Item
                onClick={() => onScopeClick({ name, id })}
                disabled={id === currentScope.id}
                rightSection={
                    id === currentScope.id && (
                        <ThemeIcon size="sm" variant="light">
                            <IconCheck />
                        </ThemeIcon>
                    )
                }
                key={id}
            >
                {name}
            </Menu.Item>
        ));

    return (
        <Group position="center">
            <Menu withArrow shadow="md" width={200} offset={-6} onChange={setOpened}>
                <Menu.Target>
                    <UnstyledButton className={classes.userButton}>
                        <Group>
                            <Avatar radius="xl" size="md" />
                            <Flex direction="column">
                                <Text size="sm" weight={500} truncate maw={150}>
                                    {user.userName ?? user.name}
                                </Text>
                                <Text color="dimmed" size="xs" truncate maw={150}>
                                    {user.role}
                                </Text>
                            </Flex>
                            <IconChevronRight
                                size={16}
                                style={{
                                    transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                                    transition: 'transform 200ms ease',
                                }}
                            />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>{`Toggle ${dark ? 'light' : 'dark'} theme`}</Menu.Label>
                    <Menu.Label>
                        <Switch
                            onChange={() => toggleColorScheme()}
                            color="dark"
                            onLabel={<IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />}
                            offLabel={<IconMoonStars size={16} stroke={2.5} color={theme.colors.blue[6]} />}
                        />
                    </Menu.Label>
                    <Menu.Divider />
                    <Menu.Label>Switch to</Menu.Label>
                    <ScrollArea type="always">{renderScopes()}</ScrollArea>

                    <Menu.Divider />
                    <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={() => onLogout()}>
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
};

export default UserMenu;
