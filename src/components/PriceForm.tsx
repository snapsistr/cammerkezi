import { useState } from 'react'

export default function PriceForm() {
  const [productId, setProductId] = useState('')
  const [unit, setUnit] = useState('m2')
  const [value, setValue] = useState('')
  const [validFrom, setValidFrom] = useState('')
  const [prices, setPrices] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
  }

  const fetchPrices = async () => {
    const res = await fetch('/api/prices')
    const data = await res.json()
    setPrices(data)
  }

  useState(() => { fetchProducts(); fetchPrices(); })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: Number(productId), unit, value: Number(value), validFrom }),
    })
    setProductId('')
    setUnit('m2')
    setValue('')
    setValidFrom('')
    fetchPrices()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <select value={productId} onChange={e => setProductId(e.target.value)} required>
          <option value="">Ürün Seç</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - {p.type} - {p.thickness}mm
            </option>
          ))}
        </select>
        <input
          value={unit}
          onChange={e => setUnit(e.target.value)}
          placeholder="Birim (m2, adet vs)"
          required
        />
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          type="number"
          step="0.01"
          placeholder="Birim Fiyat"
          required
        />
        <input
          value={validFrom}
          onChange={e => setValidFrom(e.target.value)}
          type="date"
          placeholder="Geçerli Tarih"
          required
        />
        <button type="submit">Ekle</button>
      </form>
      <ul>
        {prices.map((price) => (
          <li key={price.id}>
            {products.find(p => p.id === price.productId)?.name || '-'}: {price.value} {price.unit} ({price.validFrom})
          </li>
        ))}
      </ul>
    </div>
  )
}