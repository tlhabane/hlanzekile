import React, { useCallback, useState } from 'react';
import { ChevronRight, Check, RotateCcw } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { getValidatedFormData, useFormValidation, useSendHttpRequest, type RequestMethod } from '@/services';
import { FormData, FormState } from '@/types';

const initFormInput: FormData = {
    email: {
        value: '',
        error: '',
        type: 'email',
        required: true
    }
};

export const NewsletterSignupForm: React.FC = () => {
    const [formData, setFormData] = useState(initFormInput);
    const [formState, setFormState] = useState<FormState>('pending');

    const handleDataInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                error: '',
                value
            }
        }))
    };

    const validateForm = useFormValidation();
    const sendHttpRequest = useSendHttpRequest();

    const handleSubmit = useCallback( async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { updatedFormData, isValid } = validateForm(formData);
        if (isValid) {
            try {
                setFormState('submitting');

                const httpRequestConfig = {
                    method: 'POST' as RequestMethod,
                    url: '/subscribe',
                    body: getValidatedFormData(formData)
                };
                await sendHttpRequest(httpRequestConfig);

                setFormState('successful');
                setFormData(initFormInput);
                setTimeout(() => {
                    setFormState('pending');
                }, 30000);
            } catch (error: any) {
                setFormState('error');
            }
            return;
        }

        setFormData(updatedFormData);
    }, [formData, sendHttpRequest, validateForm]);

    let buttonClass = 'bg-brand-blue';
    let buttonHoverClass = 'bg-blue-900';
    if (formState === 'submitting' || formState === 'successful') {
        buttonClass = 'bg-brand-green cursor-not-allowed';
        buttonHoverClass = 'bg-green-900';
    } else if (formState === 'error') {
        buttonClass = 'bg-red-600 cursor-not-allowed';
        buttonHoverClass = 'bg-red-700';
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">


                <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Stay Updated with Hlanzekile</h3>
                    <p className="text-slate-600">
                        Join our mailing list to get the latest updates on cleanup events, upcycling projects,
                        and success stories.
                    </p>
                </div>
                <div className="md:w-1/2 w-full flex flex-col">
                    {formState === 'error' && (
                        <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Oops!</p>
                            <p className="mb-2">An error occurred while processing your request.</p>
                            <button
                                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm text-bold text-red-700 bg-red-200 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                onClick={() => setFormState('pending')}>
                                <RotateCcw size={16} /> Try again
                            </button>
                        </div>
                    )}
                    {formState !== 'error' && (
                        <>
                            <div className="w-full">
                                <form className="relative" onSubmit={handleSubmit} noValidate>
                                    <input
                                        type={formData.email.type}
                                        name="email"
                                        defaultValue={formData.email.value}
                                        onChange={handleDataInputChange}
                                        placeholder="Enter your email address"
                                        className={`w-full pl-6 pr-14 py-4 rounded-full border border-${formData.email.error.trim() === '' ? 'slate-300' : 'red-600'} focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none bg-white shadow-sm`}
                                        required={formData.email.required}
                                    />
                                    <button
                                        type="submit"
                                        className={`absolute right-2 top-2 bottom-2 aspect-square ${buttonClass} text-white rounded-full hover:${buttonHoverClass} transition flex items-center justify-center shadow-md`}
                                        aria-label="Sign Up"
                                        disabled={formState !== 'pending'}
                                    >
                                        {formState === 'pending' && <ChevronRight size={24}/>}
                                        {formState === 'successful' && <Check size={24}/>}
                                        {formState === 'submitting' && <Spinner/>}
                                    </button>
                                </form>
                            </div>
                            <div
                                className={`w-full transition-opacity duration-1000 opacity-${formData.email.error.trim() === '' ? '0' : '100'}`}>
                                <label className="text-red-600 text-sm px-6 py-1">{formData.email.error.trim()}</label>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}