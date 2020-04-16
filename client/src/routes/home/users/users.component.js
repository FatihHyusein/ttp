import React from 'react';
import './users.component.scss';
import { UsersContext } from '../../../contexts/users.context';
import { ajax } from '../../../core/ajax-requests.util';
import { Avatar, Button, List, Popconfirm, Skeleton } from 'antd';
import UserDeleteOutlined from '@ant-design/icons/lib/icons/UserDeleteOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';

const userTypeColor = {
    client: '#87d068',
    realtor: '#aaa',
    admin: '#7879ff',
};

export function UsersComponent() {
    const { users, setUsers } = React.useContext(UsersContext);

    React.useEffect(() => {
        ajax.get({ url: 'users' }).then(responseJson => {
            setUsers(responseJson);
        });
    }, []);

    return <div>
        <List
            itemLayout='horizontal'
            dataSource={users}
            renderItem={user => (
                <List.Item
                    actions={[
                        <Button shape={'round'} type={'primary'} ghost icon={<EditOutlined/>}/>,
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
                            title={<a href='https://ant.design'>{user.username}</a>}
                            description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                        />
                        <div>{user.role}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    </div>;
}
