import React from 'react';
import { FormState } from '@/types';

interface Props extends React.HTMLProps<HTMLButtonElement> {
    formState: FormState;
}

export const ErrorNotice: React.FC<Props> = ({ formState, onClick }) => (
    <div
        className={`w-full transition-opacity mb-10 duration-1000 opacity-${formState === 'error' ? '100' : '0 hidden'}`}>
        <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold px-2">Oops!</p>
            <p className="px-2">An error occurred while processing your request. Please try again.</p>
            <hr className="border-red-300 mt-3 mb-3" />
            <button
                className="flex items-center justify-center gap-2 py-2 px-2 rounded-lg text-sm text-bold text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={onClick}>
                Dismiss
            </button>
        </div>
    </div>
);