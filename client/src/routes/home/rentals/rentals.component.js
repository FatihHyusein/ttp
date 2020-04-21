import React from 'react';
import './rentals.component.scss';
import { RentalsContext } from '../../../contexts/rentals.context';
import { ajax } from '../../../core/ajax-requests.util';
import { RentalsMapComponent } from './rentals-map/rentals-map.component';
import { RentalsListComponent } from './rentals-list/rentals-list.component';
import { RealtorsContext } from '../../../contexts/realtors.context';
import { Button, Drawer } from 'antd';
import GlobalOutlined from '@ant-design/icons/lib/icons/GlobalOutlined';

export function RentalsComponent() {
    const { setRentals } = React.useContext(RentalsContext);
    const { setRealtors } = React.useContext(RealtorsContext);
    const [googleMapInstances, setGoogleMapInstances] = React.useState(null);
    const [filterValues, setFilterValues] = React.useState({
        floorAreaSize: { min: null, max: null },
        pricePerMonth: { min: null, max: null },
        roomsCount: { min: null, max: null },
    });
    const [mobileMapDrawerVisible, setMobileMapDrawerVisible] = React.useState(false);

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

    const rentalsList = <RentalsListComponent googleMapInstances={googleMapInstances}
                                              filterValues={filterValues}
                                              setFilterValues={setFilterValues}/>;
    const rentalsMap = <RentalsMapComponent googleMapInstances={googleMapInstances}
                                            setGoogleMapInstances={setGoogleMapInstances}
                                            filterValues={filterValues}/>;

    if (window.innerWidth > 1000) {
        return <div className={'rentals-component'}>
            <div>{rentalsList}</div>
            <div>{rentalsMap}</div>
        </div>;
    }

    return <div className={'mobile-rentals-component'}>
        {rentalsList}
        <Button className={'drawer-trigger-btn'}
                onClick={() => {
                    setMobileMapDrawerVisible(true);
                }}
                type={'primary'}
                ghost
                icon={<GlobalOutlined/>}
        />

        <Drawer
            destroyOnClose={true}
            title='Rentals Map'
            placement='right'
            closable={true}
            onClose={() => setMobileMapDrawerVisible(false)}
            visible={mobileMapDrawerVisible}
            width={window.innerWidth}
        >
            {rentalsMap}
        </Drawer>
    </div>;

}
