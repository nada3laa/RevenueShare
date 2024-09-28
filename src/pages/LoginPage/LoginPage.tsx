import { Button, Center, Group, Image, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useLoginMutation } from '../../api';
import { LoginResponse } from '../../api/types';
import logo from '../../assets/logo.png';
import { USER_STORAGE_KEY } from '../../constants';
import { useAppSelector } from '../../store/hooks';

import { useStyles } from './styles';

const validationSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

export const LoginPage = () => {
    const { token } = useAppSelector((state) => state.user);
    const [, setUser] = useLocalStorage<LoginResponse>({ key: USER_STORAGE_KEY });
    const navigate = useNavigate();
    const { classes } = useStyles();

    const [triggerLogin, { isLoading, isError }] = useLoginMutation();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: zodResolver(validationSchema),
    });

    const login = async () => {
        const formValidation = form.validate();
        if (formValidation.hasErrors) {
            return;
        }

        const response = await triggerLogin(form.values).unwrap();
        setUser(response);
    };

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30} shadow="xl">
                <Center>
                    <Image src={logo} height={200} width="auto" />
                </Center>
                <Title order={2} align="center" mt="md" mb={50} color="primary">
                    Welcome back to {import.meta.env.VITE_CLIENT_NAME} dashboard
                </Title>
                <Stack>
                    <TextInput
                        required
                        label="Username"
                        placeholder="Your username"
                        value={form.values.username}
                        onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                        error={form.errors.username}
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password}
                    />
                </Stack>

                <Group position="apart" mt="xl">
                    <Button fullWidth loading={isLoading && !isError} onClick={() => void login()}>
                        Login
                    </Button>
                </Group>
            </Paper>
        </div>
    );
};
