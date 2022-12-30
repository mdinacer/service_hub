import { ServiceType } from "./service-type"

export type ServiceCategory = {
    id: string,
    name: string
    types: Array<ServiceType>
}

export type ServiceCategoryInput = {
    id: string,
}