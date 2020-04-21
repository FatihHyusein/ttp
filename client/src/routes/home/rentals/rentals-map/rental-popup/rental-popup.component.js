import React from 'react';
import './rental-popup.component.scss';
import { rentalUtils } from '../../rental.utils';

export function RentalPopupComponent({ rental }) {
    return <div className={'rental-popup-component'}>
        <div className={'arrow-up'}/>
        <div className={'name'}>{rental.name}</div>
        <div className={'description'}>{rental.description}</div>
        <div className={'rental-props'}>
            {rentalUtils.getDefaultActionSection(rental)}
        </div>
    </div>;
}
