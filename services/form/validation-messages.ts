export type ValidationMessageKey = 'required' | 'invalidEmail' | 'invalidTel';

export const validationMessages: Record<ValidationMessageKey, string> = {
    required: 'This field is required (cannot be left empty)',
    invalidEmail: 'Invalid email address provided',
    invalidTel: 'Invalid telephone number provided',
}

export const getValidationMessage = (param: ValidationMessageKey = 'required') => {
    if (!validationMessages[param]) {
        throw new Error('Invalid validation message');
    }
    return validationMessages[param];
}