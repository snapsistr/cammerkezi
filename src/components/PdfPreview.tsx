import { useEffect, useState } from 'react'

type Props = {
  customerName: string
  items: { name: string; unit: string; quantity: number; price: number; total: number }[]
  total: number
  onClose: () => void
}

export default function PdfPreview({ customerName, items, total, onClose }: Props) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPdf() {
      const res = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, items, total }),
      })
      const blob = await res.blob()
      setPdfUrl(URL.createObjectURL(blob))
    }
    fetchPdf()
  }, [customerName, items, total])

  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 8, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 8, right: 8 }}>Kapat</button>
        {pdfUrl ? (
          <iframe src={pdfUrl} width={400} height={500} title="PDF" />
        ) : (
          <div>PDF hazırlanıyor...</div>
        )}
        {pdfUrl && (
          <a href={pdfUrl} download="teklif.pdf" style={{ display: 'block', marginTop: 16 }}>
            PDF İndir
          </a>
        )}
      </div>
    </div>
  )
}