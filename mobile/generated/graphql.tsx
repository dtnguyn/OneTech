import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  devices: DeviceResponse;
  singleDevice?: Maybe<DeviceResponse>;
  hello: Scalars['String'];
  problemImages: ProblemImageResponse;
  reviewImages: ReviewImageResponse;
  notifications: NotificationResponse;
  problems?: Maybe<ProblemResponse>;
  singleProblem: ProblemResponse;
  findProblemStars: ProblemStarResponse;
  reports: ReportResponse;
  reviews: ReviewResponse;
  singleReview: ReviewResponse;
  ratings: ReviewRatingResponse;
  solutions: SolutionResponse;
  singleSolution: SolutionResponse;
  findSolutionStars: SolutionStarResponse;
  users: UserResponse;
  singleUser: UserResponse;
  me?: Maybe<UserResponse>;
  setting?: Maybe<UserSettingResponse>;
};


export type QueryDevicesArgs = {
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  all?: Maybe<Scalars['Boolean']>;
};


export type QuerySingleDeviceArgs = {
  id: Scalars['String'];
};


export type QueryNotificationsArgs = {
  unseen?: Maybe<Scalars['Boolean']>;
};


export type QueryProblemsArgs = {
  content?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['String']>;
  deviceId?: Maybe<Scalars['String']>;
};


export type QuerySingleProblemArgs = {
  id: Scalars['String'];
};


export type QueryFindProblemStarsArgs = {
  problemId: Scalars['String'];
};


export type QueryReviewsArgs = {
  content?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['String']>;
  deviceId?: Maybe<Scalars['String']>;
};


export type QuerySingleReviewArgs = {
  id: Scalars['String'];
};


export type QueryRatingsArgs = {
  deviceId: Scalars['String'];
};


export type QuerySolutionsArgs = {
  userId?: Maybe<Scalars['String']>;
  problemId?: Maybe<Scalars['String']>;
};


export type QuerySingleSolutionArgs = {
  id: Scalars['String'];
};


export type QueryFindSolutionStarsArgs = {
  solutionId: Scalars['String'];
};


export type QuerySingleUserArgs = {
  id: Scalars['String'];
};


export type QuerySettingArgs = {
  userId: Scalars['String'];
};

export type DeviceResponse = {
  __typename?: 'DeviceResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<Device>>;
};

export type Device = {
  __typename?: 'Device';
  id: Scalars['String'];
  name: Scalars['String'];
  brand: Scalars['String'];
  category: Scalars['String'];
  subCategory?: Maybe<Scalars['String']>;
  buyLink?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  coverImage: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  spec?: Maybe<DeviceSpec>;
  problems?: Maybe<Array<DeviceProblem>>;
  followers?: Maybe<Array<DeviceFollower>>;
  reviews?: Maybe<Array<Review>>;
  ratings?: Maybe<Array<ReviewRating>>;
};


