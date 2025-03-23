'use client';

import { Button, Space, Stack, Text, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useAuthStore } from '@/stores/auth/AuthStore'
import { User } from "@/types/User";

export default function Login() {
  const [apiKey, setApiKey] = useState<string>();
  const auth = useAuthStore();

  const doLogin = async () => {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application-json',
      },
      body: JSON.stringify({
        apiKey: apiKey,
      }),
    }).then(r => {
      // TODO: handle 500 --> invalid key
      return r.json();
    }).catch(err => {
      notifications.show({
        title: 'Failed to log in',
        message: 'Try again with the correct API key.',
        color: 'red',
      });
    });
    if (!response) return;

    console.table(response.data);
    auth.setUser(response.data as User);
    notifications.show({
      title: 'Success!',
      message: `Logged in as ${response.data.fullName}.`,
    });
  }

  const doLogout = async () => {
    const response = await fetch('/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application-json',
      },
    }).then(r => {
      // TODO: handle 500 --> invalid key
      return r.json();
    }).catch(err => {
      notifications.show({
        title: 'Failed to log out',
        message: 'This shouldn\'t happen. Try again!',
        color: 'red',
      });
    });
    if (!response) return;

    auth.resetUser();
    notifications.show({
      title: 'Success!',
      message: `Logged out.`,
    });
  }

  if (auth.user) {
    return (<Stack>
        <Text>Logged in as {auth.user.fullName}!</Text>
        <Button onClick={async (event) => {
          event.preventDefault();
          await doLogout();
        }}>Log out</Button>
      </Stack>
    );
  }
  return (<Stack>
    <Title>Login</Title>
    <Space />
    <TextInput
      type="password"
      onChange={(value) => setApiKey(value.currentTarget.value)}
      label="API Key" autoComplete="current-password" />

    <Button onClick={async (event) => {
      event.preventDefault();
      await doLogin();
    }}>Log in</Button>
  </Stack>);
}
