// ~/types/datePicker.ts
export interface RangeConfig {
    noDisabledRange?: boolean;
    showLastInRange?: boolean;
    minMaxRawRange?: boolean;
    partialRange?: boolean;
    disableTimeRangeValidation?: boolean;
    fixedStart?: boolean;
    fixedEnd?: boolean;
    maxRange?: string | number;
    minRange?: string | number;
    autoRange?: string | number;
}
