import { useCallback } from 'react';
import { getValidationMessage } from './validation-messages';
import { FormInput } from '@/types';

export const useFormInputValidation = () => {
    /**
     * Email validation
     *
     * @param {string} emailAddress
     * @return {boolean}
     */
    const isEmailAddressValid = (emailAddress: string): boolean => {
        const regExp =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(String(emailAddress).toLowerCase());
    };

    /**
     * Telephone number validation
     *
     * @param {string} telephoneNum
     * @return {boolean}
     */
    const isTelNumberValid = (telephoneNum: string): boolean => {
        const regExp = /^[+]?(1-|1\s|1|\d{3}-|\d{3}\s|)?((\(\d{3}\))|\d{3})(-|\s)?(\d{3})(-|\s)?(\d{4})$/g;
        return regExp.test(String(telephoneNum).toLowerCase());
    };

    return useCallback((input: FormInput) => {
        const updatedInputProps = { ...input, error: '' };
        const { value, required, type } = input;

         let isValid = true;

        if ((value === undefined || value === null || String(value).trim() === '') && required) {
            updatedInputProps.error = getValidationMessage('required');
            isValid = false;
        } else if (type === 'email' && !isEmailAddressValid(String(value)) && required) {
            updatedInputProps.error = getValidationMessage('invalidEmail');
            isValid = false;
        } else if (type === 'tel' && !isTelNumberValid(String(value)) && required) {
            updatedInputProps.error = getValidationMessage('invalidTel');
            isValid = false;
        }

        return { updatedInputProps, isValid };
    }, [])
}