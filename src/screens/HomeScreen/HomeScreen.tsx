import { useGetStoreList } from '../../api/api-hooks/store'

const HomeScreen = () => {
  const { data: stories } = useGetStoreList({
    code: '123',
    city: 'New York',
    state: 'NY',
    description: 'Store description',
  })
  return <div>HomeScreen</div>
}

export default HomeScreen
