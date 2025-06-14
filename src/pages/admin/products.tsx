import AdminLayout from '../../components/AdminLayout'
import ProductForm from '../../components/ProductForm'

export default function AdminProducts() {
  return (
    <AdminLayout>
      <h2>Ürünleri Yönet</h2>
      <ProductForm />
    </AdminLayout>
  )
}