export type DeviceSpec = {
  __typename?: 'DeviceSpec';
  deviceId: Scalars['String'];
  display?: Maybe<Scalars['String']>;
  displaySimplify?: Maybe<Scalars['String']>;
  battery?: Maybe<Scalars['String']>;
  batterySimplify?: Maybe<Scalars['String']>;
  software?: Maybe<Scalars['String']>;
  softwareSimplify?: Maybe<Scalars['String']>;
  camera?: Maybe<Scalars['String']>;
  cameraSimplify?: Maybe<Scalars['String']>;
  processor?: Maybe<Scalars['String']>;
  processorSimplify?: Maybe<Scalars['String']>;
  gpu?: Maybe<Scalars['String']>;
  gpuSimplify?: Maybe<Scalars['String']>;
  memory?: Maybe<Scalars['String']>;
  memorySimplify?: Maybe<Scalars['String']>;
  thermals?: Maybe<Scalars['String']>;
  thermalsSimplify?: Maybe<Scalars['String']>;
  ports?: Maybe<Scalars['String']>;
  portsSimplify?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DeviceProblem = {
  __typename?: 'DeviceProblem';
  id: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  solvedBy?: Maybe<Scalars['String']>;
  solver?: Maybe<User>;
  pickedSolutionId?: Maybe<Scalars['String']>;
  pickedSolution?: Maybe<Solution>;
  authorId: Scalars['String'];
  author?: Maybe<User>;
  deviceId: Scalars['String'];
  device: Device;
  stars?: Maybe<Array<DeviceProblemStar>>;
  reports?: Maybe<Array<Report>>;
  solutions?: Maybe<Array<Solution>>;
  images: Array<ProblemImage>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  oauthId: Scalars['String'];
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  avatar: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  setting?: Maybe<UserSetting>;
  reports?: Maybe<Array<Report>>;
  problems?: Maybe<Array<DeviceProblem>>;
  deviceProblemStars?: Maybe<Array<DeviceProblemStar>>;
  solutions?: Maybe<Array<Solution>>;
  solutionStars?: Maybe<Array<SolutionStar>>;
  notifications?: Maybe<Array<Notification>>;
  follows?: Maybe<Array<DeviceFollower>>;
  reviews?: Maybe<Array<Review>>;
  problemSolved?: Maybe<Array<DeviceProblem>>;
};

export type UserSetting = {
  __typename?: 'UserSetting';
  userId: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  notifications: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Report = {
  __typename?: 'Report';
  id: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  authorId: Scalars['String'];
  author: User;
  problemId?: Maybe<Scalars['String']>;
  reviewId?: Maybe<Scalars['String']>;
  solutionId?: Maybe<Scalars['String']>;
};

export type DeviceProblemStar = {
  __typename?: 'DeviceProblemStar';
  userId: Scalars['String'];
  problemId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Solution = {
  __typename?: 'Solution';
  id: Scalars['String'];
  content: Scalars['String'];
  isPicked: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  authorId: Scalars['String'];
  author: User;
  problemId: Scalars['String'];
  problem: DeviceProblem;
  stars?: Maybe<Array<SolutionStar>>;
  reports?: Maybe<Array<Report>>;
  images: Array<SolutionImage>;
};

export type SolutionStar = {
  __typename?: 'SolutionStar';
  userId: Scalars['String'];
  solutionId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SolutionImage = {
  __typename?: 'SolutionImage';
  path: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  solutionId: Scalars['String'];
  solution: Solution;
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  link: Scalars['String'];
  category: Scalars['String'];
  seen: Scalars['Boolean'];
  userId: Scalars['String'];
  user: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type DeviceFollower = {
  __typename?: 'DeviceFollower';
  userId: Scalars['String'];
  deviceId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  rating: ReviewRating;
  authorId: Scalars['String'];
  author: User;
  deviceId: Scalars['String'];
  reports?: Maybe<Array<Report>>;
  images: Array<ReviewImage>;
};

export type ReviewRating = {
  __typename?: 'ReviewRating';
  reviewId: Scalars['String'];
  deviceId: Scalars['String'];
  overall?: Maybe<Scalars['Float']>;
  display?: Maybe<Scalars['Float']>;
  battery?: Maybe<Scalars['Float']>;
  software?: Maybe<Scalars['Float']>;
  camera?: Maybe<Scalars['Float']>;
  processor?: Maybe<Scalars['Float']>;
  gpu?: Maybe<Scalars['Float']>;
  memory?: Maybe<Scalars['Float']>;
  thermals?: Maybe<Scalars['Float']>;
  ports?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ReviewImage = {
  __typename?: 'ReviewImage';
  path: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  reviewId: Scalars['String'];
  review: Review;
};

export type ProblemImage = {
  __typename?: 'ProblemImage';
  path: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  problemId: Scalars['String'];
  problem: DeviceProblem;
};

export type ProblemImageResponse = {
  __typename?: 'ProblemImageResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<ProblemImage>>;
};

export type ReviewImageResponse = {
  __typename?: 'ReviewImageResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<ReviewImage>>;
};

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<Notification>>;
};

export type ProblemResponse = {
  __typename?: 'ProblemResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<DeviceProblem>>;
};

export type ProblemStarResponse = {
  __typename?: 'ProblemStarResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<DeviceProblemStar>>;
};

export type ReportResponse = {
  __typename?: 'ReportResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<Report>>;
};

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<Review>>;
};

export type ReviewRatingResponse = {
  __typename?: 'ReviewRatingResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<ReviewRating>>;
};

export type SolutionResponse = {
  __typename?: 'SolutionResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<Solution>>;
};

export type SolutionStarResponse = {
  __typename?: 'SolutionStarResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<SolutionStar>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<User>>;
};

export type UserSettingResponse = {
  __typename?: 'UserSettingResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<UserSetting>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDevice?: Maybe<DeviceResponse>;
  updateDevice: DeviceResponse;
  deleteDevice: DeviceResponse;
  toggleDeviceFollow: DeviceResponse;
  createSpec?: Maybe<DeviceSpecResponse>;
  updateDeviceSpec: DeviceSpecResponse;
  deleteDeviceSpec: DeviceSpecResponse;
  uploadImage: UploadImageResponse;
  deleteImages: UploadImageResponse;
  deleteNotification: NotificationResponse;
  seenNotifications: NotificationResponse;
  createProblem?: Maybe<ProblemResponse>;
  deleteProblem: ProblemResponse;
  updateProblem: ProblemResponse;
  toggleProblemStar: ProblemResponse;
  createReport: ReportResponse;
  createReview?: Maybe<ReviewResponse>;
  updateReview?: Maybe<ReviewResponse>;
  deleteReview: ReviewResponse;
  createRating?: Maybe<ReviewRatingResponse>;
  updateRating?: Maybe<ReviewRatingResponse>;
  createSolution: SolutionResponse;
  updateSolution: SolutionResponse;
  deleteSolution: SolutionResponse;
  toggleSolutionStar: SolutionResponse;
  toggleSolutionPicked: SolutionResponse;
  createAdminUsers: UserResponse;
  loginAdmin: UserResponse;
  deleteUser: UserResponse;
  logout: UserResponse;
  createSetting: UserSettingResponse;
  updateSetting: UserSettingResponse;
};


export type MutationCreateDeviceArgs = {
  ports_simplify?: Maybe<Scalars['String']>;
  ports?: Maybe<Scalars['String']>;
  thermals_simplify?: Maybe<Scalars['String']>;
  thermals?: Maybe<Scalars['String']>;
  memory_simplify?: Maybe<Scalars['String']>;
  memory?: Maybe<Scalars['String']>;
  gpu_simplify?: Maybe<Scalars['String']>;
  gpu?: Maybe<Scalars['String']>;
  processor_simplify?: Maybe<Scalars['String']>;
  processor?: Maybe<Scalars['String']>;
  camera_simplify?: Maybe<Scalars['String']>;
  camera?: Maybe<Scalars['String']>;
  software_simplify?: Maybe<Scalars['String']>;
  software?: Maybe<Scalars['String']>;
  battery_simplify?: Maybe<Scalars['String']>;
  battery?: Maybe<Scalars['String']>;
  display_simplify?: Maybe<Scalars['String']>;
  display?: Maybe<Scalars['String']>;
  coverImage?: Maybe<Scalars['String']>;
  buyLink?: Maybe<Scalars['String']>;
  subCategory?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  category: Scalars['String'];
  brand: Scalars['String'];
  name: Scalars['String'];
  adminId: Scalars['String'];
};


export type MutationUpdateDeviceArgs = {
  specInput: UpdateDeviceSpecInput;
  deviceInput: UpdateDeviceInput;
  id: Scalars['String'];
  adminId: Scalars['String'];
};


export type MutationDeleteDeviceArgs = {
  adminId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationToggleDeviceFollowArgs = {
  deviceId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateSpecArgs = {
  processor_simplify?: Maybe<Scalars['String']>;
  processor?: Maybe<Scalars['String']>;
  camera_simplify?: Maybe<Scalars['String']>;
  camera?: Maybe<Scalars['String']>;
  software_simplify?: Maybe<Scalars['String']>;
  software?: Maybe<Scalars['String']>;
  battery_simplify?: Maybe<Scalars['String']>;
  battery?: Maybe<Scalars['String']>;
  display_simplify?: Maybe<Scalars['String']>;
  display?: Maybe<Scalars['String']>;
  deviceId: Scalars['String'];
  adminId: Scalars['String'];
};


export type MutationUpdateDeviceSpecArgs = {
  input: UpdateDeviceSpecInput;
  deviceId: Scalars['String'];
  adminId: Scalars['String'];
};


export type MutationDeleteDeviceSpecArgs = {
  adminId: Scalars['String'];
  deviceId: Scalars['String'];
};


export type MutationUploadImageArgs = {
  imageId: Scalars['String'];
  image: Scalars['String'];
};


export type MutationDeleteImagesArgs = {
  imageIds: Array<Scalars['String']>;
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['String'];
};


export type MutationCreateProblemArgs = {
  images: Array<Scalars['String']>;
  deviceId: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteProblemArgs = {
  adminId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationUpdateProblemArgs = {
  images: Array<Scalars['String']>;
  input: UpdateProblemInput;
  id: Scalars['String'];
};


export type MutationToggleProblemStarArgs = {
  problemId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateReportArgs = {
  solutionId?: Maybe<Scalars['String']>;
  reviewId?: Maybe<Scalars['String']>;
  problemId?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateReviewArgs = {
  images: Array<Scalars['String']>;
  ports?: Maybe<Scalars['Float']>;
  thermals?: Maybe<Scalars['Float']>;
  memory?: Maybe<Scalars['Float']>;
  gpu?: Maybe<Scalars['Float']>;
  processor?: Maybe<Scalars['Float']>;
  camera?: Maybe<Scalars['Float']>;
  software?: Maybe<Scalars['Float']>;
  battery?: Maybe<Scalars['Float']>;
  display?: Maybe<Scalars['Float']>;
  overall?: Maybe<Scalars['Float']>;
  deviceId: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateReviewArgs = {
  images: Array<Scalars['String']>;
  ratingInput: UpdateRatingInput;
  reviewInput: UpdateReviewInput;
  id: Scalars['String'];
};


export type MutationDeleteReviewArgs = {
  adminId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationCreateRatingArgs = {
  processor?: Maybe<Scalars['Float']>;
  camera?: Maybe<Scalars['Float']>;
  software?: Maybe<Scalars['Float']>;
  battery?: Maybe<Scalars['Float']>;
  display?: Maybe<Scalars['Float']>;
  overall?: Maybe<Scalars['Float']>;
  deviceId: Scalars['String'];
  reviewId: Scalars['String'];
};


export type MutationUpdateRatingArgs = {
  input: UpdateRatingInput;
  reviewId: Scalars['String'];
};


export type MutationCreateSolutionArgs = {
  images: Array<Scalars['String']>;
  problemId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationUpdateSolutionArgs = {
  images: Array<Scalars['String']>;
  input: UpdateSolutionInput;
  id: Scalars['String'];
};


export type MutationDeleteSolutionArgs = {
  adminId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationToggleSolutionStarArgs = {
  solutionId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationToggleSolutionPickedArgs = {
  solverId: Scalars['String'];
  solutionId: Scalars['String'];
  problemId: Scalars['String'];
};


export type MutationCreateAdminUsersArgs = {
  adminId: Scalars['String'];
};


export type MutationLoginAdminArgs = {
  adminId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  adminId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateSettingArgs = {
  userId: Scalars['String'];
};


export type MutationUpdateSettingArgs = {
  input: UpdateSettingInput;
  userId: Scalars['String'];
};

export type UpdateDeviceSpecInput = {
  display?: Maybe<Scalars['String']>;
  displaySimplify?: Maybe<Scalars['String']>;
  battery?: Maybe<Scalars['String']>;
  batterySimplify?: Maybe<Scalars['String']>;
  software?: Maybe<Scalars['String']>;
  softwareSimplify?: Maybe<Scalars['String']>;
  processor?: Maybe<Scalars['String']>;
  processorSimplify?: Maybe<Scalars['String']>;
  camera?: Maybe<Scalars['String']>;
  cameraSimplify?: Maybe<Scalars['String']>;
  gpu?: Maybe<Scalars['String']>;
  gpuSimplify?: Maybe<Scalars['String']>;
  memory?: Maybe<Scalars['String']>;
  memorySimplify?: Maybe<Scalars['String']>;
  thermals?: Maybe<Scalars['String']>;
  thermalsSimplify?: Maybe<Scalars['String']>;
  ports?: Maybe<Scalars['String']>;
  portsSimplify?: Maybe<Scalars['String']>;
};

export type UpdateDeviceInput = {
  name?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  buyLink?: Maybe<Scalars['String']>;
  coverImage?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
};

export type DeviceSpecResponse = {
  __typename?: 'DeviceSpecResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<DeviceSpec>>;
};

export type UploadImageResponse = {
  __typename?: 'UploadImageResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<Scalars['String']>>;
};

export type UpdateProblemInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  isSolve?: Maybe<Scalars['Boolean']>;
};

export type UpdateRatingInput = {
  overall?: Maybe<Scalars['Float']>;
  display?: Maybe<Scalars['Float']>;
  camera?: Maybe<Scalars['Float']>;
  software?: Maybe<Scalars['Float']>;
  processor?: Maybe<Scalars['Float']>;
  battery?: Maybe<Scalars['Float']>;
  gpu?: Maybe<Scalars['Float']>;
  memory?: Maybe<Scalars['Float']>;
  thermals?: Maybe<Scalars['Float']>;
  ports?: Maybe<Scalars['Float']>;
};

export type UpdateReviewInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type UpdateSolutionInput = {
  content?: Maybe<Scalars['String']>;
  isPicked?: Maybe<Scalars['Boolean']>;
};

export type UpdateSettingInput = {
  isPrivate?: Maybe<Scalars['Boolean']>;
  notifications?: Maybe<Scalars['Boolean']>;
};

export type ToggleDeviceFollowMutationVariables = Exact<{
  deviceId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type ToggleDeviceFollowMutation = (
  { __typename?: 'Mutation' }
  & { toggleDeviceFollow: (
    { __typename?: 'DeviceResponse' }
    & Pick<DeviceResponse, 'status' | 'message'>
  ) }
);

export type UploadImageMutationVariables = Exact<{
  image: Scalars['String'];
  imageId: Scalars['String'];
}>;


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & { uploadImage: (
    { __typename?: 'UploadImageResponse' }
    & Pick<UploadImageResponse, 'status' | 'message' | 'data'>
  ) }
);

export type DeleteImagesMutationVariables = Exact<{
  imageIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteImagesMutation = (
  { __typename?: 'Mutation' }
  & { deleteImages: (
    { __typename?: 'UploadImageResponse' }
    & Pick<UploadImageResponse, 'status' | 'message'>
  ) }
);

export type DeleteNotificationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteNotificationMutation = (
  { __typename?: 'Mutation' }
  & { deleteNotification: (
    { __typename?: 'NotificationResponse' }
    & Pick<NotificationResponse, 'status' | 'message'>
  ) }
);

export type SeenNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type SeenNotificationsMutation = (
  { __typename?: 'Mutation' }
  & { seenNotifications: (
    { __typename?: 'NotificationResponse' }
    & Pick<NotificationResponse, 'status' | 'message'>
  ) }
);

export type ToggleProblemStarMutationVariables = Exact<{
  problemId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type ToggleProblemStarMutation = (
  { __typename?: 'Mutation' }
  & { toggleProblemStar: (
    { __typename?: 'ProblemResponse' }
    & Pick<ProblemResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'DeviceProblem' }
      & Pick<DeviceProblem, 'id' | 'title' | 'content' | 'solvedBy' | 'createdAt' | 'updatedAt'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      )>, stars?: Maybe<Array<(
        { __typename?: 'DeviceProblemStar' }
        & Pick<DeviceProblemStar, 'problemId' | 'userId'>
      )>>, solutions?: Maybe<Array<(
        { __typename?: 'Solution' }
        & Pick<Solution, 'id'>
      )>>, images: Array<(
        { __typename?: 'ProblemImage' }
        & Pick<ProblemImage, 'path'>
      )> }
    )>> }
  ) }
);

export type CreateProblemMutationVariables = Exact<{
  deviceId: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  images: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateProblemMutation = (
  { __typename?: 'Mutation' }
  & { createProblem?: Maybe<(
    { __typename?: 'ProblemResponse' }
    & Pick<ProblemResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'DeviceProblem' }
      & Pick<DeviceProblem, 'id' | 'title' | 'content' | 'solvedBy' | 'createdAt' | 'updatedAt'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      )>, stars?: Maybe<Array<(
        { __typename?: 'DeviceProblemStar' }
        & Pick<DeviceProblemStar, 'problemId' | 'userId'>
      )>>, solutions?: Maybe<Array<(
        { __typename?: 'Solution' }
        & Pick<Solution, 'id'>
      )>>, images: Array<(
        { __typename?: 'ProblemImage' }
        & Pick<ProblemImage, 'path'>
      )> }
    )>> }
  )> }
);

export type DeleteProblemMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProblemMutation = (
  { __typename?: 'Mutation' }
  & { deleteProblem: (
    { __typename?: 'ProblemResponse' }
    & Pick<ProblemResponse, 'status' | 'message'>
  ) }
);

export type UpdateProblemMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  images: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateProblemMutation = (
  { __typename?: 'Mutation' }
  & { updateProblem: (
    { __typename?: 'ProblemResponse' }
    & Pick<ProblemResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'DeviceProblem' }
      & Pick<DeviceProblem, 'id' | 'title' | 'content' | 'solvedBy' | 'createdAt' | 'updatedAt'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      )>, stars?: Maybe<Array<(
        { __typename?: 'DeviceProblemStar' }
        & Pick<DeviceProblemStar, 'problemId' | 'userId'>
      )>>, solutions?: Maybe<Array<(
        { __typename?: 'Solution' }
        & Pick<Solution, 'id'>
      )>>, images: Array<(
        { __typename?: 'ProblemImage' }
        & Pick<ProblemImage, 'path'>
      )> }
    )>> }
  ) }
);

export type CreateReportMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  problemId?: Maybe<Scalars['String']>;
  solutionId?: Maybe<Scalars['String']>;
  reviewId?: Maybe<Scalars['String']>;
}>;


export type CreateReportMutation = (
  { __typename?: 'Mutation' }
  & { createReport: (
    { __typename?: 'ReportResponse' }
    & Pick<ReportResponse, 'status' | 'message'>
  ) }
);

export type CreateReviewMutationVariables = Exact<{
  deviceId: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  overall?: Maybe<Scalars['Float']>;
  display?: Maybe<Scalars['Float']>;
  processor?: Maybe<Scalars['Float']>;
  battery?: Maybe<Scalars['Float']>;
  software?: Maybe<Scalars['Float']>;
  camera?: Maybe<Scalars['Float']>;
  gpu?: Maybe<Scalars['Float']>;
  memory?: Maybe<Scalars['Float']>;
  thermals?: Maybe<Scalars['Float']>;
  ports?: Maybe<Scalars['Float']>;
  images: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & { createReview?: Maybe<(
    { __typename?: 'ReviewResponse' }
    & Pick<ReviewResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'title' | 'content' | 'createdAt' | 'deviceId'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ), rating: (
        { __typename?: 'ReviewRating' }
        & Pick<ReviewRating, 'reviewId' | 'deviceId' | 'overall' | 'battery' | 'software' | 'display' | 'camera' | 'processor' | 'gpu' | 'memory' | 'thermals' | 'ports'>
      ) }
    )>> }
  )> }
);

