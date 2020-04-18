import React from 'react';
import './rentals.component.scss';
import { RentalsContext } from '../../../contexts/rentals.context';
import { ajax } from '../../../core/ajax-requests.util';
import { RentalsMapComponent } from './rentals-map/rentals-map.component';
import { RentalsListComponent } from './rentals-list/rentals-list.component';


export function RentalsComponent() {
    const { setRentals } = React.useContext(RentalsContext);
    const [googleMapInstances, setGoogleMapInstances] = React.useState(null);

    React.useEffect(() => {
        ajax.get({ url: 'rentals' }).then(responseJson => {
            setRentals(responseJson);
        });
    }, [setRentals]);

    return <div className={'rentals-component'}>
        <div>
            <RentalsListComponent googleMapInstances={googleMapInstances}/>
        </div>
        <div>
            <RentalsMapComponent googleMapInstances={googleMapInstances} setGoogleMapInstances={setGoogleMapInstances}/>
        </div>
    </div>;
}
