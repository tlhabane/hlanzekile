import React, { useCallback, useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { ErrorLabel } from '@/components/ErrorLabel';
import { ErrorNotice } from '@/components/ErrorNotice';
import {
    getValidatedFormData,
    scrollToElement,
    useFormValidation,
    useFormInputValidation,
    useSendHttpRequest,
    type RequestMethod,
} from '@/services';
import { FormData, FormInput, FormState } from '@/types';

const defaultInput: FormInput = {
    value: '',
    error: '',
    type: 'text',
    required: true
};

const initFormData: FormData = {
    name: { ...defaultInput },
    tel: { ...defaultInput, type: 'tel' },
    email: { ...defaultInput, type: 'email' },
    subject: { ...defaultInput, value: 'General Enquiry', required: false },
    message: { ...defaultInput }
}

const Success: React.FC<React.HTMLProps<HTMLButtonElement>> = ({ onClick }) => (
    <div className="w-full flex flex-col md:flex-row justify-center">
        <div className="max-w-xl w-full text-center space-y-8 p-12 animate-fade-in">
            <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center text-white mx-auto shadow-xl">
                <Check size={48} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-brand-blue tracking-tighter mb-4">Message Sent!</h1>
                <p className="text-slate-600 leading-relaxed font-light">
                    Thank you for contacting Hlanzekile, one of stewards will contact you shortly.
                </p>
            </div>
            <button
                onClick={onClick}
                type="button"
                className="inline-block px-10 py-4 bg-brand-blue text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition shadow-lg">
                Send Another Message
            </button>
        </div>
    </div>
);

interface FormProps {
    formData: FormData;
    formInvalid: boolean;
    formState: FormState;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSelect: (e: React.InputEvent<HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Form: React.FC<FormProps> = ({ formData, formInvalid, formState, onBlur, onChange, onSelect, onSubmit }) => (
    <>
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Full Name
                    </label>
                    <input
                        type={formData.name.type}
                        required={formData.name.required}
                        defaultValue={formData.name.value}
                        onBlur={onBlur}
                        onChange={onChange}
                        name="name"
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 bg-slate-50 border border-${formData.name.error.trim() === '' ? 'slate-200' : 'red-600'} rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium`}
                    />
                    <ErrorLabel message={formData.name.error} />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Phone Number
                    </label>
                    <input
                        type={formData.tel.type}
                        defaultValue={formData.tel.value}
                        required={formData.tel.required}
                        onBlur={onBlur}
                        onChange={onChange}
                        name="tel"
                        placeholder="0823219876"
                        className={`w-full px-4 py-3 bg-slate-50 border border-${formData.tel.error.trim() === '' ? 'slate-200' : 'red-600'} rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium`}
                    />
                    <ErrorLabel message={formData.tel.error} />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email Address
                </label>
                <input
                    type={formData.email.type}
                    defaultValue={formData.email.value}
                    required={formData.email.required}
                    onBlur={onBlur}
                    onChange={onChange}
                    name="email"
                    placeholder="sello@example.com"
                    className={`w-full px-4 py-3 bg-slate-50 border border-${formData.tel.error.trim() === '' ? 'slate-200' : 'red-600'} rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium`}
                />
                <ErrorLabel message={formData.email.error} />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Subject
                </label>
                <div className="relative">
                    <select
                        defaultValue={formData.subject.value}
                        required={formData.subject.required}
                        onBlur={onBlur}
                        onSelect={onSelect}
                        name="subject"
                        className={`w-full px-4 py-3 bg-slate-50 border border-${formData.subject.error.trim() === '' ? 'slate-200' : 'red-600'} rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all appearance-none font-medium text-slate-700`}
                    >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Volunteering">Volunteering</option>
                        <option value="Donations">Donations</option>
                        <option value="Partnership Proposal">Partnership Proposal</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
                <ErrorLabel message={formData.subject.error} />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Message
                </label>
                <textarea
                    defaultValue={formData.message.value}
                    required={formData.message.required}
                    onBlur={onBlur}
                    onChange={onChange}
                    name="message"
                    rows={4}
                    placeholder="How can we help you?"
                    className={`w-full px-4 py-3 bg-slate-50 border border-${formData.message.error.trim() === '' ? 'slate-200' : 'red-600'} rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium resize-none`}
                />
                <ErrorLabel message={formData.message.error} />
            </div>

            <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 bg-brand-${(formInvalid || formState === 'submitting') ? 'blue hover:blue cursor-not-allowed' : 'green hover:bg-slate-900'} text-white font-bold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-2`}
                disabled={formInvalid}
            >
                {formState !== 'submitting' && <>{'Send Message'} <ChevronRight size={24} /></>}
                {formState === 'submitting' && <>{'Sending Message'} <Spinner /></>}
            </button>
        </form>
    </>
)



export const ContactForm: React.FC = () => {
    const [formState, setFormState] = useState<FormState>('pending');

    const [formData, setFormData] = useState(initFormData);
    const updateFormData = (name: string, value: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                error: '',
                value
            }
        }))
    };

    const handleDataInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updateFormData(name, value);
    };

    const handleOptionSelect = (e:  React.InputEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget;
        updateFormData(name, value);
    };

    const validateFormInput = useFormInputValidation();
    const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name;
        if (formData[name]) {
            const { updatedInputProps, isValid } = validateFormInput(formData[name]);
            if (!isValid) {
                setFormData((prevState) => ({ ...prevState, [name]: { ...updatedInputProps } }));
            }
        }
    }, [formData, validateFormInput])

    const validateForm = useFormValidation();
    const sendHttpRequest = useSendHttpRequest();

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { updatedFormData, isValid } = validateForm(formData);
        if (isValid) {
            try {
                setFormState('submitting');

                const httpRequestConfig = {
                    method: 'POST' as RequestMethod,
                    url: '/contact',
                    body: getValidatedFormData(formData)
                };
                await sendHttpRequest(httpRequestConfig);

                setFormState('successful');
                setFormData(initFormData);
            } catch (error: any) {
                setFormState('error');
            }
            scrollToElement('form-top');
            return;
        }

        setFormData(updatedFormData);
        scrollToElement('form-top');
    }, [formData, sendHttpRequest, validateForm]);

    const formInvalid = Object.values(formData).some(
        (field) => field.error || (String(field.value).trim() === '' && field.required),
    );

    const handleSendAnother = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFormData(initFormData);
        setFormState('pending');
        scrollToElement('form-top');
    }

    return (
        <>
            {formState === 'successful' && <Success onClick={handleSendAnother} />}
            {formState !== 'successful' && (
                <>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Send us a Message</h2>
                    <ErrorNotice formState={formState} onClick={() => setFormState('pending')} />
                    <Form
                        formData={formData}
                        formInvalid={formInvalid}
                        formState={formState}
                        onBlur={onBlur}
                        onChange={handleDataInputChange}
                        onSelect={handleOptionSelect}
                        onSubmit={handleSubmit}
                    />
                </>
            )}
        </>
    );
};