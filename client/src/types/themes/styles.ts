export type Opacity = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

export type LightColor = 'light-1' | 'light-2' | 'light-3';
export type NeutralColor = 'neutral-1' | 'neutral-2';
export type DarkColor = 'dark-1' | 'dark-2' | 'dark-3' | 'dark-4';

export type Color =  LightColor | NeutralColor | DarkColor;

export type BtnSelectors = `btn-${Color}`;
export type ColorSelectors = `color-${Color}`;
export type ProjectCardSelectors = `project-card-${Color}`;

export type OnHover = 'invert' | 'lighten' | 'darken';

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

export type BorderSelectors = (
    BorderAdditive | BorderSubtractive | BorderWidth | BorderRadius | BorderSize
);

export type Selectors = (
    Opacity | LightColor | NeutralColor | DarkColor | Color | BorderSelectors | BtnSelectors | 
    ColorSelectors | ProjectCardSelectors | OnHover
);