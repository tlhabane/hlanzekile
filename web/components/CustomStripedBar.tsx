import React from 'react';

const StripedBar = (props: any) => {
    const { x, y, width, height, color = '#003366' } = props;
    return (
        <g>
            <defs>
                <pattern
                    id="stripes"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                >
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="10"
                        style={{ stroke: color, strokeWidth: 6, opacity: 0.8 }}
                    />
                </pattern>
            </defs>
            <rect x={x} y={y} width={width} height={height} fill="#ffffff" ry={width / 12} />
            <rect x={x} y={y} width={width} height={height} fill="url(#stripes)" ry={width / 12} />
        </g>
    );
};

export const CustomStripedBar = (props: any) => {
    const { x, y, width, height, isStriped, color = '#003366' } = props;
    if (isStriped) {
        return StripedBar(props);
    }
    return <rect x={x} y={y} width={width} height={height} fill={color} ry={width / 12} />;
};