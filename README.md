# CAM - Cam ve Ayna Fiyat Hesaplama Platformu

## Kurulum
1. Bağımlılıkları yükleyin:
   ```
   npm install
   ```

2. `.env` dosyasını oluşturun ve veritabanı bilgilerinizi girin.

3. Veritabanını oluşturun:
   ```
   npx prisma migrate dev --name init
   ```

4. Geliştirme ortamını başlatın:
   ```
   npm run dev
   ```

## Özellikler
- Ürün ve fiyat yönetimi (admin panel)
- Kullanıcıların fiyat hesaplaması ve PDF çıktısı oluşturması
- Next.js + PostgreSQL + Prisma + Ant Design stack

## Yönetim Paneli
`/admin` yolundan erişilebilir.  
Varsayılan giriş bilgisi ilk başta yoktur, NextAuth.js ile sosyal veya e-posta/şifre girişi ekleyebilirsiniz.

## PDF Çıktısı
Fiyat teklifi veya hesaplama sonucunu PDF olarak indirilebilir.

## Deployment
Projeyi kolayca Vercel veya Heroku'ya deploy edebilirsiniz.