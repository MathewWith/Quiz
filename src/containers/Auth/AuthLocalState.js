export const localState = {
    isFormValid: false,
    formControls: {
        email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'Введите корректный email',
            valid: false,
            touched: false,
            validation: {
                required: true,
                email: true
            } 
        },
        password: {
            value: '',
            type: 'password',
            label: 'Password',
            errorMessage: 'Введите корректный password',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 6
            }
        }
    }
}