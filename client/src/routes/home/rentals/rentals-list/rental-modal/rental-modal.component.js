import React from 'react';
import './rental-modal.component.scss';
import { RentalsContext } from '../../../../../contexts/rentals.context';
import { ajax } from '../../../../../core/ajax-requests.util';
import { Button, Form, Input, InputNumber, message, Modal, Select, Switch } from 'antd';
import { CoordinatesFormInputComponent } from './coordinates-form-input/coordinates-form-input.component';
import { RealtorsContext } from '../../../../../contexts/realtors.context';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

function FormComponent({ closeModal, currentRental, googleMapInstances }) {
    const [form] = Form.useForm();
    const { setRentals } = React.useContext(RentalsContext);
    const { realtors } = React.useContext(RealtorsContext);

    return <Form
        form={form}
        id={'rental-form'}
        initialValues={currentRental}
        onFinish={(values) => {
            function successHandle(responseJson) {
                setRentals(responseJson);
                closeModal();
            }

            currentRental._id ?

                ajax.put({
                    postData: values,
                    url: `rentals/${currentRental._id}`
                })
                    .then(successHandle)
                    .catch(error => {
                        console.log(error);
                        message.error('Could not update rental!');
                    }) :

                ajax.post({
                    url: 'rentals',
                    postData: values
                })
                    .then(successHandle)
                    .catch(error => {
                        console.log(error);
                        message.error('Could not create rental!');
                    });
        }}
        onFinishFailed={errorInfo => {
            console.log('Failed:', errorInfo);
        }}
        hideRequiredMark={true}
        {...layout}>
        <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please input name!' }]}
        >
            <Input autoFocus/>
        </Form.Item>
        <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true, message: 'Please input description!' }]}
        >
            <Input.TextArea rows={4}/>
        </Form.Item>
        <Form.Item
            label='Floor Area Size'
            name='floorAreaSize'
            rules={[{ required: true, message: 'Please input Floor Area Size!' }]}
        >
            <InputNumber min={1} max={9999}/>
        </Form.Item>
        <Form.Item
            label='Price Per Month'
            name='pricePerMonth'
            rules={[{ required: true, message: 'Please input Price Per Month!' }]}
        >
            <InputNumber min={1} max={99999}/>
        </Form.Item>
        <Form.Item
            label='Rooms Count'
            name='roomsCount'
            rules={[{ required: true, message: 'Please input Rooms Count!' }]}
        >
            <InputNumber min={1} max={99}/>
        </Form.Item>
        <CoordinatesFormInputComponent googleMapInstances={googleMapInstances} form={form}/>

        <Form.Item
            label='Associated Realtor'
            name='associatedRealtorId'
            rules={[{ required: true, message: 'Please input associatedRealtorId!' }]}
        >
            <Select>
                {
                    realtors.map(realtor => <Select.Option value={realtor._id}
                                                           key={realtor._id}>{realtor.username}</Select.Option>)
                }
            </Select>
        </Form.Item>
        <Form.Item
            label='Is Available'
            name='isAvailable'
            valuePropName='checked'
        >
            <Switch defaultChecked={true}/>
        </Form.Item>
    </Form>;
}

export function RentalModalComponent(props) {
    const { visible, closeModal, currentRental } = props;

    return <Modal
        destroyOnClose={true}
        title={currentRental._id ? 'Edit Rental' : 'Create Rental'}
        visible={visible}
        onCancel={closeModal}
        footer={[
            <Button key='back' onClick={closeModal}>
                Cancel
            </Button>,
            <Button form={'rental-form'} key='submit' type='primary'
                    htmlType='submit'>{currentRental._id ? 'Update' : 'Create'}</Button>,
        ]}
    >
        <FormComponent {...props}/>
    </Modal>;
}
