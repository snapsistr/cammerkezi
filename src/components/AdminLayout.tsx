import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav style={{ background: '#1677ff', color: '#fff', padding: 16 }}>
        <Link href="/admin">
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: 22 }}>CAM Admin</span>
        </Link>
        <span style={{ marginLeft: 32 }}>
          <Link href="/admin/products" style={{ color: '#fff', marginRight: 16 }}>Ürünler</Link>
          <Link href="/admin/prices" style={{ color: '#fff' }}>Fiyatlar</Link>
        </span>
      </nav>
      <div style={{ margin: 24 }}>{children}</div>
    </div>
  )
}