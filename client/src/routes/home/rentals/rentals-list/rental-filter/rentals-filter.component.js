import React from 'react';
import './rentals-filter.component.scss';
import { Button, Form } from 'antd';
import { RentalFilterMinMaxInputComponent } from './rental-filter-min-max-input/rental-filter-min-max-input.component';

const layout = {
    labelCol: { span: 11 },
    wrapperCol: { span: 13 },
};

const tailLayout = {
    wrapperCol: { offset: 11, span: 13 },
};

export function RentalsFilterComponent({ closeDrawer, filterValues, setFilterValues }) {
    const [form] = Form.useForm();

    return <Form
        form={form}
        id={'rental-form'}
        initialValues={filterValues}
        onFinish={(values) => {
            setFilterValues(values);
            closeDrawer();
        }}
        hideRequiredMark={true}
        {...layout}>
        <RentalFilterMinMaxInputComponent form={form}
                                          label={'Floor Area Size (Min - Max)'}
                                          stateKey={'floorAreaSize'}
                                          min={1} max={9999}/>
        <RentalFilterMinMaxInputComponent form={form}
                                          label={'Price Per Month (Min - Max)'}
                                          stateKey={'pricePerMonth'}
                                          min={1} max={99999}/>
        <RentalFilterMinMaxInputComponent form={form}
                                          label={'Rooms Count (Min - Max)'}
                                          stateKey={'roomsCount'}
                                          min={1} max={99}/>
        <Form.Item {...tailLayout}>
            <Button
                style={{ marginRight: 10 }}
                onClick={() => {
                    setFilterValues({
                        floorAreaSize: { min: null, max: null },
                        pricePerMonth: { min: null, max: null },
                        roomsCount: { min: null, max: null },
                    });
                    closeDrawer();
                }}>Clear</Button>
            <Button type='primary' htmlType='submit'>
                Filter
            </Button>
        </Form.Item>
    </Form>;
}
