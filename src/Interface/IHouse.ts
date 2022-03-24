export interface IHouse {
    houseId?:        number;
    urbanizationId?: number;
    userId?:         number;
    mz?:             string;
    villa?:          string;
    phoneNumber?:    string;
    notes?:          string;
    fullAddress?:    string;
    urbanization?:   null;
    user?:           null;
    guests?:         any[];
}