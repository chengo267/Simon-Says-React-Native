import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {AddScoreReq, ScoreData} from '../models/simon.models';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://expressjs-prisma-production-21e7.up.railway.app/',
});
const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log('res', result);
  if (result.error) {
    console.log(result.error);
    // showMessage({
    //   message: i18n.t('error.somethingWentWrong'),
    //   type: 'danger',
    // });
  }
  return result;
};

export const scoresApi = createApi({
  reducerPath: 'scoresApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: builder => ({
    getAllScores: builder.query<ScoreData[], void>({
      query: () => 'scores',
    }),
    addScore: builder.mutation<ScoreData, AddScoreReq>({
      query: body => ({
        url: 'scores',
        method: 'POST',
        body,
      }),
    }),
    deleteScore: builder.mutation<{status: string}, string>({
      query(id: string) {
        return {
          url: `posts/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetAllScoresQuery,
  useAddScoreMutation,
  useDeleteScoreMutation,
} = scoresApi;
