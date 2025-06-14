import { useState, useEffect } from 'react'
import PdfPreview from './PdfPreview'

export function ProductCalculator() {
  const [products, setProducts] = useState<any[]>([])
  const [prices, setPrices] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')
  const [price, setPrice] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [showPdf, setShowPdf] = useState(false)

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts)
    fetch('/api/prices').then(r => r.json()).then(setPrices)
  }, [])

  useEffect(() => {
    if (!selectedProduct) return;
    const p = prices.find((pr: any) => pr.productId === Number(selectedProduct))
    if (p) {
      setUnit(p.unit)
      setPrice(p.value)
    } else {
      setUnit('')
      setPrice(null)
    }
  }, [selectedProduct, prices])

  useEffect(() => {
    if (price && quantity) {
      setTotal(price * Number(quantity))
    } else {
      setTotal(null)
    }
  }, [price, quantity])

  return (
    <div>
      <form style={{ marginBottom: 16 }}>
        <label>
          Müşteri Adı:
          <input
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            required
          />
        </label>
        <label>
          Ürün:
          <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} required>
            <option value="">Seçiniz</option>
            {products.map((p) => (
              <option value={p.id} key={p.id}>
                {p.name} - {p.type} - {p.thickness}mm
              </option>
            ))}
          </select>
        </label>
        <label>
          Miktar:
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            min={1}
            required
          />
        </label>
      </form>
      <div>
        <strong>Birim:</strong> {unit || '-'}<br />
        <strong>Birim Fiyat:</strong> {price !== null ? price.toFixed(2) : '-'}<br />
        <strong>Toplam:</strong> {total !== null ? total.toFixed(2) : '-'}
      </div>
      {total && (
        <button style={{ marginTop: 16 }} onClick={() => setShowPdf(true)}>
          PDF Teklif Oluştur
        </button>
      )}
      {showPdf && (
        <PdfPreview
          customerName={customerName}
          items={[
            {
              name: products.find(p => p.id === Number(selectedProduct))?.name || '',
              unit,
              quantity: Number(quantity),
              price: price || 0,
              total: total || 0,
            },
          ]}
          total={total || 0}
          onClose={() => setShowPdf(false)}
        />
      )}
    </div>
  )
}