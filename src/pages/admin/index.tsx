import AdminLayout from '../../components/AdminLayout';
import Link from 'next/link';

export default function AdminHome() {
  return (
    <AdminLayout>
      <h1>Yönetim Paneli</h1>
      <ul>
        <li>
          <Link href="/admin/products">Ürünleri Yönet</Link>
        </li>
        <li>
          <Link href="/admin/prices">Fiyatları Yönet</Link>
        </li>
      </ul>
    </AdminLayout>
  );
}