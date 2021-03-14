import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './DashboardPageContainer.css'
import { getActiveUser } from '../../app/usersSlice';
import { logOut } from '../../app/usersSlice';

const DashboardPage = () => {
    const user = useSelector(getActiveUser);
    const dispatch = useDispatch();
    const history = useHistory();

    const onLogOutHandler = () => {
        dispatch(logOut());
        history.replace('/logIn');
    };

    return (
        <div className="dashboard text-center text-xl-left">
            <h1>გამარჯობა, {user.firstName}</h1>
            <p>აირჩიეთ სასურველი მომხმარებელი და შეცვალეთ მისი პირადი მონაცემები</p>
            <button className="btn btn-info" onClick={onLogOutHandler}>გამოსვლა</button>
        </div>
    );
};

export default DashboardPage;
