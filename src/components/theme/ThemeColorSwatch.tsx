import { ColorSwatch, Group, Switch, useMantineColorScheme, } from "@mantine/core";
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export const ThemeColorSwatch = () => {
  const colors = [
    'red', 'purple', 'green',
  ];

  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const handleColorClicked = (color: string) => {

  }

  const handleColorSchemeClicked = (isDarkMode: boolean) => {
    setColorScheme(isDarkMode ? 'dark' : 'light');
  }

  return (
    <>
      <Group>
        {colors.map((color, index) => <ColorSwatch key={index} onClick={() => handleColorClicked(color)} component="button" color={color} />)}
      </Group>
      <Switch
        size="lg"
        color='dark.4'
        onChange={(event) => handleColorSchemeClicked(event.currentTarget.checked)}
        onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
        offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
     />
    </>
  );
}