export type UpdateReviewMutationVariables = Exact<{
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  overall?: Maybe<Scalars['Float']>;
  display?: Maybe<Scalars['Float']>;
  processor?: Maybe<Scalars['Float']>;
  battery?: Maybe<Scalars['Float']>;
  software?: Maybe<Scalars['Float']>;
  camera?: Maybe<Scalars['Float']>;
  gpu?: Maybe<Scalars['Float']>;
  memory?: Maybe<Scalars['Float']>;
  thermals?: Maybe<Scalars['Float']>;
  ports?: Maybe<Scalars['Float']>;
  images: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateReviewMutation = (
  { __typename?: 'Mutation' }
  & { updateReview?: Maybe<(
    { __typename?: 'ReviewResponse' }
    & Pick<ReviewResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'title' | 'content' | 'createdAt' | 'deviceId'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ), rating: (
        { __typename?: 'ReviewRating' }
        & Pick<ReviewRating, 'reviewId' | 'deviceId' | 'overall' | 'battery' | 'software' | 'display' | 'camera' | 'processor' | 'gpu' | 'memory' | 'thermals' | 'ports'>
      ) }
    )>> }
  )> }
);

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteReviewMutation = (
  { __typename?: 'Mutation' }
  & { deleteReview: (
    { __typename?: 'ReviewResponse' }
    & Pick<ReviewResponse, 'status' | 'message'>
  ) }
);

export type CreateSolutionMutationVariables = Exact<{
  problemId: Scalars['String'];
  content: Scalars['String'];
  images: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateSolutionMutation = (
  { __typename?: 'Mutation' }
  & { createSolution: (
    { __typename?: 'SolutionResponse' }
    & Pick<SolutionResponse, 'status' | 'message'>
  ) }
);

export type DeleteSolutionMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteSolutionMutation = (
  { __typename?: 'Mutation' }
  & { deleteSolution: (
    { __typename?: 'SolutionResponse' }
    & Pick<SolutionResponse, 'status' | 'message'>
  ) }
);

export type UpdateSolutionMutationVariables = Exact<{
  id: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  isPicked?: Maybe<Scalars['Boolean']>;
  images: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateSolutionMutation = (
  { __typename?: 'Mutation' }
  & { updateSolution: (
    { __typename?: 'SolutionResponse' }
    & Pick<SolutionResponse, 'status' | 'message'>
  ) }
);

export type ToggleSolutionStarMutationVariables = Exact<{
  userId: Scalars['String'];
  solutionId: Scalars['String'];
}>;


export type ToggleSolutionStarMutation = (
  { __typename?: 'Mutation' }
  & { toggleSolutionStar: (
    { __typename?: 'SolutionResponse' }
    & Pick<SolutionResponse, 'status' | 'message'>
  ) }
);

export type ToggleSolutionPickedMutationVariables = Exact<{
  solutionId: Scalars['String'];
  problemId: Scalars['String'];
  solverId: Scalars['String'];
}>;


export type ToggleSolutionPickedMutation = (
  { __typename?: 'Mutation' }
  & { toggleSolutionPicked: (
    { __typename?: 'SolutionResponse' }
    & Pick<SolutionResponse, 'status' | 'message'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'status' | 'message'>
  ) }
);

export type UpdateUserSettingMutationVariables = Exact<{
  userId: Scalars['String'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  notifications?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateUserSettingMutation = (
  { __typename?: 'Mutation' }
  & { updateSetting: (
    { __typename?: 'UserSettingResponse' }
    & Pick<UserSettingResponse, 'status' | 'message'>
  ) }
);

export type DevicesQueryVariables = Exact<{
  all?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
}>;


export type DevicesQuery = (
  { __typename?: 'Query' }
  & { devices: (
    { __typename?: 'DeviceResponse' }
    & Pick<DeviceResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'Device' }
      & Pick<Device, 'id' | 'brand' | 'name' | 'category' | 'coverImage'>
      & { followers?: Maybe<Array<(
        { __typename?: 'DeviceFollower' }
        & Pick<DeviceFollower, 'userId'>
      )>>, problems?: Maybe<Array<(
        { __typename?: 'DeviceProblem' }
        & Pick<DeviceProblem, 'id'>
      )>>, reviews?: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id'>
      )>> }
    )>> }
  ) }
);

