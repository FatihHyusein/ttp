import React from 'react';
import './users.component.scss';
import { UsersContext } from '../../../contexts/users.context';
import { ajax } from '../../../core/ajax-requests.util';

export function UsersComponent() {
    const { users, setUsers } = React.useContext(UsersContext);

    React.useEffect(() => {
        ajax.get({ url: 'users' }).then(responseJson => {
            console.log(responseJson);
            setUsers(responseJson);
        });
    }, []);

    return <div>
        USERS
    </div>;
}
