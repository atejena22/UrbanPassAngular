import { Time } from "@angular/common";

export interface INotification {
    id?:               number;
    titulo?:           string;
    fechaEstablecida?: Date;
    notas?:            string;
    urbanizationId?:   number;
    urbanization?:     null;
    tiempo?:           Time;
}