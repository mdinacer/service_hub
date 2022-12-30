import { Asset } from "./asset";

export type MemberProfile = {
  id: string;
  displayName: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  description?: string;
  picture: Asset;
};
