import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import is from 'is_js'
import {auth} from '../../store/actions/auth';
import {connect} from 'react-redux';
import { localState } from './AuthLocalState';

class Auth extends Component {

    state = localState;

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    registrHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if(!validation){
            return true
        }

        let isValid = true;

        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email){
            isValid = is.email(value) && isValid
        }

        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            const {type, value, valid, touched, errorMessage, validation, label} = control;
            return (
                <Input 
                    key={controlName + index}
                    type={type}
                    value={value}
                    valid={valid}
                    touched={touched}
                    errorMessage={errorMessage}
                    shouldValidation={!!validation}
                    label={label}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }


    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        
                        {this.renderInputs()}

                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>

                        <Button
                            type="primary"
                            onClick={this.registrHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)