import { Flex, Pagination, Table, TableColumnsType, Typography } from 'antd'
import { useState } from 'react'
import { useGetSumaryInventory } from '../../api/api-hooks/inventory'

export interface InventorySumary {
  MaMatHang: string
  MaCuaHang: string
  SoLuongTonKho: string
  TenThanhPho: string
  Bang: string
  MoTa: string
  KichCo: string
  TrongLuong: string
  Gia: string
  NgayDatHang: string
}

const InventoryScreen = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data: inventories } = useGetSumaryInventory({
    page,
    pageSize,
  })

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const columns: TableColumnsType<InventorySumary> = [
    {
      title: 'Mã mặt hàng',
      dataIndex: 'MaMatHang',
      key: 'MaMatHang',
    },
    {
      title: 'Mã cửa hàng',
      dataIndex: 'MaCuaHang',
      key: 'MaCuaHang',
    },
    {
      title: 'Số lượng tồn kho',
      dataIndex: 'SoLuongTonKho',
      key: 'SoLuongTonKho',
    },
    {
      title: 'Tên thành phố',
      dataIndex: 'TenThanhPho',
      key: 'TenThanhPho',
    },
    {
      title: 'Bảng',
      dataIndex: 'Bang',
      key: 'Bang',
    },
    {
      title: 'Mô tả',
      dataIndex: 'MoTa',
      key: 'MoTa',
    },
    {
      title: 'Kích cỡ',
      dataIndex: 'KichCo',
      key: 'KichCo',
    },
    {
      title: 'Trọng lượng',
      dataIndex: 'TrongLuong',
      key: 'TrongLuong',
    },
    {
      title: 'Giá',
      dataIndex: 'Gia',
      key: 'Gia',
    },
  ]

  return (
    <div>
      <Flex justify="space-between">
        <Typography.Title level={2}>Hang ton kho</Typography.Title>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={inventories?.meta?.total}
          showSizeChanger={true}
          pageSizeOptions={['10', '20', '50', '100']}
          showTotal={(total) => `Tổng số: ${total}`}
          onChange={handlePaginationChange}
          responsive={true}
          showLessItems={true}
        />
      </Flex>

      <Table
        columns={columns}
        dataSource={inventories?.data}
        rowKey={(record) => record.MaMatHang}
        pagination={false}
      />
    </div>
  )
}

export default InventoryScreen
