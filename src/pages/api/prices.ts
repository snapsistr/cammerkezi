import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const prices = await prisma.price.findMany()
    res.json(prices)
  } else if (req.method === 'POST') {
    const { productId, unit, value, validFrom } = req.body
    const price = await prisma.price.create({
      data: {
        productId: Number(productId),
        unit,
        value: Number(value),
        validFrom: new Date(validFrom),
      },
    })
    res.json(price)
  } else {
    res.status(405).end()
  }
}