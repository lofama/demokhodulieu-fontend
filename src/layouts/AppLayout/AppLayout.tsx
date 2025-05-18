import { useState } from 'react'
import { Button, Layout, Menu, MenuProps } from 'antd'
import { ROUTE_PATHS } from '../../routes/route-paths.constant'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { IoIosLogOut, IoMdColorFilter } from 'react-icons/io'
import { IoHome, IoMenuOutline } from 'react-icons/io5'
import './style.css'
import { FaUsers, FaUserTie } from 'react-icons/fa'
import { MdRateReview } from 'react-icons/md'

const AppLayout = () => {
  // const setCurrentUser = useAppStore((stage) => stage.setCurrentUser)
  const location = useLocation()
  const { pathname } = location
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev)
  }

  const sideMenuItems: MenuProps['items'] = [
    {
      key: ROUTE_PATHS.HOME,
      label: <Link to={ROUTE_PATHS.HOME}>Trang chủ</Link>,
      icon: <IoHome />,
    },
    {
      key: ROUTE_PATHS.INVENTORY,
      label: <Link to={ROUTE_PATHS.INVENTORY}>Ton kho</Link>,
      icon: <IoHome />,
    },
  ]

  const { Header, Content, Sider } = Layout
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: 'white',
          }}
        >
          <Link to={ROUTE_PATHS.HOME}>
            <span
              style={{
                backgroundColor: '#f0f0f0',
                padding: '0.75rem',
                border: '1px solid #e0e0e0',
                borderRadius: '0.25rem',
              }}
            >
              DASHBOARD
            </span>
          </Link>
          <Button icon={<IoIosLogOut />} href={ROUTE_PATHS.LOGIN}>
            Đăng xuất
          </Button>
        </Header>
        <Layout
          style={{
            padding: '1.25rem',
            gap: '1.25rem',
          }}
        >
          <Sider width={220} collapsed={collapsed} className="app-layout-sider">
            <Menu
              mode="inline"
              items={sideMenuItems}
              selectedKeys={[pathname]}
              style={{ backgroundColor: 'white' }}
            />
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{ width: 50 }}
            >
              <IoMenuOutline />
            </Button>
          </Sider>
          <Layout>
            <Content>
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '1.25rem',
                  height: '100%',
                }}
              >
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

export default AppLayout
