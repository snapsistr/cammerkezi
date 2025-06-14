import { useState } from 'react'

export default function ProductForm() {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [thickness, setThickness] = useState('')
  const [products, setProducts] = useState<any[]>([])

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type, thickness: Number(thickness) }),
    })
    setName('')
    setType('')
    setThickness('')
    fetchProducts()
  }

  // İlk renderda ürünleri çek
  useState(fetchProducts)

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ürün Adı"
          required
        />
        <input
          value={type}
          onChange={e => setType(e.target.value)}
          placeholder="Tür (cam, ayna vs)"
          required
        />
        <input
          value={thickness}
          onChange={e => setThickness(e.target.value)}
          type="number"
          step="0.1"
          placeholder="Kalınlık (mm)"
          required
        />
        <button type="submit">Ekle</button>
      </form>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name} - {p.type} - {p.thickness} mm</li>
        ))}
      </ul>
    </div>
  )
}