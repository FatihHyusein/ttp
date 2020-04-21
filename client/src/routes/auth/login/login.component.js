import React from 'react';
import './login.component.scss';
import { Button, Card, Form, Input, message } from 'antd';
import { ajax } from '../../../core/ajax-requests.util';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export function LoginComponent() {
    return <div className={'login-form'}>
        <Card title='Login' bordered={false}>
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
        </Card>
    </div>;
}