export type DeviceDetailQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeviceDetailQuery = (
  { __typename?: 'Query' }
  & { singleDevice?: Maybe<(
    { __typename?: 'DeviceResponse' }
    & Pick<DeviceResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'Device' }
      & Pick<Device, 'id' | 'brand' | 'name' | 'category' | 'price' | 'buyLink' | 'coverImage'>
      & { followers?: Maybe<Array<(
        { __typename?: 'DeviceFollower' }
        & Pick<DeviceFollower, 'userId'>
      )>>, ratings?: Maybe<Array<(
        { __typename?: 'ReviewRating' }
        & Pick<ReviewRating, 'reviewId' | 'deviceId' | 'overall' | 'battery' | 'software' | 'display' | 'camera' | 'processor'>
      )>>, problems?: Maybe<Array<(
        { __typename?: 'DeviceProblem' }
        & Pick<DeviceProblem, 'id' | 'title' | 'content' | 'solvedBy' | 'createdAt' | 'updatedAt'>
        & { author?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'username' | 'avatar'>
        )>, stars?: Maybe<Array<(
          { __typename?: 'DeviceProblemStar' }
          & Pick<DeviceProblemStar, 'problemId' | 'userId'>
        )>>, solutions?: Maybe<Array<(
          { __typename?: 'Solution' }
          & Pick<Solution, 'id'>
        )>>, images: Array<(
          { __typename?: 'ProblemImage' }
          & Pick<ProblemImage, 'path'>
        )> }
      )>>, reviews?: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'title' | 'content' | 'createdAt' | 'deviceId'>
        & { images: Array<(
          { __typename?: 'ReviewImage' }
          & Pick<ReviewImage, 'path'>
        )>, author: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'username' | 'avatar'>
        ), rating: (
          { __typename?: 'ReviewRating' }
          & Pick<ReviewRating, 'reviewId' | 'deviceId' | 'overall' | 'battery' | 'software' | 'display' | 'camera' | 'processor'>
        ) }
      )>>, spec?: Maybe<(
        { __typename?: 'DeviceSpec' }
        & Pick<DeviceSpec, 'display' | 'battery' | 'software' | 'camera' | 'processor' | 'gpu' | 'memory' | 'thermals' | 'ports' | 'displaySimplify' | 'batterySimplify' | 'softwareSimplify' | 'cameraSimplify' | 'processorSimplify' | 'gpuSimplify' | 'memorySimplify' | 'thermalsSimplify' | 'portsSimplify'>
      )> }
    )>> }
  )> }
);

export type DeviceRatingsQueryVariables = Exact<{
  deviceId: Scalars['String'];
}>;


export type DeviceRatingsQuery = (
  { __typename?: 'Query' }
  & { ratings: (
    { __typename?: 'ReviewRatingResponse' }
    & Pick<ReviewRatingResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'ReviewRating' }
      & Pick<ReviewRating, 'overall' | 'display' | 'camera' | 'software' | 'battery' | 'processor' | 'ports' | 'gpu' | 'memory' | 'thermals'>
    )>> }
  ) }
);

export type NotificationsQueryVariables = Exact<{
  unseen?: Maybe<Scalars['Boolean']>;
}>;


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { notifications: (
    { __typename?: 'NotificationResponse' }
    & Pick<NotificationResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'Notification' }
      & Pick<Notification, 'id' | 'title' | 'content' | 'link' | 'seen' | 'category' | 'createdAt'>
    )>> }
  ) }
);

export type ProblemsQueryVariables = Exact<{
  deviceId?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
}>;


export type ProblemsQuery = (
  { __typename?: 'Query' }
  & { problems?: Maybe<(
    { __typename?: 'ProblemResponse' }
    & { data?: Maybe<Array<(
      { __typename?: 'DeviceProblem' }
      & Pick<DeviceProblem, 'id' | 'title' | 'content' | 'solvedBy' | 'createdAt' | 'updatedAt'>
      & { device: (
        { __typename?: 'Device' }
        & Pick<Device, 'id' | 'name'>
      ), images: Array<(
        { __typename?: 'ProblemImage' }
        & Pick<ProblemImage, 'path'>
      )>, author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'avatar' | 'username'>
        & { setting?: Maybe<(
          { __typename?: 'UserSetting' }
          & Pick<UserSetting, 'isPrivate'>
        )> }
      )>, stars?: Maybe<Array<(
        { __typename?: 'DeviceProblemStar' }
        & Pick<DeviceProblemStar, 'problemId' | 'userId'>
      )>>, solutions?: Maybe<Array<(
        { __typename?: 'Solution' }
        & Pick<Solution, 'id'>
      )>> }
    )>> }
  )> }
);

export type ProblemDetailQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProblemDetailQuery = (
  { __typename?: 'Query' }
  & { singleProblem: (
    { __typename?: 'ProblemResponse' }
    & Pick<ProblemResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'DeviceProblem' }
      & Pick<DeviceProblem, 'id' | 'title' | 'content' | 'solvedBy' | 'pickedSolutionId' | 'createdAt' | 'updatedAt'>
      & { images: Array<(
        { __typename?: 'ProblemImage' }
        & Pick<ProblemImage, 'path'>
      )>, author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'avatar' | 'username'>
      )>, stars?: Maybe<Array<(
        { __typename?: 'DeviceProblemStar' }
        & Pick<DeviceProblemStar, 'problemId' | 'userId'>
      )>>, solutions?: Maybe<Array<(
        { __typename?: 'Solution' }
        & Pick<Solution, 'id' | 'problemId' | 'content' | 'isPicked' | 'createdAt' | 'updatedAt'>
        & { author: (
          { __typename?: 'User' }
          & Pick<User, 'username' | 'id' | 'avatar'>
        ), stars?: Maybe<Array<(
          { __typename?: 'SolutionStar' }
          & Pick<SolutionStar, 'userId'>
        )>>, images: Array<(
          { __typename?: 'SolutionImage' }
          & Pick<SolutionImage, 'path'>
        )> }
      )>> }
    )>> }
  ) }
);

export type ReviewsQueryVariables = Exact<{
  deviceId?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
}>;


export type ReviewsQuery = (
  { __typename?: 'Query' }
  & { reviews: (
    { __typename?: 'ReviewResponse' }
    & { data?: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'title' | 'content' | 'createdAt' | 'deviceId'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      ), images: Array<(
        { __typename?: 'ReviewImage' }
        & Pick<ReviewImage, 'path'>
      )>, rating: (
        { __typename?: 'ReviewRating' }
        & Pick<ReviewRating, 'reviewId' | 'deviceId' | 'overall' | 'battery' | 'software' | 'display' | 'camera' | 'processor' | 'gpu' | 'memory' | 'thermals' | 'ports'>
      ) }
    )>> }
  ) }
);

export type SolutionsQueryVariables = Exact<{
  userId?: Maybe<Scalars['String']>;
  problemId?: Maybe<Scalars['String']>;
}>;


export type SolutionsQuery = (
  { __typename?: 'Query' }
  & { solutions: (
    { __typename?: 'SolutionResponse' }
    & Pick<SolutionResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'Solution' }
      & Pick<Solution, 'id' | 'problemId' | 'content' | 'isPicked' | 'createdAt' | 'updatedAt'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'id' | 'avatar'>
        & { setting?: Maybe<(
          { __typename?: 'UserSetting' }
          & Pick<UserSetting, 'isPrivate'>
        )> }
      ), problem: (
        { __typename?: 'DeviceProblem' }
        & Pick<DeviceProblem, 'id' | 'title' | 'content'>
      ), stars?: Maybe<Array<(
        { __typename?: 'SolutionStar' }
        & Pick<SolutionStar, 'userId'>
      )>>, images: Array<(
        { __typename?: 'SolutionImage' }
        & Pick<SolutionImage, 'path'>
      )> }
    )>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'status'>
    & { data?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'oauthId' | 'username' | 'email' | 'avatar'>
      & { setting?: Maybe<(
        { __typename?: 'UserSetting' }
        & Pick<UserSetting, 'notifications'>
      )>, solutions?: Maybe<Array<(
        { __typename?: 'Solution' }
        & { stars?: Maybe<Array<(
          { __typename?: 'SolutionStar' }
          & Pick<SolutionStar, 'userId'>
        )>> }
      )>>, problems?: Maybe<Array<(
        { __typename?: 'DeviceProblem' }
        & { stars?: Maybe<Array<(
          { __typename?: 'DeviceProblemStar' }
          & Pick<DeviceProblemStar, 'userId'>
        )>> }
      )>>, problemSolved?: Maybe<Array<(
        { __typename?: 'DeviceProblem' }
        & Pick<DeviceProblem, 'id'>
      )>> }
    )>> }
  )> }
);

export type SingleUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SingleUserQuery = (
  { __typename?: 'Query' }
  & { singleUser: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'status'>
    & { data?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'oauthId' | 'username' | 'email' | 'avatar'>
      & { setting?: Maybe<(
        { __typename?: 'UserSetting' }
        & Pick<UserSetting, 'isPrivate'>
      )>, solutions?: Maybe<Array<(
        { __typename?: 'Solution' }
        & { stars?: Maybe<Array<(
          { __typename?: 'SolutionStar' }
          & Pick<SolutionStar, 'userId'>
        )>> }
      )>>, problems?: Maybe<Array<(
        { __typename?: 'DeviceProblem' }
        & { stars?: Maybe<Array<(
          { __typename?: 'DeviceProblemStar' }
          & Pick<DeviceProblemStar, 'userId'>
        )>> }
      )>>, problemSolved?: Maybe<Array<(
        { __typename?: 'DeviceProblem' }
        & Pick<DeviceProblem, 'id'>
      )>> }
    )>> }
  ) }
);

