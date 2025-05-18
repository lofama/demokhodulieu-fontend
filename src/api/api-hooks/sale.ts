import { useQuery } from '@tanstack/react-query'
import { API_ENPOINTS } from '../api.constants'
import apiInstance from '../apiInstance'
import { AxiosError } from 'axios'
import { SearchParams } from '../../screens/HomeScreen/utils'

export interface SaleSumaryResponse {
  data: any[]
  meta: {
    total: number
    page: number
    pageSize: number
  }
}

export interface GetSumarySaleParams {
  page?: number
  pageSize?: number
  tableName: string | null | undefined
  search: SearchParams[] | undefined
}

const getSumarySale = (params: GetSumarySaleParams) => {
  return apiInstance.get<void, SaleSumaryResponse>(API_ENPOINTS.SALE, {
    params: {
      ...params,
      search: JSON.stringify(params.search || []),
    },
  })
}

export const useGetSumarySale = (params: GetSumarySaleParams) => {
  return useQuery<SaleSumaryResponse, AxiosError>({
    queryKey: ['GET_SUMARY_SALE_QUERY_KEY', params],
    queryFn: () => getSumarySale(params),
  })
}
