import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QcOd9IO56rgGemnIzuko0385oa011PousN4gkrZyIklTGfTBH25rPvxZ5t9FjNTEUdvxpGIjMBBB4xiHR9UF5JS009EjAMrJg'); // استبدل بـ API Key الخاصة بك

export default stripePromise;