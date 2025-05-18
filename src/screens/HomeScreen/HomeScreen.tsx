import {
  Button,
  Col,
  Flex,
  Pagination,
  Row,
  Select,
  Table,
  TableColumnsType,
  Typography,
} from 'antd'
import { useGetSumarySale } from '../../api/api-hooks/sale'
import { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import {
  TypeDetail,
  typeTimes,
  typeCustomers,
  typeProducts,
  SaleSummaryField,
  saleSummaryFieldLabels,
} from './utils'

const HomeScreen = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [tableName, setTableName] = useState<string | undefined>()
  const [typeTime, setTypeTime] = useState<TypeDetail>(typeTimes[0])
  const [typeCustomer, setTypeCustomer] = useState<TypeDetail>(typeCustomers[0])
  const [typeProduct, setTypeProduct] = useState<TypeDetail>(typeProducts[0])
  const { data: sales, isLoading } = useGetSumarySale({
    page,
    pageSize,
    tableName,
  })
  const [columnsTable, setColumnsTable] = useState<TableColumnsType>([])
  const [columns, setColumns] = useState<SaleSummaryField[]>([])

  useEffect(() => {
    const tableName = `vw_doanhthu_${typeTime.key}_${typeCustomer.key}_${typeProduct.key}`
    setTableName(tableName.toLocaleLowerCase())
  }, [typeTime, typeCustomer, typeProduct])

  useEffect(() => {
    if (sales?.data && sales.data.length > 0) {
      const sample = sales.data[0]
      const dynamicCols = Object.keys(sample || []).map((key) => ({
        title: saleSummaryFieldLabels[key as SaleSummaryField],
        dataIndex: key,
        key: key,
        render: (value: any) =>
          typeof value === 'number' ? value.toLocaleString() : value,
      }))
      setColumnsTable(dynamicCols)
      setColumns(dynamicCols.map((col) => col.key as SaleSummaryField))
    }
  }, [sales])

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  return (
    <div>
      <Flex justify="space-between">
        <Typography.Title level={3}>Quản lí doanh thu</Typography.Title>
        <Flex gap={10}>
          <Button>{typeTime.title}</Button>
          <Button
            onClick={() => setTypeTime(typeTimes[typeTime.id + 1])}
            disabled={typeTime.id === 4}
          >
            <FaArrowUp />
          </Button>
          <Button
            onClick={() => setTypeTime(typeTimes[typeTime.id - 1])}
            disabled={typeTime.id === 0}
          >
            <FaArrowDown />
          </Button>
        </Flex>
        <Flex gap={10}>
          <Button>{typeCustomer.title}</Button>
          <Button
            onClick={() => setTypeCustomer(typeCustomers[typeCustomer.id + 1])}
            disabled={typeCustomer.id === 5}
          >
            <FaArrowUp />
          </Button>
          <Button
            onClick={() => setTypeCustomer(typeCustomers[typeCustomer.id - 1])}
            disabled={typeCustomer.id === 0}
          >
            <FaArrowDown />
          </Button>
        </Flex>
        <Flex gap={10}>
          <Button>{typeProduct.title}</Button>
          <Button
            onClick={() => setTypeProduct(typeProducts[typeProduct.id + 1])}
            disabled={typeProduct.id === 3}
          >
            <FaArrowUp />
          </Button>
          <Button
            onClick={() => setTypeProduct(typeProducts[typeProduct.id - 1])}
            disabled={typeProduct.id === 0}
          >
            <FaArrowDown />
          </Button>
        </Flex>
        <Button
          onClick={() => {
            setTypeTime(typeTimes[0])
            setTypeCustomer(typeCustomers[0])
            setTypeProduct(typeProducts[0])
            setPage(1)
            setPageSize(10)
          }}
        >
          Reset
        </Button>
      </Flex>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Flex justify="space-between" style={{ marginBottom: 20 }}>
            <Flex gap={10}>
              <Select
                mode="multiple"
                style={{ width: '100%', minWidth: 200 }}
                placeholder="Chọn nhiều mục"
                options={columns.map((col) => ({
                  label: saleSummaryFieldLabels[col],
                  value: col,
                }))}
              />
            </Flex>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={sales?.meta?.total}
              showSizeChanger={true}
              pageSizeOptions={['10', '20', '50', '100']}
              showTotal={(total) => `Tổng số: ${total}`}
              onChange={handlePaginationChange}
              responsive={true}
              showLessItems={true}
            />
          </Flex>
          {columnsTable.length > 0 && (
            <Table
              columns={columnsTable}
              dataSource={sales?.data}
              rowKey={(_, index) => index as number}
              pagination={false}
              loading={isLoading}
              scroll={{ x: 'max-content' }}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default HomeScreen
