import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Routes from './routes';
import UserAvatar from './common/containers/UserAvatarContainer/UserAvatarContainer';
import { editUser, deleteUser } from './app/usersSlice';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.allUsers);
  const currentYear = new Date().getFullYear();

  const editUserHandler = (id, user) => {
    dispatch(editUser({ id, user }));
  };

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="App">
      <div className="row app-body">
        <div className="users-column col-xl-3">
          <div className="row justify-content-center">
            {Object.keys(users).map((userId) => (
              <div className="col-xl-4 user" key={userId}>
                <UserAvatar id={userId} user={users[userId]} editUser={editUserHandler} deleteUser={deleteUserHandler} />
              </div>
            ))}
          </div>
        </div>
        <div className="page-content col-xl-9">
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </div>
      </div>
      <div className="app-footer">
        All Rights Reserved &copy; {currentYear}
      </div>
    </div>
  );
}

export default App;
