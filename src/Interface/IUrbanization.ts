export interface IUrbanization {
    urbanizationId:      number;
    urbanization1:       string;
    contactNumber:       string;
    contactEmail:        string;
    contactName:         string;
    active:              boolean;
    activeFrom:          Date;
    activeTo:            Date;
    ruc:                 string;
    city:                string;
    country:             string;
    image?:               string;
   // guestacces:          any[];
   // guests:              any[];
   // houses:              any[];
   // notificationdetails: any[];
}
