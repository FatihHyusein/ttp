import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import './login.component.scss';
import { Button, Form, Input, message } from 'antd';
import { ajax } from '../../../core/ajax-requests.util';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export function LoginComponent() {
    const match = useRouteMatch();

    return <div>
        <Form
            onFinish={(values) => {
                ajax.post({
                    url: 'auth/login',
                    postData: values
                }).then(responseJson => {
                }).catch(error => {
                    console.log(error);
                    message.error('Could not login!');
                });
            }}
            onFinishFailed={errorInfo => {
                console.log('Failed:', errorInfo);
            }}
            hideRequiredMark={true}
            {...layout}
            onSubmit>
            <Form.Item
                label='Username'
                name='username'
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input autoFocus/>
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                    Login
                </Button>
            </Form.Item>
        </Form>
        <Link to={`${match.path}/register`}>Register</Link>
    </div>;
}
