import { DefaultMantineColor, MantineThemeOverride, Tuple } from '@mantine/core';

type ExtendedCustomColors = 'primary' | DefaultMantineColor;

declare module '@mantine/core' {
    export interface MantineThemeColorsOverride {
        colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
    }
}

export const clientTheme: MantineThemeOverride = {
    primaryColor: 'primary',
    primaryShade: 4,
    // Generted via https://omatsuri.app/color-shades-generator
    colors: {
        primary: [
            '#B2E1FF',
            '#57BDFF',
            '#0DA0FF',
            '#0084EB',
            '#0068B3',
            '#004F8D',
            '#003B6A',
            '#002C4F',
            '#00213B',
            '#00192D',
        ],
    },
};
