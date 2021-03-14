import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory, Link } from 'react-router-dom';

import { logIn } from '../../app/usersSlice';
import UserForm from '../../common/containers/UserFormContainer/UserFormContainer';

const LogInPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [error, setError] = useState();

    const onSubmitHandler = (authDetails) => {
        dispatch(logIn(authDetails))
            .then(unwrapResult)
            .then((originalPromiseResult) => {
                if (!originalPromiseResult) {
                    setError('მომხმარებლის მონაცემები არასწორია');
                } else {
                    history.replace('/dashboard');
                }
            });
    };

    return (
        <div className="container">
            {error &&
                <p className="alert alert-danger">{error}</p>
            }
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <p>შეიყვანეთ თქვენი მონაცემები ან <Link to="/signUp">დარეგისტრირდით</Link></p>                    
                    <UserForm onSubmit={onSubmitHandler} btnText="შესვლა" isLogIn={true} />
                </div>
            </div>
        </div>
    )
};

export default LogInPage;
