import { NextApiRequest, NextApiResponse } from 'next'
import { createQuotePdf } from '../../lib/pdf'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { customerName, items, total } = req.body
  const pdfBytes = await createQuotePdf({ customerName, items, total })
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename=teklif.pdf')
  res.send(Buffer.from(pdfBytes))
}