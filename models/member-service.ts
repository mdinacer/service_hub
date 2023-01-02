import { AssetInput } from "./asset";
import { DurationUnit } from "./duration-unit";
import { LocationInput } from "./location";
import { ServiceAvailability } from "./service-availability";

export type MemberService = {
    name: string;
    description: string;
    price: number;
    location: LocationInput;
    availability: Array<ServiceAvailability>;
    duration: number;
    rating: number;
    tags: [string];
    images: Array<AssetInput>;
    categoryId: string;
    serviceTypeId: string;
    durationUnit: DurationUnit;
}

export type ServiceCreateInput = {
    name: string;
    description: string;
    price: number;
    location: LocationInput;
    availability: Array<ServiceAvailability>;
    duration: number;
    rating: number;
    tags: [string];
    images: Array<AssetInput>;
    categoryId: string;
    serviceTypeId: string;
    durationUnit: DurationUnit;

}