export type SettingQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type SettingQuery = (
  { __typename?: 'Query' }
  & { setting?: Maybe<(
    { __typename?: 'UserSettingResponse' }
    & Pick<UserSettingResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'UserSetting' }
      & Pick<UserSetting, 'userId' | 'isPrivate' | 'notifications'>
    )>> }
  )> }
);


export const ToggleDeviceFollowDocument = gql`
    mutation ToggleDeviceFollow($deviceId: String!, $userId: String!) {
  toggleDeviceFollow(deviceId: $deviceId, userId: $userId) {
    status
    message
  }
}
    `;
export type ToggleDeviceFollowMutationFn = Apollo.MutationFunction<ToggleDeviceFollowMutation, ToggleDeviceFollowMutationVariables>;

/**
 * __useToggleDeviceFollowMutation__
 *
 * To run a mutation, you first call `useToggleDeviceFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleDeviceFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleDeviceFollowMutation, { data, loading, error }] = useToggleDeviceFollowMutation({
 *   variables: {
 *      deviceId: // value for 'deviceId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useToggleDeviceFollowMutation(baseOptions?: Apollo.MutationHookOptions<ToggleDeviceFollowMutation, ToggleDeviceFollowMutationVariables>) {
        return Apollo.useMutation<ToggleDeviceFollowMutation, ToggleDeviceFollowMutationVariables>(ToggleDeviceFollowDocument, baseOptions);
      }
export type ToggleDeviceFollowMutationHookResult = ReturnType<typeof useToggleDeviceFollowMutation>;
export type ToggleDeviceFollowMutationResult = Apollo.MutationResult<ToggleDeviceFollowMutation>;
export type ToggleDeviceFollowMutationOptions = Apollo.BaseMutationOptions<ToggleDeviceFollowMutation, ToggleDeviceFollowMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($image: String!, $imageId: String!) {
  uploadImage(image: $image, imageId: $imageId) {
    status
    message
    data
  }
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *      imageId: // value for 'imageId'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, baseOptions);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const DeleteImagesDocument = gql`
    mutation DeleteImages($imageIds: [String!]!) {
  deleteImages(imageIds: $imageIds) {
    status
    message
  }
}
    `;
export type DeleteImagesMutationFn = Apollo.MutationFunction<DeleteImagesMutation, DeleteImagesMutationVariables>;

/**
 * __useDeleteImagesMutation__
 *
 * To run a mutation, you first call `useDeleteImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteImagesMutation, { data, loading, error }] = useDeleteImagesMutation({
 *   variables: {
 *      imageIds: // value for 'imageIds'
 *   },
 * });
 */
export function useDeleteImagesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteImagesMutation, DeleteImagesMutationVariables>) {
        return Apollo.useMutation<DeleteImagesMutation, DeleteImagesMutationVariables>(DeleteImagesDocument, baseOptions);
      }
export type DeleteImagesMutationHookResult = ReturnType<typeof useDeleteImagesMutation>;
export type DeleteImagesMutationResult = Apollo.MutationResult<DeleteImagesMutation>;
export type DeleteImagesMutationOptions = Apollo.BaseMutationOptions<DeleteImagesMutation, DeleteImagesMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation deleteNotification($id: String!) {
  deleteNotification(id: $id) {
    status
    message
  }
}
    `;
export type DeleteNotificationMutationFn = Apollo.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        return Apollo.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, baseOptions);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const SeenNotificationsDocument = gql`
    mutation seenNotifications {
  seenNotifications {
    status
    message
  }
}
    `;
export type SeenNotificationsMutationFn = Apollo.MutationFunction<SeenNotificationsMutation, SeenNotificationsMutationVariables>;

/**
 * __useSeenNotificationsMutation__
 *
 * To run a mutation, you first call `useSeenNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeenNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seenNotificationsMutation, { data, loading, error }] = useSeenNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useSeenNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<SeenNotificationsMutation, SeenNotificationsMutationVariables>) {
        return Apollo.useMutation<SeenNotificationsMutation, SeenNotificationsMutationVariables>(SeenNotificationsDocument, baseOptions);
      }
export type SeenNotificationsMutationHookResult = ReturnType<typeof useSeenNotificationsMutation>;
export type SeenNotificationsMutationResult = Apollo.MutationResult<SeenNotificationsMutation>;
export type SeenNotificationsMutationOptions = Apollo.BaseMutationOptions<SeenNotificationsMutation, SeenNotificationsMutationVariables>;
export const ToggleProblemStarDocument = gql`
    mutation ToggleProblemStar($problemId: String!, $userId: String!) {
  toggleProblemStar(problemId: $problemId, userId: $userId) {
    status
    message
    data {
      id
      title
      content
      solvedBy
      createdAt
      updatedAt
      author {
        id
        username
        avatar
      }
      stars {
        problemId
        userId
      }
      solutions {
        id
      }
      images {
        path
      }
    }
  }
}
    `;
export type ToggleProblemStarMutationFn = Apollo.MutationFunction<ToggleProblemStarMutation, ToggleProblemStarMutationVariables>;

