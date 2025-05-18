export interface SaleSumary {
  id: number
  MaDon: string
  MaMatHang: string
  NgayDatHang: string
  MaKH: string
  TenKH: string
  LoaiKH: string
  TenThanhPho: string
  MaThanhPho: string
  Bang: string
  DiaChiVP: string
  MoTa: string
  KichCo: string
  TrongLuong: string
  Gia: string
  SoLuongDat: string
  GiaDat: string
  ThanhTien: string
  Ngay: string
  NgayTrongThang: string
  Thang: string
  Quy: string
  Nam: string
  TongSoLuongDat: string
  TongDoanhThu: string
}

export type SaleSummaryField = keyof SaleSumary

export interface TypeDetail {
  id: number
  title: string
  key: string
}
export const typeTimes: TypeDetail[] = [
  { id: 0, title: 'Ngay', key: 'TheoNgay' },
  { id: 1, title: 'Thang', key: 'TheoThang' },
  { id: 2, title: 'Quy', key: 'TheoQuy' },
  { id: 3, title: 'Nam', key: 'TheoNam' },
  { id: 4, title: 'Tat ca', key: 'AllThoin' },
]

export const typeCustomers: TypeDetail[] = [
  { id: 0, title: 'Ma don hang', key: 'MaDon' },
  { id: 1, title: 'Ma khach hang', key: 'MaKH' },
  { id: 2, title: 'Loai khach hang', key: 'LoaiKH' },
  { id: 3, title: 'Thanh pho', key: 'ThanhPho' },
  { id: 4, title: 'Bang', key: 'Bang' },
  { id: 5, title: 'Tat ca', key: 'AllKhachHang' },
]
export const typeProducts: TypeDetail[] = [
  { id: 0, title: 'Ma mat hang', key: 'MaMatHang' },
  { id: 1, title: 'Kich co', key: 'KichCo' },
  { id: 2, title: 'Mo ta', key: 'MoTa' },
  { id: 3, title: 'Tat ca', key: 'AllMatHang' },
]

export const saleSummaryFieldLabels: Record<SaleSummaryField, string> = {
  id: 'ID',
  MaDon: 'Mã đơn',
  MaMatHang: 'Mã mặt hàng',
  NgayDatHang: 'Ngày đặt hàng',
  MaKH: 'Mã khách hàng',
  TenKH: 'Tên khách hàng',
  LoaiKH: 'Loại khách hàng',
  TenThanhPho: 'Tên thành phố',
  MaThanhPho: 'Mã thành phố',
  Bang: 'Bảng',
  DiaChiVP: 'Địa chỉ văn phòng',
  MoTa: 'Mô tả',
  KichCo: 'Kích cỡ',
  TrongLuong: 'Trọng lượng',
  Gia: 'Giá',
  SoLuongDat: 'Số lượng đặt',
  GiaDat: 'Giá đặt',
  ThanhTien: 'Thành tiền',
  Ngay: 'Ngày',
  NgayTrongThang: 'Ngày trong tháng',
  Thang: 'Tháng',
  Quy: 'Quý',
  Nam: 'Năm',
  TongSoLuongDat: 'Tổng số lượng đặt',
  TongDoanhThu: 'Tổng doanh thu',
}
