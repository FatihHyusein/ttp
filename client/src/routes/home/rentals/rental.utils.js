import { AppstoreOutlined, CalendarOutlined, DollarOutlined, ExpandAltOutlined } from '@ant-design/icons';
import React from 'react';

const IconText = ({ icon, text, title }) => (
    <span title={title}>
    {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
  </span>
);

export const rentalUtils = {
    filterData: (rentals, filterKeys) => {
        const filterObjectKeys = Object.keys(filterKeys);

        function filterByMinMax(array, keyIdx) {
            if (filterObjectKeys.length <= keyIdx) {
                return array;
            }

            const key = filterObjectKeys[keyIdx];

            return filterByMinMax(
                array
                    .filter(rental => !filterKeys[key].min || filterKeys[key].min <= rental[key])
                    .filter(rental => !filterKeys[key].max || rental[key] <= filterKeys[key].max),
                keyIdx + 1);
        }


        return filterByMinMax(rentals, 0);
    },

    getDefaultActionSection(rental) {
        return [
            <IconText title={'Date Added'} icon={CalendarOutlined}
                      text={new Date(rental.dateAdded).toDateString()}
                      key='date-added'/>,
            <IconText title={'Floor Area Size'} icon={ExpandAltOutlined} text={rental.floorAreaSize}
                      key='size'/>,
            <IconText title={'Price per month'} icon={DollarOutlined} text={rental.pricePerMonth}
                      key='price-per-month'/>,
            <IconText title={'Number of rooms'} icon={AppstoreOutlined} text={rental.roomsCount}
                      key='rooms'/>
        ];
    }
};