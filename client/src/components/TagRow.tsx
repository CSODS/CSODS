import { Color, Opacity } from '@/types';

export interface ITagProps {
    TagList: string[];
    BackgroundColor: Color;
    TextColor: Color;
    Opacity: Opacity;
}

export default function TagRow({
    TagList,
    BackgroundColor,
    TextColor,
    Opacity
}: ITagProps) {
    const btnSelector = `btn-${BackgroundColor}`;
    const colorSelector = `color-${TextColor}`;
    const opacitySelector = `translucent-${Opacity}`;
    
    const selectorList = [
        btnSelector,
        colorSelector,
        opacitySelector
    ];

    const selectors = selectorList.join(' ');

    return(
        <div className="px-2 mt-2 row w-100">
            <div className="col d-flex flex-wrap align-items-start">
                {
                    TagList.map((tag, index) => {
                        return (
                            <div key={`tag-${index}`} className={`mt-1 py-1 px-3 ms-0 me-2 btn rounded-pill fs-xs ${selectors}`}>
                                {tag}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}