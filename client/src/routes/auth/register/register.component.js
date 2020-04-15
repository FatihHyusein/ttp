import React from 'react';
import './register.component.scss';
import { Link } from 'react-router-dom';
import { Button, Form, Input, message, Radio } from 'antd';
import { ajax } from '../../../core/ajax-requests.util';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export function RegisterComponent() {
    return <div>
        <Form
            onFinish={(values) => {
                ajax.post({
                    url: 'auth/register',
                    postData: values
                }).then(responseJson => {
                }).catch(error => {
                    console.log(error);
                    message.error('Could not register!');
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
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label='Confirm Password'
                name='confirmPassword'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label='Role'
                name='role'
                rules={[{ required: true, message: 'Please select your role!' }]}
            >
                <Radio.Group buttonStyle='solid'>
                    <Radio.Button value='customer'>Client</Radio.Button>
                    <Radio.Button value='realtor'>Realtor</Radio.Button>
                    <Radio.Button value='admin'>Admin</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                    Register
                </Button>
            </Form.Item>
        </Form>
        <Link to={`/auth`}>Login</Link>
    </div>;
}
