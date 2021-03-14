import { useState } from 'react';

import TippyWrapper from '../../components/TippyWrapperComponent';
import './UserFormContainer.css';

const allFields = ['firstName', 'lastName', 'email', 'password'];

const UserForm = ({ onSubmit, btnText, defaultValues = {}, isLogIn = false }) => {
    const [tooltips, setTooltips] = useState({});
    const [submitEnabled, setSubmitEnabled] = useState(false);

    const fields = !isLogIn ? allFields : allFields.slice(2);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const form = e.target;
        const newTooltips = {};
        const userObj = {};

        let firstInvalidInput;

        fields.forEach((fieldName) => {
            if (!form[fieldName].value) {
                if (!firstInvalidInput) {
                    firstInvalidInput = form[fieldName];
                }
                newTooltips[fieldName] = 'ველი არ უნდა იყოს ცარიელი';
            } else {
                userObj[fieldName] = form[fieldName].value;
            }
        });

        if (Object.keys(newTooltips).length) {
            setTooltips(newTooltips);
            firstInvalidInput.closest('div').scrollIntoView({ behavior: 'smooth' });
        } else {
            onSubmit(userObj);
        }
    };

    const onFormChange = (e) => {
        if (!submitEnabled) {
            setSubmitEnabled(true);
        }
        if (tooltips[e.target.name]) {
            setTooltips((prevTooltips) => { return { ...prevTooltips, [e.target.name]: null } });
        }
    };

    return (
        <form className="signup-form" onSubmit={onSubmitHandler} onChange={onFormChange}>
            {!isLogIn &&
                <>
                    <div className="form-group">
                        <label htmlFor="first-name">სახელი</label>
                        <TippyWrapper content={tooltips.firstName}>
                            <input className="form-control form-control-sm" defaultValue={defaultValues.firstName} placeholder="თქვენი სახელი" name="firstName" id="first-name" />
                        </TippyWrapper>
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">გვარი</label>
                        <TippyWrapper content={tooltips.lastName}>
                            <input className="form-control form-control-sm" defaultValue={defaultValues.lastName} placeholder="თქვენი გვარი" name="lastName" id="last-name" />
                        </TippyWrapper>
                    </div>
                </>
            }
            <div className="form-group">
                <label htmlFor="email">ელფოსტა</label>
                <TippyWrapper content={tooltips.email}>
                    <input className="form-control form-control-sm" defaultValue={defaultValues.email} placeholder="თქვენი ელფოსტა" name="email" id="email" type="email" />
                </TippyWrapper>
            </div>
            <div className="form-group">
                <label htmlFor="password">პაროლი</label>
                <TippyWrapper content={tooltips.password}>
                    <input className="form-control form-control-sm" defaultValue={defaultValues.password} placeholder="თქვენი პაროლი" name="password" id="password" type="password" />
                </TippyWrapper>
            </div>
            <div className="form-group">
                <input type="submit" className={`btn btn-primary${!submitEnabled ? ' disabled' : ''}`} disabled={!submitEnabled} id="submit-btn" value={btnText} />
            </div>
        </form>
    );
};

export default UserForm;
