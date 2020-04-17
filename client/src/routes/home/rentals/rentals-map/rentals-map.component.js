import React from 'react';
import './rentals-map.component.scss';
import { RentalsContext } from '../../../../contexts/rentals.context';
import GoogleMapReact from 'google-map-react';
import { RentalMapMarkerComponent } from './rental-map-marker/rental-map-marker.component';

export function RentalsMapComponent() {
    const { rentals } = React.useContext(RentalsContext);
    const [googleMapInstances, setGoogleMapInstances] = React.useState(null);

    React.useEffect(() => {
        if (googleMapInstances) {
            if (rentals.length === 0 || !googleMapInstances || !googleMapInstances.maps || !googleMapInstances.map) {
                return;
            }

            const bounds = new googleMapInstances.maps.LatLngBounds();
            rentals.forEach(rental => {
                const [lat, lng] = rental.coordinates.split(',').map(x => +x);
                bounds.extend({
                    lng,
                    lat
                });
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
            onChildClick={(childKey) => {
                const selectedRental = rentals.find(({ _id }) => _id === childKey);
                if (selectedRental) {
                    console.log(selectedRental);
                }
            }}
            onGoogleApiLoaded={({ map, maps }) => {
                setGoogleMapInstances({
                    map, maps
                });
            }}
        >
            {rentals.map(rental => {
                const [lat, lng] = rental.coordinates.split(',').map(x => +x);

                return <RentalMapMarkerComponent
                    key={rental._id}
                    lat={lat}
                    lng={lng}
                    text='My Marker'
                />;
            })}
        </GoogleMapReact>
    </div>;
}
