import React from 'react';
import './register.component.scss';
import { Button, Card, Form, Input, message, Radio } from 'antd';
import { ajax } from '../../../core/ajax-requests.util';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export function RegisterComponent() {
    const [form] = Form.useForm();

    return <div>
        <Card title='Register' bordered={false} style={{ width: 450 }}>
            <Form
                form={form}
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
                            validator: (rule, value, callback) => {
                                if (value && form.getFieldValue('password') !== value) {
                                    callback('Confirm Password does not match!');
                                } else {
                                    callback();
                                }
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
        </Card>
    </div>;
}
