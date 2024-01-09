# HepsiSurda Projesi

## Proje hakkında

Bu proje, Next.js ile inşa edilmiş bir front-end uygulaması ve Node.js ve Express kullanılarak geliştirilmiş bir back-end uygulamasından oluşmaktadır. Proje ayrıca veri depolama için PostgreSQL veritabanı kullanmaktadır.
## Başlangıç

### Ön gereksinimler

- Node.js
- npm (Node Package Manager)
- PostgreSQL

## Projenin kurulumu (Yerel)

#### Back-End (HepsiSurda-Backend)

1. Back-end

   ```bash
   cd HepsiSurda-Backend
   npm install
   npm start

2. Front-end
    ```bash
    cd HepsiSurda-Frontend
    npm install
    npm run dev

## Veritabanı Yapılandırması

PostgreSQL veritabanınızın aşağıdaki detaylarla ayarlandığından emin olun:

- **Kullanıcı**: `postgres`
- **Host**: `localhost`
- **Veritabanı**: `hepsisurda`
- **Şifre**: `4246`
- **Port**: `5432`

Bu yapılandırmaları, PostgreSQL veritabanına bağlanmak için uygulamanızda kullanın.
