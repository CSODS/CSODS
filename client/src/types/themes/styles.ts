export type Opacity = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
export type TranslucentSelector = `translucent-${Opacity}`;

export type LightColor = 'light-1' | 'light-2' | 'light-3';
export type NeutralColor = 'neutral-1' | 'neutral-2';
export type DarkColor = 'dark-1' | 'dark-2' | 'dark-3' | 'dark-4';

export type ColorScheme = 'default' | 'frost' | 'utility';

type DefaultColor = 
    | 'white'
    | 'light-grey'
    | 'grey'
    | 'green'
    | 'grey-blue'
    | 'dark-grey-blue'
    | 'dark-purple'
    | 'black'
    | 'mulled-wine';

type FrostColor = 
    | 'light-azure'
    | 'pastel-gray-azure'
    | 'azure'
    | 'nile-blue'
    | 'midnight'
    | 'dark-purple';

type UtilityColor =
    | 'error'
    | 'alert'
    | 'alert-subtle'
    | 'notify'
    | 'success';

export type Color =  LightColor | NeutralColor | DarkColor | DefaultColor | FrostColor | UtilityColor;

export type BtnSelector = `btn-${Color}`;
export type ColorSelector = `color-${Color}`;
export type ProjectCardSelector = `project-card-${Color}`;

export type HoverSelector = 'hover-invert' | 'hover-lighten' | 'hover-darken';

type BorderAdditive = 'border-top' | 'border-start' | 'border-bottom' | 'border-end';
type BorderSubtractive = (
    'border-top-0' | 'border-start-0' | 'border-bottom-0' | 'border-end-0'
);
type BorderWidth = 'border-1' | 'border-2' | 'border-3' | 'border-4' | 'border-5';
type BorderRadius = (
    'rounded' | 'rounded-top' | 'rounded-start' | 'rounded-bottom' | 'rounded-end'
);
type BorderSize = (
    'rounded-0' | 'rounded-1' | 'rounded-2' | 'rounded-3' | 'rounded-4' | 'rounded-5' | 
    'rounded-circle' | 'rounded-pill'
);
type BorderColor = `border-${Color}`;

export type BorderSelector = (
    BorderAdditive | 
    BorderSubtractive | 
    BorderWidth | 
    BorderRadius | 
    BorderSize |
    BorderColor 
);

export type CssSelector = (
    TranslucentSelector |
    BtnSelector | 
    ColorSelector | 
    ProjectCardSelector | 
    BorderSelector | 
    HoverSelector
);