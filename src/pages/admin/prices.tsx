import AdminLayout from '../../components/AdminLayout'
import PriceForm from '../../components/PriceForm'

export default function AdminPrices() {
  return (
    <AdminLayout>
      <h2>Fiyatları Yönet</h2>
      <PriceForm />
    </AdminLayout>
  )
}