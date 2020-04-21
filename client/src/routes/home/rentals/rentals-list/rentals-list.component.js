import React from 'react';
import './rentals-list.component.scss';
import { Avatar, Button, Drawer, List, message, Popconfirm, Switch } from 'antd';
import AppstoreAddOutlined from '@ant-design/icons/lib/icons/AppstoreAddOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import { ajax } from '../../../../core/ajax-requests.util';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import { RentalModalComponent } from './rental-modal/rental-modal.component';
import { RentalsContext } from '../../../../contexts/rentals.context';
import { MyProfileContext } from '../../../../contexts/my-profile.context';
import { userRoles } from '../../../../core/roles.enum';
import { RentalsFilterComponent } from './rental-filter/rentals-filter.component';
import FilterOutlined from '@ant-design/icons/lib/icons/FilterOutlined';
import { rentalUtils } from '../rental.utils';
import { RentalRealtorSpanComponent } from '../../components/rental-realtor-span/rental-realtor-span.component';


export function RentalsListComponent({ googleMapInstances, filterValues, setFilterValues }) {
    const [rentalModalVisible, setRentalModalVisible] = React.useState(false);
    const [filtersVisible, setFiltersVisible] = React.useState(false);
    const [currentRental, setCurrentRental] = React.useState({
        isAvailable: true
    });
    const { rentals, setRentals } = React.useContext(RentalsContext);
    const { myProfile } = React.useContext(MyProfileContext);

    function getRentalActionSection(rental) {
        const actionSection = rentalUtils.getDefaultActionSection(rental);

        if (myProfile.role === userRoles.customer) {
            return actionSection;
        }

        return [
            ...actionSection,
            <Switch checkedChildren='Av' unCheckedChildren='Re' checked={rental.isAvailable} onChange={(checked) => {
                ajax.put({
                    postData: {
                        isAvailable: checked
                    },
                    url: `rentals/${rental._id}`
                })
                    .then((responseJson) => {
                        setRentals(responseJson);
                    })
                    .catch(error => {
                        console.log(error);
                        message.error('Could not update rental!');
                    });
            }}/>,
            <Button shape={'round'} type={'primary'} ghost icon={<EditOutlined/>}
                    onClick={() => {
                        setCurrentRental(rental);
                        setRentalModalVisible(true);
                    }}/>,
            <Popconfirm
                title='Sure to delete this rental?'
                onConfirm={() => {
                    ajax.delete({ url: `rentals/${rental._id}` }).then(responseJson => {
                        setRentals(responseJson);
                    });
                }}
                okText='Yes'
                cancelText='No'
            >
                <Button shape={'round'} type={'danger'} ghost icon={<DeleteOutlined/>}/>
            </Popconfirm>
        ];

    }

    return <React.Fragment>

        <List
            className={'rentals-list'}
            itemLayout='vertical'
            header={<div className={'rentals-header'}><h1>Rentals <Button icon={<FilterOutlined/>}
                                                                          onClick={() => setFiltersVisible(true)}/>
            </h1>
                {myProfile.role === userRoles.customer ?
                    null
                    : <Button type={'primary'} icon={<AppstoreAddOutlined/>}
                              onClick={() => {
                                  setCurrentRental({
                                      isAvailable: true
                                  });
                                  setRentalModalVisible(true);
                              }
                              }/>}
            </div>}
            size='large'
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={rentalUtils.filterData(rentals, filterValues)}
            renderItem={rental => (
                <List.Item
                    key={rental._id}
                    actions={getRentalActionSection(rental)}>
                    <List.Item.Meta
                        avatar={<Avatar>{rental.name[0].toUpperCase()}</Avatar>}
                        title={<div className={'rental-list-item-title'}>
                            <div>
                                {rental.name}
                            </div>
                            <RentalRealtorSpanComponent realtorId={rental.associatedRealtorId}/>
                        </div>}
                        description={rental.description}
                    />
                </List.Item>
            )}
        />
        <RentalModalComponent visible={rentalModalVisible}
                              googleMapInstances={googleMapInstances}
                              closeModal={() => setRentalModalVisible(false)}
                              currentRental={currentRental}
        />
        <Drawer
            destroyOnClose={true}
            title='Filter'
            placement='left'
            closable={true}
            onClose={() => setFiltersVisible(false)}
            visible={filtersVisible}
            width={window.innerWidth > 500 ? 500 : window.innerWidth}
        >
            <RentalsFilterComponent closeDrawer={() => setFiltersVisible(false)}
                                    filterValues={filterValues}
                                    setFilterValues={setFilterValues}
            />
        </Drawer>
    </React.Fragment>;
}
