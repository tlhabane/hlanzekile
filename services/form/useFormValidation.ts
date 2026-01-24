import { useCallback } from 'react';
import { useFormInputValidation } from './useFormInputValidation';
import { FormData } from '@/types';

export const useFormValidation = () => {
    /**
     * Validates the formConfig inputs and updates the formConfig state.
     *
     * @param {Record<string, any>} inputProps
     * @return {updatedInputProps: {[p: string]: any}, isValid: boolean} - Returns true if all validations pass, otherwise false.
     */
    const validateFormInput = useFormInputValidation();
    return useCallback((formData: FormData) => {
        let isValid = true;
        const updatedFormData = {} as FormData;

        for (const key in formData) {
            const { updatedInputProps, isValid: inputValid } = validateFormInput(formData[key]);
            updatedFormData[key] = updatedInputProps;
            if (!inputValid) isValid = false;
        }

        return { isValid, updatedFormData };
    }, [validateFormInput]);
};