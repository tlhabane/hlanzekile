import React from 'react';

export const CustomBar = (props: any) => {
    const { x, y, width, height, index } = props;
    // Use brand blue for even months, green for odd months for visual rhythm
    const color = index % 2 === 0 ? '#003366' : '#009B4D';
    return <rect x={x} y={y} width={width} height={height} fill={color} ry={width / 12} />;
};