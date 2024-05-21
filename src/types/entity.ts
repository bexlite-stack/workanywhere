import { JWTPayloadSpec } from "@elysiajs/jwt";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  created_at: number;
}

export interface IWorkplace {
  id: string;
  name: string;
  slug: string;
  type: string;
  city: string;
  address: string;
  images: string | Blob | Blob[];
  created_at: number;
  verified: boolean;
  foodQuality?: number;
  foodPrice?: number;
  toilet?: number;
  internet?: number;
  electricity?: number;
  comfortness?: number;
  quiteness?: number;
}

export interface IReview {
  id: string;
  foodQuality: number;
  foodPrice: number;
  toilet: number;
  internet: number;
  electricity: number;
  comfortness: number;
  quiteness: number;
  review: string;
  userId: string;
  workplaceId: string;
}

export type TUser = false | (Record<string, string | number> & JWTPayloadSpec) | null;
