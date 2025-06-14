import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function createQuotePdf(quote: {
  customerName: string;
  items: { name: string; unit: string; quantity: number; price: number; total: number }[];
  total: number;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText('Teklif Formu', { x: 50, y: 800, size: 24, font, color: rgb(0, 0, 0.8) });
  page.drawText(`Müşteri: ${quote.customerName}`, { x: 50, y: 770, size: 14, font });

  let y = 730;
  page.drawText('Ürün', { x: 50, y, size: 12, font });
  page.drawText('Birim', { x: 200, y, size: 12, font });
  page.drawText('Adet', { x: 270, y, size: 12, font });
  page.drawText('Birim Fiyat', { x: 330, y, size: 12, font });
  page.drawText('Toplam', { x: 430, y, size: 12, font });

  y -= 25;
  quote.items.forEach((item) => {
    page.drawText(item.name, { x: 50, y, size: 11, font });
    page.drawText(item.unit, { x: 200, y, size: 11, font });
    page.drawText(item.quantity.toString(), { x: 270, y, size: 11, font });
    page.drawText(item.price.toFixed(2), { x: 330, y, size: 11, font });
    page.drawText(item.total.toFixed(2), { x: 430, y, size: 11, font });
    y -= 20;
  });

  page.drawText(`GENEL TOPLAM: ${quote.total.toFixed(2)} TL`, { x: 50, y: y - 30, size: 14, font, color: rgb(1, 0, 0) });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}