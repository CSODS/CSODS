import React from "react";
import { CustomVoidElementProps } from "@/types";
import { getBootstrapSpacing } from "@/utils";

interface RadioBtnProps extends CustomVoidElementProps {
    onRadioBtnChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    defaultChecked?: true | undefined;
}

export function RadioBtnPill({
    componentId,
    componentValue,
    componentName,
    onRadioBtnChange,
    defaultChecked,
    bgColor,
    flex,
    justify,
    align,
    margin,
    padding,
    hoverBehavior,
    border = { width: 0 },
    opacity = 100
}: RadioBtnProps) {
    const btnVariant = bgColor ? `btn btn-${bgColor}` : `btn`;
    const btnMargin = margin?.map((margin) => getBootstrapSpacing({ marginSettings: margin }).join(' ')).join(' ') ?? '';
    const btnPadding = padding?.map((padding) => getBootstrapSpacing({ paddingSettings: padding}).join(' ')).join(' ') ?? '';
    const btnFlex = flex ? `d-flex flex-${flex}` : '';
    const justifyContent = justify ? `justify-content-${justify}` : '';
    const alignItems = align ? `align-items-${align}` : '';
    const onHover = hoverBehavior ? `hover-${hoverBehavior}` : '';
    
    const borderWidth = `border-${border?.width ?? 0}`;
    const borderColor = border?.color ? `border-${border.color}` : '';
    const borderStyle = `border ${borderWidth} ${borderColor} rounded-pill`;

    const btnOpacity = `translucent-${opacity ?? 100}`;

    const btnStyleList = [btnVariant, btnMargin, btnPadding, btnFlex, justifyContent, alignItems, onHover, borderStyle, btnOpacity];

    const btnStyle = btnStyleList.join(' ');

    const containerMargin = 'm-0';
    const containerPadding = 'p-0';
    const containerStyleList = [btnFlex, justifyContent, alignItems, containerMargin, containerPadding];
    const containerStyle = containerStyleList.join(' ');
    const backupContainerStyle = "d-flex flex-column m-0 p-0 justify-content-center align-items-center";

    return (
        <div className={containerStyle}>
            <input type="radio" className='btn-check' id={componentId} value={componentValue} name={componentName} autoComplete="off" onChange={onRadioBtnChange} defaultChecked={defaultChecked}/>
            <label className={btnStyle} htmlFor={componentId}>{componentValue}</label>
        </div>
    );
}