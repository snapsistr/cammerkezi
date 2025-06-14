import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany()
    res.json(products)
  } else if (req.method === 'POST') {
    const { name, type, thickness } = req.body
    const product = await prisma.product.create({
      data: { name, type, thickness: Number(thickness) },
    })
    res.json(product)
  } else {
    res.status(405).end()
  }
}