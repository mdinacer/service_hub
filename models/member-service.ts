import { AssetInput } from "./asset";
import { DurationUnit } from "./duration-unit";
import { LocationInput } from "./location";
import { ServiceCategoryInput } from "./service-category";
import { ServiceTypeInput } from "./service-type";

export type MemberService = {

}

export type ServiceCreateInput = {
    name: string;
    description: string;
    price: number;
    location: LocationInput;
    availability: Date;
    duration: number;
    rating: number;
    tags: [string];
    images: Array<AssetInput>;
    categoryId: string;
    serviceTypeId: string;
    durationUnit: DurationUnit;
}