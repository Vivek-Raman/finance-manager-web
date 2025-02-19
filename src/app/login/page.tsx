'use client';

import { Button, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export default function Login() {
  const [apiKey, setApiKey] = useState<string>();

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
    });
    console.table(response.data);
    notifications.show({
      title: 'Success!',
      message: `Logged in as ${response.data.fullName}.`,
    });
  }

  return (<>
    <div>Login</div>
    <TextInput
      type="password"
      value={apiKey}
      onChange={(value) => setApiKey(value.currentTarget.value)}
      label="API Key" autoComplete="current-password" />

    <Button onClick={async (event) => {
      event.preventDefault();
      await doLogin();
    }} />
  </>);
}
