import React from 'react';
import './register.component.scss';
import { Button, Card, Form, Input, message, Radio } from 'antd';
import { ajax } from '../../../core/ajax-requests.util';
import { userRoles } from '../../../core/roles.enum';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export function RegisterComponent() {
    const [form] = Form.useForm();

    return <div className={'register-form'}>
        <Card title='Register' bordered={false}>
            <Form
                form={form}
                onFinish={(values) => {
                    ajax.post({
                        url: 'auth/register',
                        postData: values
                    }).then(responseJson => {
                    }).catch(error => {
                        message.error(typeof error.message === 'string' ? error.message : 'Could not register!');
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
                    <Input.Password onChange={() => {
                        if (form.getFieldValue('confirmPassword')) {
                            form.validateFields(['confirmPassword']);
                        }
                    }}/>
                </Form.Item>
                <Form.Item
                    label='Confirm Password'
                    name='confirmPassword'
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        {
                            validator: (rule, value) => {
                                if (value && form.getFieldValue('password') !== value) {
                                    return Promise.reject('Confirm Password does not match!');
                                }

                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    label='Role'
                    name='role'
                    rules={[{ required: true, message: 'Please select your role!' }]}
                >
                    <Radio.Group buttonStyle='solid'>
                        <Radio.Button value={userRoles.customer}>Client</Radio.Button>
                        <Radio.Button value={userRoles.realtor}>Realtor</Radio.Button>
                        <Radio.Button value={userRoles.admin}>Admin</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>;
}
