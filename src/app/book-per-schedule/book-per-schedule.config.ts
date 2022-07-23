import { DEVICE_TYPE } from "../core/config/device.config";

export const DURATION_FILTERS = {
    daily: {
        id: 'daily',
        label: 'Daily',
        allowedDevices: [DEVICE_TYPE.desktop, DEVICE_TYPE.tablet, DEVICE_TYPE.desktop]
    },
    weekly: {
        id: 'weekly',
        label: 'Weekly',
        allowedDevices: [DEVICE_TYPE.tablet, DEVICE_TYPE.desktop]
    },
    monthly: {
        id: 'monthly',
        label: 'Monthly',
        allowedDevices: [DEVICE_TYPE.desktop]
    }
}


export const DEVICE_WISE_FILTER = {
    [DEVICE_TYPE.mobile]: [ DURATION_FILTERS.daily ],
    [DEVICE_TYPE.tablet]: [ DURATION_FILTERS.daily, DURATION_FILTERS.weekly ],
    [DEVICE_TYPE.desktop]: [DURATION_FILTERS.daily, DURATION_FILTERS.weekly, DURATION_FILTERS.monthly ]
}

export const BOOKING_EVENTS_API_RESPONSE_KEYS = {
    [DURATION_FILTERS.daily.id]: 'dayEventList',
    [DURATION_FILTERS.weekly.id]: 'weekEventList',
    [DURATION_FILTERS.monthly.id]: 'monthEventList'
}

export const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DEFAULT_DATE_RANGE_LIST = Array(7).fill({ date: '01/01/2022', slots: []}).map((elm: any, i) => {
    return { ...elm, date: `0${i+1}${elm.date.slice(2)}`}
});