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
  hello: Scalars['String'];
  users: UserResponse;
  singleUser: UserResponse;
  me?: Maybe<UserResponse>;
  setting?: Maybe<UserSettingResponse>;
  devices: DeviceResponse;
  singleDevice?: Maybe<DeviceResponse>;
  problems?: Maybe<ProblemResponse>;
  singleProblem: ProblemResponse;
  findProblemStars: ProblemStarResponse;
  solutions: SolutionResponse;
  singleSolution: SolutionResponse;
  findSolutionStars: SolutionStarResponse;
  reviews: ReviewResponse;
  singleReview: ReviewResponse;
  ratings: ReviewRatingResponse;
  problemImages: ProblemImageResponse;
  reviewImages: ReviewImageResponse;
};


export type QuerySingleUserArgs = {
  id: Scalars['String'];
};


export type QuerySettingArgs = {
  userId: Scalars['String'];
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

export type UserResponse = {
  __typename?: 'UserResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<User>>;
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
  problems?: Maybe<Array<DeviceProblem>>;
  deviceProblemStars?: Maybe<Array<DeviceProblemStar>>;
  solutions?: Maybe<Array<Solution>>;
  solutionStars?: Maybe<Array<SolutionStar>>;
  follows?: Maybe<Array<DeviceFollower>>;
  reviews?: Maybe<Array<Review>>;
};


export type UserSetting = {
  __typename?: 'UserSetting';
  userId: Scalars['String'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  isDarkMode?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DeviceProblem = {
  __typename?: 'DeviceProblem';
  id: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  isSolve: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  authorId: Scalars['String'];
  author?: Maybe<User>;
  deviceId: Scalars['String'];
  device: Device;
  stars?: Maybe<Array<DeviceProblemStar>>;
  solutions?: Maybe<Array<Solution>>;
  images?: Maybe<Array<ProblemImage>>;
};

export type Device = {
  __typename?: 'Device';
  id: Scalars['String'];
  name: Scalars['String'];
  brand: Scalars['String'];
  category: Scalars['String'];
  subCategory?: Maybe<Scalars['String']>;
  buyLink?: Maybe<Scalars['String']>;
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
  createdAt: Scalars['String'];
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
  images?: Maybe<Array<ReviewImage>>;
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
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  authorId: Scalars['String'];
  problemId: Scalars['String'];
  stars?: Maybe<Array<SolutionStar>>;
};

export type SolutionStar = {
  __typename?: 'SolutionStar';
  userId: Scalars['String'];
  solutionId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProblemImage = {
  __typename?: 'ProblemImage';
  path: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  problemId: Scalars['String'];
  problem: DeviceProblem;
};

export type UserSettingResponse = {
  __typename?: 'UserSettingResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<UserSetting>>;
};

export type DeviceResponse = {
  __typename?: 'DeviceResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<Device>>;
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

export type Mutation = {
  __typename?: 'Mutation';
  updateUser: UserResponse;
  deleteUser: UserResponse;
  logout: UserResponse;
  createSetting: UserSettingResponse;
  updateSetting: UserSetting;
  createDevice?: Maybe<DeviceResponse>;
  updateDevice: DeviceResponse;
  deleteDevice: DeviceResponse;
  toggleDeviceFollow: DeviceResponse;
  createSpec?: Maybe<DeviceSpecResponse>;
  updateDeviceSpec: DeviceSpecResponse;
  deleteDeviceSpec: DeviceSpecResponse;
  createProblem?: Maybe<ProblemResponse>;
  deleteProblem: ProblemResponse;
  updateProblem: ProblemResponse;
  toggleProblemStar: ProblemResponse;
  createSolution: SolutionResponse;
  updateSolution: SolutionResponse;
  deleteSolution: SolutionResponse;
  toggleSolutionStar: SolutionResponse;
  createReview?: Maybe<ReviewResponse>;
  updateReview?: Maybe<ReviewResponse>;
  deleteReview: ReviewResponse;
  createRating?: Maybe<ReviewRatingResponse>;
  updateRating?: Maybe<ReviewRatingResponse>;
  uploadImage: UploadImageResponse;
  deleteImages: UploadImageResponse;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationCreateSettingArgs = {
  userId: Scalars['String'];
};


export type MutationUpdateSettingArgs = {
  input: UpdateSettingInput;
  userId: Scalars['String'];
};


export type MutationCreateDeviceArgs = {
  coverImage?: Maybe<Scalars['String']>;
  buyLink?: Maybe<Scalars['String']>;
  subCategory?: Maybe<Scalars['String']>;
  category: Scalars['String'];
  brand: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateDeviceArgs = {
  input: UpdateDeviceInput;
  id: Scalars['String'];
};


export type MutationDeleteDeviceArgs = {
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
};


export type MutationUpdateDeviceSpecArgs = {
  input: UpdateDeviceSpecInput;
  deviceId: Scalars['String'];
};


export type MutationDeleteDeviceSpecArgs = {
  deviceId: Scalars['String'];
};


export type MutationCreateProblemArgs = {
  images: Array<Scalars['String']>;
  deviceId: Scalars['String'];
  authorId: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteProblemArgs = {
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


export type MutationCreateSolutionArgs = {
  problemId: Scalars['String'];
  authorId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationUpdateSolutionArgs = {
  input: UpdateSolutionInput;
  id: Scalars['String'];
};


export type MutationDeleteSolutionArgs = {
  id: Scalars['String'];
};


export type MutationToggleSolutionStarArgs = {
  solutionId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateReviewArgs = {
  images: Array<Scalars['String']>;
  processor?: Maybe<Scalars['Float']>;
  camera?: Maybe<Scalars['Float']>;
  software?: Maybe<Scalars['Float']>;
  battery?: Maybe<Scalars['Float']>;
  display?: Maybe<Scalars['Float']>;
  overall?: Maybe<Scalars['Float']>;
  deviceId: Scalars['String'];
  authorId: Scalars['String'];
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


export type MutationUploadImageArgs = {
  imageId: Scalars['String'];
  image: Scalars['String'];
};


export type MutationDeleteImagesArgs = {
  imageIds: Array<Scalars['String']>;
};

export type UpdateUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type UpdateSettingInput = {
  isPrivate?: Maybe<Scalars['Boolean']>;
  isDarkMode?: Maybe<Scalars['String']>;
};

export type UpdateDeviceInput = {
  name?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  buyLink?: Maybe<Scalars['String']>;
  coverImage?: Maybe<Scalars['String']>;
};

export type DeviceSpecResponse = {
  __typename?: 'DeviceSpecResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<DeviceSpec>>;
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
};

export type UpdateProblemInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  isSolve?: Maybe<Scalars['Boolean']>;
};

export type UpdateSolutionInput = {
  content?: Maybe<Scalars['String']>;
  isPicked?: Maybe<Scalars['Boolean']>;
};

export type UpdateRatingInput = {
  overall?: Maybe<Scalars['Float']>;
  display?: Maybe<Scalars['Float']>;
  camera?: Maybe<Scalars['Float']>;
  software?: Maybe<Scalars['Float']>;
  processor?: Maybe<Scalars['Float']>;
  battery?: Maybe<Scalars['Float']>;
};

export type UpdateReviewInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type UploadImageResponse = {
  __typename?: 'UploadImageResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<Array<Scalars['String']>>;
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
  imageIds: Array<Scalars['String']>;
}>;


export type DeleteImagesMutation = (
  { __typename?: 'Mutation' }
  & { deleteImages: (
    { __typename?: 'UploadImageResponse' }
    & Pick<UploadImageResponse, 'status' | 'message'>
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
      & Pick<DeviceProblem, 'id' | 'title' | 'content' | 'isSolve' | 'createdAt' | 'updatedAt'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      )>, stars?: Maybe<Array<(
        { __typename?: 'DeviceProblemStar' }
        & Pick<DeviceProblemStar, 'problemId' | 'userId'>
      )>>, solutions?: Maybe<Array<(
        { __typename?: 'Solution' }
        & Pick<Solution, 'id'>
      )>>, images?: Maybe<Array<(
        { __typename?: 'ProblemImage' }
        & Pick<ProblemImage, 'path'>
      )>> }
    )>> }
  ) }
);

export type CreateProblemMutationVariables = Exact<{
  deviceId: Scalars['String'];
  authorId: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  images: Array<Scalars['String']>;
}>;


export type CreateProblemMutation = (
  { __typename?: 'Mutation' }
  & { createProblem?: Maybe<(
    { __typename?: 'ProblemResponse' }
    & Pick<ProblemResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'DeviceProblem' }
      & Pick<DeviceProblem, 'id' | 'title' | 'content' | 'isSolve' | 'createdAt' | 'updatedAt'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      )>, stars?: Maybe<Array<(
        { __typename?: 'DeviceProblemStar' }
        & Pick<DeviceProblemStar, 'problemId' | 'userId'>
      )>>, solutions?: Maybe<Array<(
        { __typename?: 'Solution' }
        & Pick<Solution, 'id'>
      )>>, images?: Maybe<Array<(
        { __typename?: 'ProblemImage' }
        & Pick<ProblemImage, 'path'>
      )>> }
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
  images: Array<Scalars['String']>;
}>;


export type UpdateProblemMutation = (
  { __typename?: 'Mutation' }
  & { updateProblem: (
    { __typename?: 'ProblemResponse' }
    & Pick<ProblemResponse, 'status' | 'message'>
    & { data?: Maybe<Array<(
      { __typename?: 'DeviceProblem' }
      & Pick<DeviceProblem, 'id' | 'title' | 'content' | 'isSolve' | 'createdAt' | 'updatedAt'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar'>
      )>, stars?: Maybe<Array<(
        { __typename?: 'DeviceProblemStar' }
        & Pick<DeviceProblemStar, 'problemId' | 'userId'>
      )>>, solutions?: Maybe<Array<(
        { __typename?: 'Solution' }
        & Pick<Solution, 'id'>
      )>>, images?: Maybe<Array<(
        { __typename?: 'ProblemImage' }
        & Pick<ProblemImage, 'path'>
      )>> }
    )>> }
  ) }
);

export type CreateReviewMutationVariables = Exact<{
  deviceId: Scalars['String'];
  authorId: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  overall?: Maybe<Scalars['Float']>;
  display?: Maybe<Scalars['Float']>;
  processor?: Maybe<Scalars['Float']>;
  battery?: Maybe<Scalars['Float']>;
  software?: Maybe<Scalars['Float']>;
  camera?: Maybe<Scalars['Float']>;
  images: Array<Scalars['String']>;
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
        & Pick<ReviewRating, 'reviewId' | 'deviceId' | 'overall' | 'battery' | 'software' | 'display' | 'camera' | 'processor'>
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
  images: Array<Scalars['String']>;
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
        & Pick<ReviewRating, 'reviewId' | 'deviceId' | 'overall' | 'battery' | 'software' | 'display' | 'camera' | 'processor'>
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

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'status' | 'message'>
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
      & Pick<Device, 'id' | 'brand' | 'name' | 'category' | 'coverImage'>
      & { followers?: Maybe<Array<(
        { __typename?: 'DeviceFollower' }
        & Pick<DeviceFollower, 'userId'>
      )>>, problems?: Maybe<Array<(
        { __typename?: 'DeviceProblem' }
        & Pick<DeviceProblem, 'id' | 'title' | 'content' | 'isSolve' | 'createdAt' | 'updatedAt'>
        & { author?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'username' | 'avatar'>
        )>, stars?: Maybe<Array<(
          { __typename?: 'DeviceProblemStar' }
          & Pick<DeviceProblemStar, 'problemId' | 'userId'>
        )>>, solutions?: Maybe<Array<(
          { __typename?: 'Solution' }
          & Pick<Solution, 'id'>
        )>> }
      )>>, reviews?: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'title' | 'content' | 'createdAt' | 'deviceId'>
        & { author: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'username' | 'avatar'>
        ), rating: (
          { __typename?: 'ReviewRating' }
          & Pick<ReviewRating, 'reviewId' | 'deviceId' | 'overall' | 'battery' | 'software' | 'display' | 'camera' | 'processor'>
        ) }
      )>>, spec?: Maybe<(
        { __typename?: 'DeviceSpec' }
        & Pick<DeviceSpec, 'display' | 'battery' | 'software' | 'camera' | 'processor' | 'displaySimplify' | 'batterySimplify' | 'softwareSimplify' | 'cameraSimplify' | 'processorSimplify'>
      )> }
    )>> }
  )> }
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
      & Pick<DeviceProblem, 'id' | 'title' | 'content' | 'isSolve' | 'createdAt' | 'updatedAt'>
      & { images?: Maybe<Array<(
        { __typename?: 'ProblemImage' }
        & Pick<ProblemImage, 'path'>
      )>>, author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'avatar' | 'username'>
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
      ), rating: (
        { __typename?: 'ReviewRating' }
        & Pick<ReviewRating, 'reviewId' | 'deviceId' | 'overall' | 'battery' | 'software' | 'display' | 'camera' | 'processor'>
      ) }
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
export const ToggleProblemStarDocument = gql`
    mutation ToggleProblemStar($problemId: String!, $userId: String!) {
  toggleProblemStar(problemId: $problemId, userId: $userId) {
    status
    message
    data {
      id
      title
      content
      isSolve
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
    mutation CreateProblem($deviceId: String!, $authorId: String!, $title: String!, $content: String!, $images: [String!]!) {
  createProblem(
    deviceId: $deviceId
    authorId: $authorId
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
      isSolve
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
 *      authorId: // value for 'authorId'
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
      isSolve
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
export const CreateReviewDocument = gql`
    mutation CreateReview($deviceId: String!, $authorId: String!, $title: String!, $content: String!, $overall: Float, $display: Float, $processor: Float, $battery: Float, $software: Float, $camera: Float, $images: [String!]!) {
  createReview(
    deviceId: $deviceId
    authorId: $authorId
    content: $content
    title: $title
    overall: $overall
    battery: $battery
    software: $software
    display: $display
    processor: $processor
    camera: $camera
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
 *      authorId: // value for 'authorId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      overall: // value for 'overall'
 *      display: // value for 'display'
 *      processor: // value for 'processor'
 *      battery: // value for 'battery'
 *      software: // value for 'software'
 *      camera: // value for 'camera'
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
    mutation UpdateReview($id: String!, $title: String, $content: String, $overall: Float, $display: Float, $processor: Float, $battery: Float, $software: Float, $camera: Float, $images: [String!]!) {
  updateReview(
    id: $id
    reviewInput: {title: $title, content: $content}
    ratingInput: {overall: $overall, battery: $battery, software: $software, display: $display, processor: $processor, camera: $camera}
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
      coverImage
      followers {
        userId
      }
      problems {
        id
        title
        content
        isSolve
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
      }
      reviews {
        id
        title
        content
        createdAt
        deviceId
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
        displaySimplify
        batterySimplify
        softwareSimplify
        cameraSimplify
        processorSimplify
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
      isSolve
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