/**
 * __useToggleProblemStarMutation__
 *
 * To run a mutation, you first call `useToggleProblemStarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleProblemStarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleProblemStarMutation, { data, loading, error }] = useToggleProblemStarMutation({
 *   variables: {
 *      problemId: // value for 'problemId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useToggleProblemStarMutation(baseOptions?: Apollo.MutationHookOptions<ToggleProblemStarMutation, ToggleProblemStarMutationVariables>) {
        return Apollo.useMutation<ToggleProblemStarMutation, ToggleProblemStarMutationVariables>(ToggleProblemStarDocument, baseOptions);
      }
export type ToggleProblemStarMutationHookResult = ReturnType<typeof useToggleProblemStarMutation>;
export type ToggleProblemStarMutationResult = Apollo.MutationResult<ToggleProblemStarMutation>;
export type ToggleProblemStarMutationOptions = Apollo.BaseMutationOptions<ToggleProblemStarMutation, ToggleProblemStarMutationVariables>;
export const CreateProblemDocument = gql`
    mutation CreateProblem($deviceId: String!, $title: String!, $content: String!, $images: [String!]!) {
  createProblem(
    deviceId: $deviceId
    title: $title
    content: $content
    images: $images
  ) {
    status
    message
    data {
      id
      title
      content
      solvedBy
      createdAt
      updatedAt
      author {
        id
        username
        avatar
      }
      stars {
        problemId
        userId
      }
      solutions {
        id
      }
      images {
        path
      }
    }
  }
}
    `;
export type CreateProblemMutationFn = Apollo.MutationFunction<CreateProblemMutation, CreateProblemMutationVariables>;

/**
 * __useCreateProblemMutation__
 *
 * To run a mutation, you first call `useCreateProblemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProblemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProblemMutation, { data, loading, error }] = useCreateProblemMutation({
 *   variables: {
 *      deviceId: // value for 'deviceId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useCreateProblemMutation(baseOptions?: Apollo.MutationHookOptions<CreateProblemMutation, CreateProblemMutationVariables>) {
        return Apollo.useMutation<CreateProblemMutation, CreateProblemMutationVariables>(CreateProblemDocument, baseOptions);
      }
export type CreateProblemMutationHookResult = ReturnType<typeof useCreateProblemMutation>;
export type CreateProblemMutationResult = Apollo.MutationResult<CreateProblemMutation>;
export type CreateProblemMutationOptions = Apollo.BaseMutationOptions<CreateProblemMutation, CreateProblemMutationVariables>;
export const DeleteProblemDocument = gql`
    mutation DeleteProblem($id: String!) {
  deleteProblem(id: $id) {
    status
    message
  }
}
    `;
export type DeleteProblemMutationFn = Apollo.MutationFunction<DeleteProblemMutation, DeleteProblemMutationVariables>;

/**
 * __useDeleteProblemMutation__
 *
 * To run a mutation, you first call `useDeleteProblemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProblemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProblemMutation, { data, loading, error }] = useDeleteProblemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProblemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProblemMutation, DeleteProblemMutationVariables>) {
        return Apollo.useMutation<DeleteProblemMutation, DeleteProblemMutationVariables>(DeleteProblemDocument, baseOptions);
      }
export type DeleteProblemMutationHookResult = ReturnType<typeof useDeleteProblemMutation>;
export type DeleteProblemMutationResult = Apollo.MutationResult<DeleteProblemMutation>;
export type DeleteProblemMutationOptions = Apollo.BaseMutationOptions<DeleteProblemMutation, DeleteProblemMutationVariables>;
export const UpdateProblemDocument = gql`
    mutation UpdateProblem($id: String!, $title: String!, $content: String!, $images: [String!]!) {
  updateProblem(
    id: $id
    input: {title: $title, content: $content}
    images: $images
  ) {
    status
    message
    data {
      id
      title
      content
      solvedBy
      createdAt
      updatedAt
      author {
        id
        username
        avatar
      }
      stars {
        problemId
        userId
      }
      solutions {
        id
      }
      images {
        path
      }
    }
  }
}
    `;
export type UpdateProblemMutationFn = Apollo.MutationFunction<UpdateProblemMutation, UpdateProblemMutationVariables>;

/**
 * __useUpdateProblemMutation__
 *
 * To run a mutation, you first call `useUpdateProblemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProblemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProblemMutation, { data, loading, error }] = useUpdateProblemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useUpdateProblemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProblemMutation, UpdateProblemMutationVariables>) {
        return Apollo.useMutation<UpdateProblemMutation, UpdateProblemMutationVariables>(UpdateProblemDocument, baseOptions);
      }
export type UpdateProblemMutationHookResult = ReturnType<typeof useUpdateProblemMutation>;
export type UpdateProblemMutationResult = Apollo.MutationResult<UpdateProblemMutation>;
export type UpdateProblemMutationOptions = Apollo.BaseMutationOptions<UpdateProblemMutation, UpdateProblemMutationVariables>;
export const CreateReportDocument = gql`
    mutation createReport($title: String!, $content: String!, $problemId: String, $solutionId: String, $reviewId: String) {
  createReport(
    title: $title
    content: $content
    problemId: $problemId
    solutionId: $solutionId
    reviewId: $reviewId
  ) {
    status
    message
  }
}
    `;
export type CreateReportMutationFn = Apollo.MutationFunction<CreateReportMutation, CreateReportMutationVariables>;

/**
 * __useCreateReportMutation__
 *
 * To run a mutation, you first call `useCreateReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportMutation, { data, loading, error }] = useCreateReportMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      problemId: // value for 'problemId'
 *      solutionId: // value for 'solutionId'
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useCreateReportMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportMutation, CreateReportMutationVariables>) {
        return Apollo.useMutation<CreateReportMutation, CreateReportMutationVariables>(CreateReportDocument, baseOptions);
      }
export type CreateReportMutationHookResult = ReturnType<typeof useCreateReportMutation>;
export type CreateReportMutationResult = Apollo.MutationResult<CreateReportMutation>;
export type CreateReportMutationOptions = Apollo.BaseMutationOptions<CreateReportMutation, CreateReportMutationVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($deviceId: String!, $title: String!, $content: String!, $overall: Float, $display: Float, $processor: Float, $battery: Float, $software: Float, $camera: Float, $gpu: Float, $memory: Float, $thermals: Float, $ports: Float, $images: [String!]!) {
  createReview(
    deviceId: $deviceId
    content: $content
    title: $title
    overall: $overall
    battery: $battery
    software: $software
    display: $display
    processor: $processor
    camera: $camera
    images: $images
    gpu: $gpu
    memory: $memory
    thermals: $thermals
    ports: $ports
  ) {
    status
    message
    data {
      id
      title
      content
      createdAt
      author {
        id
        username
        avatar
      }
      deviceId
      rating {
        reviewId
        deviceId
        overall
        battery
        software
        display
        camera
        processor
        gpu
        memory
        thermals
        ports
      }
    }
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      deviceId: // value for 'deviceId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      overall: // value for 'overall'
 *      display: // value for 'display'
 *      processor: // value for 'processor'
 *      battery: // value for 'battery'
 *      software: // value for 'software'
 *      camera: // value for 'camera'
 *      gpu: // value for 'gpu'
 *      memory: // value for 'memory'
 *      thermals: // value for 'thermals'
 *      ports: // value for 'ports'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, baseOptions);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const UpdateReviewDocument = gql`
    mutation UpdateReview($id: String!, $title: String, $content: String, $overall: Float, $display: Float, $processor: Float, $battery: Float, $software: Float, $camera: Float, $gpu: Float, $memory: Float, $thermals: Float, $ports: Float, $images: [String!]!) {
  updateReview(
    id: $id
    reviewInput: {title: $title, content: $content}
    ratingInput: {overall: $overall, battery: $battery, software: $software, display: $display, processor: $processor, camera: $camera, gpu: $gpu, memory: $memory, thermals: $thermals, ports: $ports}
    images: $images
  ) {
    status
    message
    data {
      id
      title
      content
      createdAt
      author {
        id
        username
        avatar
      }
      deviceId
      rating {
        reviewId
        deviceId
        overall
        battery
        software
        display
        camera
        processor
        gpu
        memory
        thermals
        ports
      }
    }
  }
}
    `;
export type UpdateReviewMutationFn = Apollo.MutationFunction<UpdateReviewMutation, UpdateReviewMutationVariables>;

/**
 * __useUpdateReviewMutation__
 *
 * To run a mutation, you first call `useUpdateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReviewMutation, { data, loading, error }] = useUpdateReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      overall: // value for 'overall'
 *      display: // value for 'display'
 *      processor: // value for 'processor'
 *      battery: // value for 'battery'
 *      software: // value for 'software'
 *      camera: // value for 'camera'
 *      gpu: // value for 'gpu'
 *      memory: // value for 'memory'
 *      thermals: // value for 'thermals'
 *      ports: // value for 'ports'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useUpdateReviewMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReviewMutation, UpdateReviewMutationVariables>) {
        return Apollo.useMutation<UpdateReviewMutation, UpdateReviewMutationVariables>(UpdateReviewDocument, baseOptions);
      }
export type UpdateReviewMutationHookResult = ReturnType<typeof useUpdateReviewMutation>;
export type UpdateReviewMutationResult = Apollo.MutationResult<UpdateReviewMutation>;
export type UpdateReviewMutationOptions = Apollo.BaseMutationOptions<UpdateReviewMutation, UpdateReviewMutationVariables>;
export const DeleteReviewDocument = gql`
    mutation DeleteReview($id: String!) {
  deleteReview(id: $id) {
    status
    message
  }
}
    `;
export type DeleteReviewMutationFn = Apollo.MutationFunction<DeleteReviewMutation, DeleteReviewMutationVariables>;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReviewMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReviewMutation, DeleteReviewMutationVariables>) {
        return Apollo.useMutation<DeleteReviewMutation, DeleteReviewMutationVariables>(DeleteReviewDocument, baseOptions);
      }
export type DeleteReviewMutationHookResult = ReturnType<typeof useDeleteReviewMutation>;
export type DeleteReviewMutationResult = Apollo.MutationResult<DeleteReviewMutation>;
export type DeleteReviewMutationOptions = Apollo.BaseMutationOptions<DeleteReviewMutation, DeleteReviewMutationVariables>;
export const CreateSolutionDocument = gql`
    mutation CreateSolution($problemId: String!, $content: String!, $images: [String!]!) {
  createSolution(problemId: $problemId, content: $content, images: $images) {
    status
    message
  }
}
    `;
export type CreateSolutionMutationFn = Apollo.MutationFunction<CreateSolutionMutation, CreateSolutionMutationVariables>;

/**
 * __useCreateSolutionMutation__
 *
 * To run a mutation, you first call `useCreateSolutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSolutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSolutionMutation, { data, loading, error }] = useCreateSolutionMutation({
 *   variables: {
 *      problemId: // value for 'problemId'
 *      content: // value for 'content'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useCreateSolutionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSolutionMutation, CreateSolutionMutationVariables>) {
        return Apollo.useMutation<CreateSolutionMutation, CreateSolutionMutationVariables>(CreateSolutionDocument, baseOptions);
      }
export type CreateSolutionMutationHookResult = ReturnType<typeof useCreateSolutionMutation>;
export type CreateSolutionMutationResult = Apollo.MutationResult<CreateSolutionMutation>;
export type CreateSolutionMutationOptions = Apollo.BaseMutationOptions<CreateSolutionMutation, CreateSolutionMutationVariables>;
export const DeleteSolutionDocument = gql`
    mutation DeleteSolution($id: String!) {
  deleteSolution(id: $id) {
    status
    message
  }
}
    `;
export type DeleteSolutionMutationFn = Apollo.MutationFunction<DeleteSolutionMutation, DeleteSolutionMutationVariables>;

/**
 * __useDeleteSolutionMutation__
 *
 * To run a mutation, you first call `useDeleteSolutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSolutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSolutionMutation, { data, loading, error }] = useDeleteSolutionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSolutionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSolutionMutation, DeleteSolutionMutationVariables>) {
        return Apollo.useMutation<DeleteSolutionMutation, DeleteSolutionMutationVariables>(DeleteSolutionDocument, baseOptions);
      }
export type DeleteSolutionMutationHookResult = ReturnType<typeof useDeleteSolutionMutation>;
export type DeleteSolutionMutationResult = Apollo.MutationResult<DeleteSolutionMutation>;
export type DeleteSolutionMutationOptions = Apollo.BaseMutationOptions<DeleteSolutionMutation, DeleteSolutionMutationVariables>;
export const UpdateSolutionDocument = gql`
    mutation UpdateSolution($id: String!, $content: String, $isPicked: Boolean, $images: [String!]!) {
  updateSolution(
    id: $id
    input: {isPicked: $isPicked, content: $content}
    images: $images
  ) {
    status
    message
  }
}
    `;
export type UpdateSolutionMutationFn = Apollo.MutationFunction<UpdateSolutionMutation, UpdateSolutionMutationVariables>;

/**
 * __useUpdateSolutionMutation__
 *
 * To run a mutation, you first call `useUpdateSolutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSolutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSolutionMutation, { data, loading, error }] = useUpdateSolutionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *      isPicked: // value for 'isPicked'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useUpdateSolutionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSolutionMutation, UpdateSolutionMutationVariables>) {
        return Apollo.useMutation<UpdateSolutionMutation, UpdateSolutionMutationVariables>(UpdateSolutionDocument, baseOptions);
      }
export type UpdateSolutionMutationHookResult = ReturnType<typeof useUpdateSolutionMutation>;
export type UpdateSolutionMutationResult = Apollo.MutationResult<UpdateSolutionMutation>;
export type UpdateSolutionMutationOptions = Apollo.BaseMutationOptions<UpdateSolutionMutation, UpdateSolutionMutationVariables>;
export const ToggleSolutionStarDocument = gql`
    mutation ToggleSolutionStar($userId: String!, $solutionId: String!) {
  toggleSolutionStar(userId: $userId, solutionId: $solutionId) {
    status
    message
  }
}
    `;
export type ToggleSolutionStarMutationFn = Apollo.MutationFunction<ToggleSolutionStarMutation, ToggleSolutionStarMutationVariables>;

/**
 * __useToggleSolutionStarMutation__
 *
 * To run a mutation, you first call `useToggleSolutionStarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleSolutionStarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleSolutionStarMutation, { data, loading, error }] = useToggleSolutionStarMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      solutionId: // value for 'solutionId'
 *   },
 * });
 */
