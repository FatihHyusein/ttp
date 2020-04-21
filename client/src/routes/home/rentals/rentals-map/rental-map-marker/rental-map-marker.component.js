import React from 'react';
import './rental-map-marker.component.scss';
import HomeFilled from '@ant-design/icons/lib/icons/HomeFilled';

export function RentalMapMarkerComponent({ rental }) {
    return <div className={`rental-map-marker-component ${rental.isAvailable ? 'available' : 'rented'}`}>
        <HomeFilled/>
    </div>;
}
