import { Weekday } from "./week-days"

export type ServiceAvailability = {
    day: Weekday,
    startTime: string,
    endTime: string,
}