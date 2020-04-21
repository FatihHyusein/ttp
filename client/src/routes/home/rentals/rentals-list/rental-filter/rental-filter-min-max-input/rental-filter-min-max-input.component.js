import React from 'react';
import './rental-filter-min-max-input.component.scss';
import { Form, Input, InputNumber } from 'antd';


export function RentalFilterMinMaxInputComponent({ form, label, stateKey, min, max }) {
    return <Form.Item label={label}>
        <Input.Group>
            <Form.Item
                noStyle
                name={[stateKey, 'min']}
                rules={[
                    {
                        validator: (rule, value) => {
                            if (value && form.getFieldValue([stateKey, 'max']) && form.getFieldValue([stateKey, 'max']) < value) {
                                return Promise.reject('Min value can not be lower than the Max Input');
                            }

                            return Promise.resolve();
                        }
                    }
                ]}>
                <InputNumber min={min} max={max}/>
            </Form.Item>
            <Form.Item
                noStyle
                name={[stateKey, 'max']}
            >
                <InputNumber min={min} max={max} onChange={() => {
                    if (form.getFieldValue([stateKey, 'min'])) {
                        form.validateFields([[stateKey, 'min']]);
                    }
                }}/>
            </Form.Item>
        </Input.Group>
    </Form.Item>;
}
