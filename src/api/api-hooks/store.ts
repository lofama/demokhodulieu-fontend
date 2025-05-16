import { useMutation, useQuery } from '@tanstack/react-query'
import { API_ENPOINTS } from '../api.constants'
import apiInstance from '../apiInstance'
import { AxiosError } from 'axios'
import { StoreSearchParams } from '../../types/store'

const GET_STORE_QUERY_KEY = 'GET_STORE'

const getStoreSearch = (params: StoreSearchParams) => {
  return apiInstance.get<void, StoreSearchParams>(API_ENPOINTS.STORE, {
    params,
  })
}

export const useGetStoreList = (params: StoreSearchParams) => {
  return useQuery<StoreSearchParams, AxiosError>({
    queryKey: [GET_STORE_QUERY_KEY, params],
    queryFn: () => getStoreSearch(params),
  })
}
