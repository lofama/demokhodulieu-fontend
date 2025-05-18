import {
  Button,
  Col,
  Flex,
  Modal,
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
  SearchParams,
} from './utils'

const HomeScreen = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [openModal, setOpenModal] = useState(false)
  const [tableName, setTableName] = useState<string | undefined>()
  const [searchParams, setSearchParams] = useState<SearchParams[] | undefined>()
  const [search, setSearch] = useState<SearchParams[] | undefined>()
  const [typeTime, setTypeTime] = useState<TypeDetail>(typeTimes[0])
  const [typeCustomer, setTypeCustomer] = useState<TypeDetail>(typeCustomers[0])
  const [typeProduct, setTypeProduct] = useState<TypeDetail>(typeProducts[0])
  const { data: sales, isLoading } = useGetSumarySale({
    page,
    pageSize,
    tableName,
    search,
  })
  const [columnsTable, setColumnsTable] = useState<TableColumnsType>([])
  const [columns, setColumns] = useState<SaleSummaryField[]>([])

  useEffect(() => {
    const tableName = `vw_doanhthu_${typeTime.key}_${typeCustomer.key}_${typeProduct.key}`
    setTableName(tableName.toLocaleLowerCase())
    setSearchParams(undefined)
    setSearch(undefined)
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
        <Button onClick={() => setOpenModal(true)}>Search</Button>
      </Flex>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Flex justify="space-between" style={{ marginBottom: 20 }}>
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
                onClick={() =>
                  setTypeCustomer(typeCustomers[typeCustomer.id + 1])
                }
                disabled={typeCustomer.id === 5}
              >
                <FaArrowUp />
              </Button>
              <Button
                onClick={() =>
                  setTypeCustomer(typeCustomers[typeCustomer.id - 1])
                }
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

      <Modal
        title="Tìm kiếm"
        open={openModal}
        keyboard={false}
        onCancel={() => setOpenModal(false)}
        onOk={() => {
          setSearch(searchParams)
          setOpenModal(false)
        }}
        onClose={() => setOpenModal(false)}
        width={600}
      >
        <div style={{ maxHeight: 450, overflowY: 'auto', paddingRight: 8 }}>
          {columns.length > 0 &&
            columns.map((col) => (
              <Flex
                key={col}
                align="center"
                justify="space-between"
                style={{
                  marginBottom: 16,
                  padding: '8px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <Typography.Text strong style={{ minWidth: 150 }}>
                  {saleSummaryFieldLabels[col]}
                </Typography.Text>
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Nhập nhiều giá trị"
                  onChange={(values) => {
                    if (values.length > 0) {
                      setSearchParams((prev) => {
                        const params = prev ? [...prev] : []
                        const idx = params.findIndex((p) => p.key === col)

                        if (idx > -1) {
                          params[idx] = { key: col, value: values }
                        } else {
                          params.push({ key: col, value: values })
                        }
                        return params.length > 0 ? params : undefined
                      })
                    }
                  }}
                  value={searchParams?.find((p) => p.key === col)?.value || []}
                />
              </Flex>
            ))}
        </div>
      </Modal>
    </div>
  )
}

export default HomeScreen
