import React from 'react';
import './users.component.scss';
import { UsersContext } from '../../../contexts/users.context';
import { ajax } from '../../../core/ajax-requests.util';
import { Avatar, Button, List, Popconfirm, Skeleton } from 'antd';
import UserDeleteOutlined from '@ant-design/icons/lib/icons/UserDeleteOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import UserAddOutlined from '@ant-design/icons/lib/icons/UserAddOutlined';
import { UserModalComponent } from './user-modal/user-modal.component';

const userTypeColor = {
    client: '#87d068',
    realtor: '#aaa',
    admin: '#7879ff',
};

export function UsersComponent() {
    const [userModalVisible, setUserModalVisible] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const { users, setUsers } = React.useContext(UsersContext);

    React.useEffect(() => {
        ajax.get({ url: 'users' }).then(responseJson => {
            setUsers(responseJson);
        });
    }, [setUsers]);

    return <div className={'users-component'}>
        <List
            itemLayout='horizontal'
            header={<div className={'users-header'}><h1>User List</h1> <Button type={'primary'} icon={<UserAddOutlined/>}
                                           onClick={() => {
                                               setCurrentUser({});
                                               setUserModalVisible(true);
                                           }
                                           }/></div>}
            dataSource={users}
            renderItem={user => (
                <List.Item
                    actions={[
                        <Button shape={'round'} type={'primary'} ghost icon={<EditOutlined/>}
                                onClick={() => {
                                    setCurrentUser(user);
                                    setUserModalVisible(true);
                                }}/>,
                        <Popconfirm
                            title='Sure to delete this user?'
                            onConfirm={() => {
                                ajax.delete({ url: `users/${user._id}` }).then(responseJson => {
                                    setUsers(responseJson);
                                });
                            }}
                            okText='Yes'
                            cancelText='No'
                        >
                            <Button shape={'round'} type={'danger'} ghost icon={<UserDeleteOutlined/>}/>
                        </Popconfirm>
                    ]}
                >
                    <Skeleton avatar title={false} loading={false} active>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    style={{ backgroundColor: userTypeColor[user.role] }}>{user.username[0].toUpperCase()}</Avatar>
                            }
                            title={user.username}
                        />
                        <div>{user.role}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
        <UserModalComponent visible={userModalVisible}
                            closeModal={() => setUserModalVisible(false)}
                            currentUser={currentUser}
        />
    </div>;
}
