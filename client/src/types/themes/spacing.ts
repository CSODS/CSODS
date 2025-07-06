export type spacing = 0 | 1 | 2 | 3 | 4 | 5;
export type breakpoint = 'sm' | 'md' | 'lg' | 'xl';
export interface spacingSettings {
    breakpoint?: breakpoint;
    x?: spacing;
    y?: spacing;
    s?: spacing;
    e?: spacing;
    t?: spacing;
    b?: spacing;   
}

export interface marginSettings extends spacingSettings {
    m?: spacing;
}

export interface paddingSettings extends spacingSettings {
    p?: spacing;
}