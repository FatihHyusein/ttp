import React from 'react';
import './rental-realtor-span.component.scss';
import KeyOutlined from '@ant-design/icons/lib/icons/KeyOutlined';
import { RealtorsContext } from '../../../../contexts/realtors.context';


export function RentalRealtorSpanComponent({ realtorId }) {
    const { realtors } = React.useContext(RealtorsContext);
    const realtor = realtors.find(({ _id }) => _id === realtorId);


    return <div title={'Associated Realtor'}>
        <KeyOutlined/> {realtor ? realtor.username : 'Realtor Name'}
    </div>;
}
