import React from 'react';
import './rental-popup.component.scss';
import { rentalUtils } from '../../rental.utils';
import { RentalRealtorSpanComponent } from '../../../components/rental-realtor-span/rental-realtor-span.component';

export function RentalPopupComponent({ rental }) {
    return <div className={'rental-popup-component'}>
        <div className={'arrow-up'}/>
        <div className={'title'}>
            <div>{rental.name}</div>
            <RentalRealtorSpanComponent realtorId={rental.associatedRealtorId}/>
        </div>
        <div className={'description'}>{rental.description}</div>
        <div className={'rental-props'}>
            {rentalUtils.getDefaultActionSection(rental)}
        </div>
    </div>;
}
