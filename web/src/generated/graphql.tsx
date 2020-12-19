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
  problems: Array<ProblemResponse>;
  singleProblem: ProblemResponse;
  findProblemStars: Array<ProblemStarResponse>;
  solutions: SolutionResponse;
  singleSolution: SolutionResponse;
  findSolutionStars: SolutionStarResponse;
  reviews: ReviewResponse;
  singleReview: ReviewResponse;
  ratings: Array<ReviewRatingResponse>;
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
  deviceId: Scalars['String'];
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
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  authorId: Scalars['String'];
  deviceId: Scalars['String'];
  stars?: Maybe<Array<DeviceProblemStar>>;
  solutions?: Maybe<Array<Solution>>;
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
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  rating: ReviewRating;
  authorId: Scalars['String'];
  deviceId: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  updateUser: UserResponse;
  deleteUser: UserResponse;
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
  deviceId: Scalars['String'];
  authorId: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteProblemArgs = {
  id: Scalars['String'];
};


export type MutationUpdateProblemArgs = {
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
  deviceId: Scalars['String'];
  authorId: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateReviewArgs = {
  input: UpdateReviewInput;
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

export type UpdateReviewInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type UpdateRatingInput = {
  display?: Maybe<Scalars['Float']>;
  camera?: Maybe<Scalars['Float']>;
  software?: Maybe<Scalars['Float']>;
  processor?: Maybe<Scalars['Float']>;
  battery?: Maybe<Scalars['Float']>;
};

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