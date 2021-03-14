import { useLayoutEffect, useState } from 'react';
import * as faces from 'facesjs';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';

import './UserAvatarContainer.css';
import UserForm from '../UserFormContainer/UserFormContainer';

const UserAvatar = ({ id, user, editUser, deleteUser }) => {
    const { firstName, face } = user;

    const [isTippyVisible, setIsTippyVisible] = useState(false);

    const toggleTippy = () => setIsTippyVisible((prevState) => !prevState);

    useLayoutEffect(() => {
        faces.display(id, face);
    }, [id, face]);

    const EnhancedUserForm = () => (
        <>
            <UserForm defaultValues={user} btnText="რედაქტირება" onSubmit={(userDetails) => editUser(id, userDetails)} />
            <button className="btn btn-secondary" onClick={() => deleteUser(id)}>წაშლა</button>
        </>
    );

    return (
        <Tippy content={<EnhancedUserForm />} visible={isTippyVisible} onClickOutside={toggleTippy} theme="translucent" interactive={true}>
            <div className="user-avatar-wrapper" onClick={toggleTippy}>
                <div className="user-avatar" id={id} />
                <div className="user-first-name">{firstName}</div>
            </div>
        </Tippy>
    );
};

export default UserAvatar;
