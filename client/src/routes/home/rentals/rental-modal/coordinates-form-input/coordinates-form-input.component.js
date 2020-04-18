import React from 'react';
import './coordinates-form-input.component.scss';
import { Form, InputNumber, message, Select, Spin, Input } from 'antd';

let geocoderTimeout;
let prevSelectedAddress;

export function CoordinatesFormInputComponent({ googleMapInstances, form }) {
    const [geocoder, setGeocoder] = React.useState();
    const [fetching, setFetching] = React.useState(false);
    const [gmapsAddresses, setGmapsAddresses] = React.useState([]);
    const [selectedAddress, setSelectedAddress] = React.useState('');

    function clearAddressData() {
        setFetching(false);
        setGmapsAddresses([]);
        setSelectedAddress('');
    }

    React.useEffect(() => {
        if (googleMapInstances) {
            setGeocoder(new googleMapInstances.maps.Geocoder());
        }
    }, [googleMapInstances]);

    React.useEffect(() => {
        if (selectedAddress && prevSelectedAddress !== selectedAddress) {
            prevSelectedAddress = selectedAddress;
            const address = gmapsAddresses.find(({ place_id }) => place_id === selectedAddress);
            form.setFieldsValue({
                coordinates: {
                    lat: address.geometry.location.lat(),
                    lng: address.geometry.location.lng()
                }
            });
        }
    }, [selectedAddress, gmapsAddresses, form]);

    return <React.Fragment>
        <Form.Item
            label='Address'>
            <Select
                showSearch
                value={selectedAddress}
                placeholder='Select users'
                notFoundContent={fetching ? <Spin size='small'/> : null}
                filterOption={false}
                onSearch={(address) => {
                    if (geocoderTimeout) {
                        clearTimeout(geocoderTimeout);
                    }
                    geocoderTimeout = setTimeout(() => {
                        setFetching(true);
                        geocoder.geocode({ 'address': address }, function (results, status) {
                            setFetching(false);
                            if (status === googleMapInstances.maps.GeocoderStatus.OK) {
                                setGmapsAddresses(results);
                            } else {
                                message.error('Geocode was not successful for the following reason: ' + status, 4);
                            }
                        });
                    }, 250);
                }}
                onChange={(value) => {
                    setSelectedAddress(value);
                }}
            >
                {gmapsAddresses.map(d => (
                    <Select.Option key={d.place_id} value={d.place_id}>{d.formatted_address}</Select.Option>
                ))}
            </Select>
        </Form.Item>
        <Form.Item label='Coordinates (Lat/Lng)'>
            <Input.Group>
                <Form.Item
                    noStyle
                    name={['coordinates', 'lat']}
                    rules={[{ required: true, message: 'Please input Coordinates!' }]}
                >
                    <InputNumber onChange={clearAddressData}/>
                </Form.Item>
                <Form.Item
                    noStyle
                    name={['coordinates', 'lng']}
                    rules={[{ required: true, message: 'Please input Coordinates!' }]}
                >
                    <InputNumber onChange={clearAddressData}/>
                </Form.Item>
            </Input.Group>
        </Form.Item>
    </React.Fragment>;
}