import React from 'react';
import './user-modal.component.scss';
import { UsersContext } from '../../../../contexts/users.context';
import { ajax } from '../../../../core/ajax-requests.util';
import { Button, Form, Input, message, Modal, Radio } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export function UserModalComponent({ visible, closeModal, currentUser }) {
    const { setUsers } = React.useContext(UsersContext);

    return <Modal
        destroyOnClose={true}
        title={currentUser._id ? 'Edit User' : 'Create User'}
        visible={visible}
        onCancel={closeModal}
        footer={[
            <Button key='back' onClick={closeModal}>
                Cancel
            </Button>,
            <Button form={'user-form'} key='submit' type='primary'
                    htmlType='submit'>{currentUser._id ? 'Update' : 'Create'}</Button>,
        ]}
    >
        <Form
            id={'user-form'}
            initialValues={currentUser}
            onFinish={(values) => {
                function successHandle(responseJson) {
                    setUsers(responseJson);
                    closeModal();
                }

                currentUser._id ?

                    ajax.put({
                        postData: values,
                        url: `users/${currentUser._id}`
                    })
                        .then(successHandle)
                        .catch(error => {
                            console.log(error);
                            message.error(typeof error.message === 'string' ? error.message : 'Could not update user!');
                        }) :

                    ajax.post({
                        url: 'users',
                        postData: values
                    })
                        .then(successHandle)
                        .catch(error => {
                            console.log(error);
                            message.error(typeof error.message === 'string' ? error.message : 'Could not create user!');
                        });
            }}
            onFinishFailed={errorInfo => {
                console.log('Failed:', errorInfo);
            }}
            hideRequiredMark={true}
            {...layout}>
            <Form.Item
                label='Username'
                name='username'
                rules={[{ required: true, message: 'Please input username!' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                rules={currentUser._id ? [] : [{ required: true, message: 'Please input password!' }]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label='Role'
                name='role'
                rules={[{ required: true, message: 'Please select role!' }]}
            >
                <Radio.Group buttonStyle='solid'>
                    <Radio.Button value='customer'>Client</Radio.Button>
                    <Radio.Button value='realtor'>Realtor</Radio.Button>
                    <Radio.Button value='admin'>Admin</Radio.Button>
                </Radio.Group>
            </Form.Item>
        </Form>
    </Modal>;
}
