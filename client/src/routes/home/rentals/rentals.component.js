import React from 'react';
import './rentals.component.scss';
import { RentalsContext } from '../../../contexts/rentals.context';
import { ajax } from '../../../core/ajax-requests.util';
import { RentalsMapComponent } from './rentals-map/rentals-map.component';
import { RentalsListComponent } from './rentals-list/rentals-list.component';
import { RealtorsContext } from '../../../contexts/realtors.context';


export function RentalsComponent() {
    const { setRentals } = React.useContext(RentalsContext);
    const { setRealtors } = React.useContext(RealtorsContext);
    const [googleMapInstances, setGoogleMapInstances] = React.useState(null);
    const [filterValues, setFilterValues] = React.useState({
        floorAreaSize: { min: null, max: null },
        pricePerMonth: { min: null, max: null },
        roomsCount: { min: null, max: null },
    });

    React.useEffect(() => {
        ajax.get({ url: 'rentals' }).then(responseJson => {
            setRentals(responseJson);
        });
    }, [setRentals]);

    React.useEffect(() => {
        ajax.get({ url: 'users/realtor' }).then(responseJson => {
            setRealtors(responseJson);
        });
    }, [setRealtors]);

    return <div className={'rentals-component'}>
        <div>
            <RentalsListComponent googleMapInstances={googleMapInstances}
                                  filterValues={filterValues}
                                  setFilterValues={setFilterValues}/>
        </div>
        <div>
            <RentalsMapComponent googleMapInstances={googleMapInstances}
                                 setGoogleMapInstances={setGoogleMapInstances}
                                 filterValues={filterValues}/>
        </div>
    </div>;
}