export function useToggleSolutionStarMutation(baseOptions?: Apollo.MutationHookOptions<ToggleSolutionStarMutation, ToggleSolutionStarMutationVariables>) {
        return Apollo.useMutation<ToggleSolutionStarMutation, ToggleSolutionStarMutationVariables>(ToggleSolutionStarDocument, baseOptions);
      }
export type ToggleSolutionStarMutationHookResult = ReturnType<typeof useToggleSolutionStarMutation>;
export type ToggleSolutionStarMutationResult = Apollo.MutationResult<ToggleSolutionStarMutation>;
export type ToggleSolutionStarMutationOptions = Apollo.BaseMutationOptions<ToggleSolutionStarMutation, ToggleSolutionStarMutationVariables>;
export const ToggleSolutionPickedDocument = gql`
    mutation ToggleSolutionPicked($solutionId: String!, $problemId: String!, $solverId: String!) {
  toggleSolutionPicked(
    solutionId: $solutionId
    problemId: $problemId
    solverId: $solverId
  ) {
    status
    message
  }
}
    `;
export type ToggleSolutionPickedMutationFn = Apollo.MutationFunction<ToggleSolutionPickedMutation, ToggleSolutionPickedMutationVariables>;

/**
 * __useToggleSolutionPickedMutation__
 *
 * To run a mutation, you first call `useToggleSolutionPickedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleSolutionPickedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleSolutionPickedMutation, { data, loading, error }] = useToggleSolutionPickedMutation({
 *   variables: {
 *      solutionId: // value for 'solutionId'
 *      problemId: // value for 'problemId'
 *      solverId: // value for 'solverId'
 *   },
 * });
 */
export function useToggleSolutionPickedMutation(baseOptions?: Apollo.MutationHookOptions<ToggleSolutionPickedMutation, ToggleSolutionPickedMutationVariables>) {
        return Apollo.useMutation<ToggleSolutionPickedMutation, ToggleSolutionPickedMutationVariables>(ToggleSolutionPickedDocument, baseOptions);
      }
export type ToggleSolutionPickedMutationHookResult = ReturnType<typeof useToggleSolutionPickedMutation>;
export type ToggleSolutionPickedMutationResult = Apollo.MutationResult<ToggleSolutionPickedMutation>;
export type ToggleSolutionPickedMutationOptions = Apollo.BaseMutationOptions<ToggleSolutionPickedMutation, ToggleSolutionPickedMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    status
    message
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateUserSettingDocument = gql`
    mutation updateUserSetting($userId: String!, $isPrivate: Boolean, $notifications: Boolean) {
  updateSetting(
    userId: $userId
    input: {isPrivate: $isPrivate, notifications: $notifications}
  ) {
    status
    message
  }
}
    `;
export type UpdateUserSettingMutationFn = Apollo.MutationFunction<UpdateUserSettingMutation, UpdateUserSettingMutationVariables>;

/**
 * __useUpdateUserSettingMutation__
 *
 * To run a mutation, you first call `useUpdateUserSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSettingMutation, { data, loading, error }] = useUpdateUserSettingMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      isPrivate: // value for 'isPrivate'
 *      notifications: // value for 'notifications'
 *   },
 * });
 */
export function useUpdateUserSettingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserSettingMutation, UpdateUserSettingMutationVariables>) {
        return Apollo.useMutation<UpdateUserSettingMutation, UpdateUserSettingMutationVariables>(UpdateUserSettingDocument, baseOptions);
      }
export type UpdateUserSettingMutationHookResult = ReturnType<typeof useUpdateUserSettingMutation>;
export type UpdateUserSettingMutationResult = Apollo.MutationResult<UpdateUserSettingMutation>;
export type UpdateUserSettingMutationOptions = Apollo.BaseMutationOptions<UpdateUserSettingMutation, UpdateUserSettingMutationVariables>;
export const DevicesDocument = gql`
    query Devices($all: Boolean, $category: String, $userId: String, $name: String) {
  devices(all: $all, category: $category, userId: $userId, name: $name) {
    status
    message
    data {
      id
      brand
      name
      category
      coverImage
      followers {
        userId
      }
      problems {
        id
      }
      reviews {
        id
      }
    }
  }
}
    `;

/**
 * __useDevicesQuery__
 *
 * To run a query within a React component, call `useDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDevicesQuery({
 *   variables: {
 *      all: // value for 'all'
 *      category: // value for 'category'
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDevicesQuery(baseOptions?: Apollo.QueryHookOptions<DevicesQuery, DevicesQueryVariables>) {
        return Apollo.useQuery<DevicesQuery, DevicesQueryVariables>(DevicesDocument, baseOptions);
      }
export function useDevicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DevicesQuery, DevicesQueryVariables>) {
          return Apollo.useLazyQuery<DevicesQuery, DevicesQueryVariables>(DevicesDocument, baseOptions);
        }
export type DevicesQueryHookResult = ReturnType<typeof useDevicesQuery>;
export type DevicesLazyQueryHookResult = ReturnType<typeof useDevicesLazyQuery>;
export type DevicesQueryResult = Apollo.QueryResult<DevicesQuery, DevicesQueryVariables>;
export const DeviceDetailDocument = gql`
    query DeviceDetail($id: String!) {
  singleDevice(id: $id) {
    status
    message
    data {
      id
      brand
      name
      category
      price
      buyLink
      coverImage
      followers {
        userId
      }
      ratings {
        reviewId
        deviceId
        overall
        battery
        software
        display
        camera
        processor
      }
      problems {
        id
        title
        content
        solvedBy
        createdAt
        updatedAt
        author {
          id
          username
          avatar
        }
        stars {
          problemId
          userId
        }
        solutions {
          id
        }
        images {
          path
        }
      }
      reviews {
        id
        title
        content
        createdAt
        deviceId
        images {
          path
        }
        author {
          id
          username
          avatar
        }
        rating {
          reviewId
          deviceId
          overall
          battery
          software
          display
          camera
          processor
        }
      }
      spec {
        display
        battery
        software
        camera
        processor
        gpu
        memory
        thermals
        ports
        displaySimplify
        batterySimplify
        softwareSimplify
        cameraSimplify
        processorSimplify
        gpuSimplify
        memorySimplify
        thermalsSimplify
        portsSimplify
      }
    }
  }
}
    `;

/**
 * __useDeviceDetailQuery__
 *
 * To run a query within a React component, call `useDeviceDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeviceDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeviceDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeviceDetailQuery(baseOptions: Apollo.QueryHookOptions<DeviceDetailQuery, DeviceDetailQueryVariables>) {
        return Apollo.useQuery<DeviceDetailQuery, DeviceDetailQueryVariables>(DeviceDetailDocument, baseOptions);
      }
export function useDeviceDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeviceDetailQuery, DeviceDetailQueryVariables>) {
          return Apollo.useLazyQuery<DeviceDetailQuery, DeviceDetailQueryVariables>(DeviceDetailDocument, baseOptions);
        }
export type DeviceDetailQueryHookResult = ReturnType<typeof useDeviceDetailQuery>;
export type DeviceDetailLazyQueryHookResult = ReturnType<typeof useDeviceDetailLazyQuery>;
export type DeviceDetailQueryResult = Apollo.QueryResult<DeviceDetailQuery, DeviceDetailQueryVariables>;
export const DeviceRatingsDocument = gql`
    query deviceRatings($deviceId: String!) {
  ratings(deviceId: $deviceId) {
    status
    message
    data {
      overall
      display
      camera
      software
      battery
      processor
      ports
      gpu
      memory
      thermals
    }
  }
}
    `;

/**
 * __useDeviceRatingsQuery__
 *
 * To run a query within a React component, call `useDeviceRatingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeviceRatingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeviceRatingsQuery({
 *   variables: {
 *      deviceId: // value for 'deviceId'
 *   },
 * });
 */
export function useDeviceRatingsQuery(baseOptions: Apollo.QueryHookOptions<DeviceRatingsQuery, DeviceRatingsQueryVariables>) {
        return Apollo.useQuery<DeviceRatingsQuery, DeviceRatingsQueryVariables>(DeviceRatingsDocument, baseOptions);
      }
