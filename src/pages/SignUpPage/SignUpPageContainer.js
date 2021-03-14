import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import './SignUpPage.css';
import UserForm from '../../common/containers/UserFormContainer/UserFormContainer';
import { signUp } from '../../app/usersSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmitHandler = (user) => {
        dispatch(signUp(user));
        history.push('/dashboard');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="signup-description">
                    <h4>ვებ გვერდზე წვდომისათვის, გთხოვთ, გაიაროთ რეგისტრაცია</h4>
                    <p>უკვე გაქვთ ანგარიში? გაიარეთ <Link to="/logIn">ავტორიზაცია</Link></p>
                </div>
                <div className="col-md-8">
                    <UserForm onSubmit={onSubmitHandler} btnText="რეგისტრაცია" />
                </div>
            </div>
        </div>
    )
};

export default SignUp;
