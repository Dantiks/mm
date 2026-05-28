import {LatLngExpression} from "leaflet";

export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp extends SignIn {
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  googleId?: string;
  token: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginError {
  error: string;
  message: string;
  statusCode: number;
}

export interface ValidationError {
  [key: string]: string[];
}

export interface MarkerPosition {
  position: LatLngExpression;
}

export interface MarkerOnMap {
  id: number;
  position: LatLngExpression;
  authorRegion: string;
  authorCity: string;
  mediaLink: string;
  image?: string;
  authorComment?: string | null;
  moderatorComment: string | null;
  userId?: number;
  violationType: ViolationTypeMutation;
  violationTypeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MarkerBeforeModerator {
  authorRegion: string;
  authorCity: string;
  mediaLink: string;
  image: File | null;
  authorComment: string;
  violationTypeId: number;
}

export interface UpdatedMarkerAfterModerator extends MarkerBeforeModerator{
  moderatorComment: string;
}

export interface MarkerBeforeModeratorMutation extends MarkerBeforeModerator{
  id: number;
  moderatorComment?: string;
}

export interface MarkerMutationByModerator {
  authorRegion: string;
  authorCity: string;
  mediaLink: string;
  image: File | string | null | undefined;
  authorComment: string | null | undefined;
  violationTypeId: number;
  moderatorComment: string;
}

export interface ViolationType {
  violationType: string;
}

export interface ViolationTypeCreation extends ViolationType{
  icon: File | null;
}

export interface ViolationTypeUpdate extends ViolationTypeCreation {
  id: number;
}

export interface ViolationTypeMutation extends ViolationType {
  id: number;
  icon: string;
}

export interface UpdateMarkerPayload {
  id: number;
  position?: LatLngExpression;
  authorRegion: string;
  authorCity: string;
  mediaLink: string;
  image: File | null;
  authorComment: string;
  violationTypeId: number;
  moderatorComment: string;
}

export interface ApproveMarker {
  id: number;
  position: LatLngExpression;
  isApproved: boolean;
}