import { DateTime } from "../interface/search.interface";
export declare const getTimeToDate: (someDate: Date) => DateTime;
export declare const calculatePrevDT: (someDT: DateTime) => DateTime;
export declare const getWeekNumber: (date: Date) => number;
export declare const generateEmptyDateTime: () => DateTime;
export declare const getDefaultDT: () => DateTime;
export declare const PredefinedDT: {
    getPrevYear: () => DateTime;
    getPrevQuarter: () => DateTime;
    getPrevMonth: () => DateTime;
    getPrevWeek: () => DateTime;
    getPrevDay: () => DateTime;
    getCurrentYear: () => DateTime;
    getCurrentQuarter: () => DateTime;
    getCurrentMonth: () => DateTime;
    getCurrentWeek: () => DateTime;
    getCurrentDay: () => DateTime;
    getPrevTwoDay: () => DateTime;
};
