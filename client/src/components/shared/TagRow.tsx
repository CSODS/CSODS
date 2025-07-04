
import { BtnSelector, Color, ColorSelector, CssSelector, HoverSelector, Opacity, TranslucentSelector } from '@/types';
import Button from './Button';

export interface ITagProps {
    TagList: string[];
    BackgroundColor: Color;
    TextColor: Color;
    Opacity: Opacity;
    OnHover: HoverSelector;
}

export default function TagRow({
    TagList,
    BackgroundColor,
    TextColor,
    Opacity,
    OnHover
}: ITagProps) {
    const btnSelector: BtnSelector = `btn-${BackgroundColor}`;
    const hoverSelector: HoverSelector = OnHover;
    const colorSelector: ColorSelector = `color-${TextColor}`;
    const opacitySelector: TranslucentSelector = `translucent-${Opacity}`;
    
    const selectorList: (CssSelector | string)[] = [
        'mt-1 py-1 px-3 ms-0 me-2 btn rounded-pill fs-xs',
        btnSelector,
        hoverSelector,
        colorSelector,
        opacitySelector
    ];

    const selectors = selectorList.join(' ');

    return(
        <div className="px-2 mt-2 row w-100">
            <div className="col d-flex flex-wrap align-items-start">
                {
                    TagList.map((tag, index) => {
                        const key = `tag-${index}`
                        return (
                            <Button selectorList={selectorList} componentKey={key}>
                                <p className='p-0 m-0 text-start'>
                                    {tag}
                                </p>
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    )
}