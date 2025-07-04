
import { CssSelector } from '@/types';
import Button from './Button';

export interface BtnGroupProps {
    TagList: string[];
    btnSelectors: (CssSelector | string)[];
    colSelectors: (CssSelector | string)[];
}

export default function BtnGroup({
    TagList,
    btnSelectors,
    colSelectors
}: BtnGroupProps) {
    const colSelectorsStr = colSelectors.join(' ');

    return(
        <div className="px-2 mt-2 row w-100">
            <div className={colSelectorsStr}>
                {
                    TagList.map((tag, index) => {
                        const key = `tag-${index}`
                        return (
                            <Button selectorList={btnSelectors} componentKey={key}>
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