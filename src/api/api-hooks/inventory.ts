import { useQuery } from '@tanstack/react-query'
import { API_ENPOINTS } from '../api.constants'
import apiInstance from '../apiInstance'
import { AxiosError } from 'axios'
import { InventorySumary } from '../../screens/FacilityScreen/FacilityScreen'

export interface InventorySumaryResponse {
  data: InventorySumary[]
  meta: {
    total: number
    page: number
    pageSize: number
  }
}

export interface GetSumaryInventoryParams {
  page?: number
  pageSize?: number
}

const getSumaryInventory = (params: GetSumaryInventoryParams) => {
  return apiInstance.get<void, InventorySumaryResponse>(
    API_ENPOINTS.INVENTORY,
    {
      params,
    },
  )
}

export const useGetSumaryInventory = (params: GetSumaryInventoryParams) => {
  return useQuery<InventorySumaryResponse, AxiosError>({
    queryKey: ['GET_SUMARY_INVENTORY_QUERY_KEY', params],
    queryFn: () => getSumaryInventory(params),
  })
}
