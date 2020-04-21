import React from 'react';
import './rentals-map.component.scss';
import { RentalsContext } from '../../../../contexts/rentals.context';
import GoogleMapReact from 'google-map-react';
import { RentalMapMarkerComponent } from './rental-map-marker/rental-map-marker.component';
import { rentalUtils } from '../rental.utils';
import { RentalPopupComponent } from './rental-popup/rental-popup.component';

export function RentalsMapComponent({ googleMapInstances, setGoogleMapInstances, filterValues }) {
    const { rentals } = React.useContext(RentalsContext);
    const [selectedRental, setSelectedRental] = React.useState();

    React.useEffect(() => {
        if (googleMapInstances) {
            if (rentals.length === 0 || !googleMapInstances || !googleMapInstances.maps || !googleMapInstances.map) {
                return;
            }

            const bounds = new googleMapInstances.maps.LatLngBounds();
            rentals.forEach(rental => {
                bounds.extend(rental.coordinates);
            });

            googleMapInstances.map.fitBounds(bounds, {
                animate: false
            });
        }
    }, [googleMapInstances, rentals]);

    return <div className={'rentals-map-component'}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAfX75AC7r4pS_b6OPFwNgTka31LN03DsA' }}
            center={{
                lat: 42.69,
                lng: 23.31
            }}
            zoom={5}
            onClick={() => {
                setSelectedRental(null)
            }}
            onChildClick={(childKey) => {
                const clickedRental = rentals.find(({ _id }) => _id === childKey);
                setSelectedRental(clickedRental);
            }}
            onGoogleApiLoaded={({ map, maps }) => {
                setGoogleMapInstances({
                    map, maps
                });
            }}
        >
            {rentalUtils.filterData(rentals, filterValues).map(rental => {
                return <RentalMapMarkerComponent
                    key={rental._id}
                    lat={rental.coordinates.lat}
                    lng={rental.coordinates.lng}
                    text='My Marker'
                />;
            })}
            {
                selectedRental ? <RentalPopupComponent
                    rental={selectedRental}
                    lat={selectedRental.coordinates.lat}
                    lng={selectedRental.coordinates.lng}/> : null
            }
        </GoogleMapReact>
    </div>;
}
