import React from 'react';
import './rentals-list.component.scss';
import { Avatar, Button, List, Popconfirm } from 'antd';
import AppstoreAddOutlined from '@ant-design/icons/lib/icons/AppstoreAddOutlined';
import { AppstoreOutlined, CalendarOutlined, DollarOutlined, ExpandAltOutlined } from '@ant-design/icons';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import { ajax } from '../../../../core/ajax-requests.util';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import { RentalModalComponent } from '../rental-modal/rental-modal.component';
import { RentalsContext } from '../../../../contexts/rentals.context';
import { MyProfileContext } from '../../../../contexts/my-profile.context';
import { userRoles } from '../../../../core/roles.enum';


const IconText = ({ icon, text, title }) => (
    <span title={title}>
    {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
  </span>
);

export function RentalsListComponent({ googleMapInstances }) {
    const [rentalModalVisible, setRentalModalVisible] = React.useState(false);
    const [currentRental, setCurrentRental] = React.useState({});
    const { rentals, setRentals } = React.useContext(RentalsContext);
    const { myProfile } = React.useContext(MyProfileContext);

    function getRentalActionSection(rental) {
        const actionSection = [
            <IconText title={'Date Added'} icon={CalendarOutlined}
                      text={new Date(rental.dateAdded).toDateString()}
                      key='size'/>,
            <IconText title={'Floor Area Size'} icon={ExpandAltOutlined} text={rental.floorAreaSize}
                      key='size'/>,
            <IconText title={'Price per month'} icon={DollarOutlined} text={rental.pricePerMonth}
                      key='price-per-month'/>,
            <IconText title={'Number of rooms'} icon={AppstoreOutlined} text={rental.roomsCount}
                      key='rooms'/>
        ];

        if (myProfile.role === userRoles.customer) {
            return actionSection;
        }

        return [
            ...actionSection,
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
            itemLayout='vertical'
            header={<div className={'rentals-header'}><h1>Rentals</h1>
                {myProfile.role === userRoles.customer ?
                    null
                    : <Button type={'primary'} icon={<AppstoreAddOutlined/>}
                              onClick={() => {
                                  setCurrentRental({});
                                  setRentalModalVisible(true);
                              }
                              }/>}
            </div>}
            size='large'
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={rentals}
            renderItem={rental => (
                <List.Item
                    key={rental._id}
                    actions={getRentalActionSection(rental)}>
                    <List.Item.Meta
                        avatar={<Avatar>{rental.name[0].toUpperCase()}</Avatar>}
                        title={rental.name}
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
    </React.Fragment>;
}