export function useDeviceRatingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeviceRatingsQuery, DeviceRatingsQueryVariables>) {
          return Apollo.useLazyQuery<DeviceRatingsQuery, DeviceRatingsQueryVariables>(DeviceRatingsDocument, baseOptions);
        }
export type DeviceRatingsQueryHookResult = ReturnType<typeof useDeviceRatingsQuery>;
export type DeviceRatingsLazyQueryHookResult = ReturnType<typeof useDeviceRatingsLazyQuery>;
export type DeviceRatingsQueryResult = Apollo.QueryResult<DeviceRatingsQuery, DeviceRatingsQueryVariables>;
export const NotificationsDocument = gql`
    query notifications($unseen: Boolean) {
  notifications(unseen: $unseen) {
    status
    message
    data {
      id
      title
      content
      link
      seen
      category
      createdAt
    }
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      unseen: // value for 'unseen'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, baseOptions);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, baseOptions);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const ProblemsDocument = gql`
    query Problems($deviceId: String, $authorId: String, $content: String, $title: String) {
  problems(
    deviceId: $deviceId
    authorId: $authorId
    content: $content
    title: $title
  ) {
    data {
      id
      title
      content
      solvedBy
      createdAt
      updatedAt
      device {
        id
        name
      }
      images {
        path
      }
      author {
        id
        avatar
        username
        setting {
          isPrivate
        }
      }
      stars {
        problemId
        userId
      }
      solutions {
        id
      }
    }
  }
}
    `;

/**
 * __useProblemsQuery__
 *
 * To run a query within a React component, call `useProblemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProblemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProblemsQuery({
 *   variables: {
 *      deviceId: // value for 'deviceId'
 *      authorId: // value for 'authorId'
 *      content: // value for 'content'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useProblemsQuery(baseOptions?: Apollo.QueryHookOptions<ProblemsQuery, ProblemsQueryVariables>) {
        return Apollo.useQuery<ProblemsQuery, ProblemsQueryVariables>(ProblemsDocument, baseOptions);
      }
export function useProblemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProblemsQuery, ProblemsQueryVariables>) {
          return Apollo.useLazyQuery<ProblemsQuery, ProblemsQueryVariables>(ProblemsDocument, baseOptions);
        }
export type ProblemsQueryHookResult = ReturnType<typeof useProblemsQuery>;
export type ProblemsLazyQueryHookResult = ReturnType<typeof useProblemsLazyQuery>;
export type ProblemsQueryResult = Apollo.QueryResult<ProblemsQuery, ProblemsQueryVariables>;
export const ProblemDetailDocument = gql`
    query ProblemDetail($id: String!) {
  singleProblem(id: $id) {
    status
    message
    data {
      id
      title
      content
      solvedBy
      pickedSolutionId
      createdAt
      updatedAt
      images {
        path
      }
      author {
        id
        avatar
        username
      }
      stars {
        problemId
        userId
      }
      solutions {
        id
        problemId
        author {
          username
          id
          avatar
        }
        content
        stars {
          userId
        }
        isPicked
        createdAt
        updatedAt
        images {
          path
        }
      }
    }
  }
}
    `;

/**
 * __useProblemDetailQuery__
 *
 * To run a query within a React component, call `useProblemDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useProblemDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProblemDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProblemDetailQuery(baseOptions: Apollo.QueryHookOptions<ProblemDetailQuery, ProblemDetailQueryVariables>) {
        return Apollo.useQuery<ProblemDetailQuery, ProblemDetailQueryVariables>(ProblemDetailDocument, baseOptions);
      }
export function useProblemDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProblemDetailQuery, ProblemDetailQueryVariables>) {
          return Apollo.useLazyQuery<ProblemDetailQuery, ProblemDetailQueryVariables>(ProblemDetailDocument, baseOptions);
        }
export type ProblemDetailQueryHookResult = ReturnType<typeof useProblemDetailQuery>;
export type ProblemDetailLazyQueryHookResult = ReturnType<typeof useProblemDetailLazyQuery>;
export type ProblemDetailQueryResult = Apollo.QueryResult<ProblemDetailQuery, ProblemDetailQueryVariables>;
export const ReviewsDocument = gql`
    query Reviews($deviceId: String, $authorId: String, $content: String, $title: String) {
  reviews(
    deviceId: $deviceId
    authorId: $authorId
    content: $content
    title: $title
  ) {
    data {
      id
      title
      author {
        id
        username
        avatar
      }
      content
      createdAt
      deviceId
      images {
        path
      }
      rating {
        reviewId
        deviceId
        overall
        battery
        software
        display
        camera
        processor
        gpu
        memory
        thermals
        ports
      }
    }
  }
}
    `;

/**
 * __useReviewsQuery__
 *
 * To run a query within a React component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsQuery({
 *   variables: {
 *      deviceId: // value for 'deviceId'
 *      authorId: // value for 'authorId'
 *      content: // value for 'content'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useReviewsQuery(baseOptions?: Apollo.QueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
        return Apollo.useQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, baseOptions);
      }
export function useReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
          return Apollo.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, baseOptions);
        }
export type ReviewsQueryHookResult = ReturnType<typeof useReviewsQuery>;
export type ReviewsLazyQueryHookResult = ReturnType<typeof useReviewsLazyQuery>;
export type ReviewsQueryResult = Apollo.QueryResult<ReviewsQuery, ReviewsQueryVariables>;
export const SolutionsDocument = gql`
    query Solutions($userId: String, $problemId: String) {
  solutions(userId: $userId, problemId: $problemId) {
    status
    message
    data {
      id
      problemId
      author {
        username
        id
        avatar
        setting {
          isPrivate
        }
      }
      content
      problem {
        id
        title
        content
      }
      stars {
        userId
      }
      isPicked
      createdAt
      updatedAt
      images {
        path
      }
    }
  }
}
    `;

/**
 * __useSolutionsQuery__
 *
 * To run a query within a React component, call `useSolutionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSolutionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSolutionsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      problemId: // value for 'problemId'
 *   },
 * });
 */
export function useSolutionsQuery(baseOptions?: Apollo.QueryHookOptions<SolutionsQuery, SolutionsQueryVariables>) {
        return Apollo.useQuery<SolutionsQuery, SolutionsQueryVariables>(SolutionsDocument, baseOptions);
      }
export function useSolutionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SolutionsQuery, SolutionsQueryVariables>) {
          return Apollo.useLazyQuery<SolutionsQuery, SolutionsQueryVariables>(SolutionsDocument, baseOptions);
        }
export type SolutionsQueryHookResult = ReturnType<typeof useSolutionsQuery>;
export type SolutionsLazyQueryHookResult = ReturnType<typeof useSolutionsLazyQuery>;
export type SolutionsQueryResult = Apollo.QueryResult<SolutionsQuery, SolutionsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    status
    data {
      id
      oauthId
      username
      email
      avatar
      setting {
        notifications
      }
      solutions {
        stars {
          userId
        }
      }
      problems {
        stars {
          userId
        }
      }
      problemSolved {
        id
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SingleUserDocument = gql`
    query SingleUser($id: String!) {
  singleUser(id: $id) {
    status
    data {
      id
      oauthId
      username
      email
      setting {
        isPrivate
      }
      avatar
      solutions {
        stars {
          userId
        }
      }
      problems {
        stars {
          userId
        }
      }
      problemSolved {
        id
      }
    }
  }
}
    `;

/**
 * __useSingleUserQuery__
 *
 * To run a query within a React component, call `useSingleUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSingleUserQuery(baseOptions: Apollo.QueryHookOptions<SingleUserQuery, SingleUserQueryVariables>) {
        return Apollo.useQuery<SingleUserQuery, SingleUserQueryVariables>(SingleUserDocument, baseOptions);
      }
export function useSingleUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleUserQuery, SingleUserQueryVariables>) {
          return Apollo.useLazyQuery<SingleUserQuery, SingleUserQueryVariables>(SingleUserDocument, baseOptions);
        }
export type SingleUserQueryHookResult = ReturnType<typeof useSingleUserQuery>;
export type SingleUserLazyQueryHookResult = ReturnType<typeof useSingleUserLazyQuery>;
export type SingleUserQueryResult = Apollo.QueryResult<SingleUserQuery, SingleUserQueryVariables>;
export const SettingDocument = gql`
    query Setting($userId: String!) {
  setting(userId: $userId) {
    status
    message
    data {
      userId
      isPrivate
      notifications
    }
  }
}
    `;

/**
 * __useSettingQuery__
 *
 * To run a query within a React component, call `useSettingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSettingQuery(baseOptions: Apollo.QueryHookOptions<SettingQuery, SettingQueryVariables>) {
        return Apollo.useQuery<SettingQuery, SettingQueryVariables>(SettingDocument, baseOptions);
      }
export function useSettingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingQuery, SettingQueryVariables>) {
          return Apollo.useLazyQuery<SettingQuery, SettingQueryVariables>(SettingDocument, baseOptions);
        }
export type SettingQueryHookResult = ReturnType<typeof useSettingQuery>;
export type SettingLazyQueryHookResult = ReturnType<typeof useSettingLazyQuery>;
export type SettingQueryResult = Apollo.QueryResult<SettingQuery, SettingQueryVariables>;