# MERN E-Commerce Website

Full-stack starter covering authentication, JWT, roles, products, categories, search/filter/sort/pagination, cart, checkout, orders, tracking/status, admin inventory/users/orders, MongoDB, MVC REST APIs and responsive React UI.

## 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# edit .env if needed
npm run dev
```
API: http://localhost:5000

## 2. Frontend
Open another terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend: http://localhost:5173

## 3. MongoDB
Start MongoDB locally. Default DB is `mern_ecommerce`.

## 4. Make an admin
Register normally, then in MongoDB change the user's role:
```js
db.users.updateOne({email:"your@email.com"}, {$set:{role:"admin"}})
```
Then login again. Admin panel is `/admin`.

## Notes
- Passwords use bcrypt hashing.
- JWT is stored in localStorage for this learning project; production apps should consider secure httpOnly cookie sessions.
- Online payment option is represented in checkout but no payment gateway is wired. Integrate Razorpay/Stripe server-side before accepting real payments.
- Product image upload is URL-based in this version; Cloudinary/S3 can be added later.

## Quick Demo Data Setup
After creating `.env` and starting MongoDB:
```bash
cd backend
npm install
npm run seed
npm run dev
```
Seeded admin login:
- Email: `admin@shopverse.com`
- Password: `Admin@123`

The seed command creates 6 categories and 24 populated products with images, featured, trending and offer flags.
