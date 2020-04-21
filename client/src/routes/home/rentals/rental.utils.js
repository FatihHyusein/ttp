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
    }
};