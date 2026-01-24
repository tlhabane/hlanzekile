import { FormData } from '@/types';

export const getValidatedFormData = (formData: FormData) => {
    return Object.entries(formData).reduce((acc, [key, data]) => {
        acc[key] = data.value
        return acc;
    } , {} as Record<string, any>);
};