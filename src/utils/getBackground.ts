import { prominent } from 'color.js';
import { Background } from 'models/common';
import tinycolor from 'tinycolor2';

export default function getBackground(poster_path: string ) {
    const background: Background = {} as Background;

    return prominent(poster_path, { group: 20 }).then((prominents) => {
        const color = `rgb(${prominents[0].toString()})`;
        const isDark = tinycolor(color).isDark();
        background.color = prominents[0].toString();
        background.isDark = isDark;
        return background;
    });
}
