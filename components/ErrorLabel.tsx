import React from 'react';

export const ErrorLabel: React.FC<{ message: string }> = ({ message }) => (
    <div
        className={`w-full transition-opacity duration-1000 opacity-${message.trim() === '' ? '0' : '100'}`}>
        <label className="text-red-600 text-sm py-1">{message.trim()}</label>
    </div>
);