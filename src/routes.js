import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DashboardPage from './pages/DashboardPage/DashboardPageContainer';
import SignUpPage from './pages/SignUpPage/SignUpPageContainer';
import LogInPage from './pages/LogInPage/LogInPageContainer';

const Routes = () => {
    const isAuthorized = useSelector(state => !!state.users.activeUserId);

    return (
        isAuthorized ? (
            <Switch>
                <Route path="/dashboard" exact component={DashboardPage} />
                <Redirect from="/" to="/dashboard" />
            </Switch>
        ) : (
            <Switch>
                <Route path="/signUp" exact component={SignUpPage} />
                <Route path="/logIn" exact component={LogInPage} />
                <Redirect from="/" to="/signUp" />
            </Switch>
        )
    );
};

export default Routes;
