import { useState } from 'react';
import visa from '../../assets/payment/Visa.png';
import pay2 from '../../assets/payment/Frame 372.png';
import paypal from '../../assets/payment/paypal.png';
import card from '../../assets/payment/CreditCard.png';
import check from '../../assets/CheckCircle.png';
import courseimg from '../../assets/courses/Image (23).png';
import { useParams } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../utils/stripe';

export default function PaymentPage() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { courseId } = useParams();
  const stripe = useStripe();
  const elements = useElements();


  const handlePayment = async () => {
    if (!stripe || !elements) {
      return; 
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error('Card element is not available');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement, 
    });

    if (error) {
      console.error(error);
      return;
    }

    try {
      const response = await fetch('/your-server-endpoint/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          courseId: courseId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPaymentSuccess(true);
      } else {
        console.error('Payment failed');
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <section className="px-4 lg:px-20 desktop:px-40 flex justify-between gap-20 py-20">
        {paymentSuccess ? (
          <div className="w-full text-center">
            <h2 className="text-2xl font-semibold mb-6">تمت العملية بنجاح!</h2>
            <p className="text-gray-700 mb-6">شكراً لإتمام عملية الدفع. يمكنك الآن الانتقال إلى الكورس أو لوحة التحكم.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={() => window.location.href = `/watch/${courseId}`}
              >
                مشاهدة الكورس
              </button>
              <button
                className="bg-gray-700 text-white py-2 px-4 rounded-md"
                onClick={() => window.location.href = '/dashboard'}
              >
                الانتقال إلى الداشبورد
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-1/2">
              <h2 className="mb-10 font-semibold text-3xl">Payment Method</h2>
              <div className="border w-full mb-4 py-3.5 flex items-center gap-6 px-6 rounded-md">
                <img src={visa} alt="visa logo" />
                <p className="text-gray-700 text-base">4855 **** **** ****</p>
                <p className="text-gray-700 text-base">04/24</p>
                <p className="text-gray-700 text-base">Vako Shvili</p>
              </div>
              <div className="mb-4 border w-full py-3.5 flex items-center gap-6 px-6 rounded-md">
                <img src={pay2} alt="visa logo" />
                <p className="text-gray-700 text-base">5795 **** **** ****</p>
                <p className="text-gray-700 text-base">04/24</p>
                <p className="text-gray-700 text-base">Vako Shvili</p>
              </div>
              <div className="mb-4 border w-full py-3.5 flex items-center gap-6 px-6 rounded-md">
                <img src={paypal} alt="paypal logo" />
                <p className="text-gray-700 text-sm">
                  You will be redirected to the PayPal site after reviewing your order.
                </p>
              </div>
              <div className="mb-4 border w-full py-3.5 flex justify-between items-center gap-6 px-6 rounded-md">
                <div className="flex items-center gap-6">
                  <img src={card} alt="visa logo" />
                  <p className="text-gray-700 text-sm">New Payment Cards</p>
                </div>
                <img src={check} alt="" />
              </div>

              <div className="my-6">
                <div className="mb-4.5">
                  <label htmlFor="" className="block text-base mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name on card"
                    className="placeholder:text-sm border w-full py-3.5 bg-transparent px-6 rounded-md"
                  />
                </div>
                <div className="mb-4.5">
                  <label htmlFor="" className="block text-base mb-2">
                    Card Number
                  </label>
                  <CardElement className="border w-full py-3.5 bg-transparent px-6 rounded-md" />
                </div>
                <div className="mb-4.5 flex gap-4.5">
                  <div className="w-1/2">
                    <label htmlFor="" className="block text-base mb-2">
                      MM / YY
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="placeholder:text-sm border w-full py-3.5 bg-transparent px-6 rounded-md"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="" className="block text-base mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="Security Code"
                      className="placeholder:text-sm border w-full py-3.5 bg-transparent px-6 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="" className="ml-2.5 text-sm">
                    Remember this card, save it on my card list
                  </label>
                </div>
              </div>
            </div>

            <div className="w-1/2 border h-max">
              <div className="p-4.5 border-b">
                <h3 className="mb-3.5">Course</h3>
                <div className="flex gap-3">
                  <img src={courseimg} alt="" className="w-100px h-auto" />
                  <div>
                    <span className="text-xs">Course by:</span>{' '}
                    <span className="text-xs">Courtney Henry</span>
                    <h3 className="text-sm mb-2.5">
                      Graphic Design Masterclass - Learn GREAT Design
                    </h3>
                    <p className="text-sm">$13.00</p>
                  </div>
                </div>
              </div>
              <div className="p-4.5">
                <h3 className="mb-3.5">Order Summery</h3>
                <div className="mb-5 flex justify-between items-center">
                  <span>Total:</span>
                  <span>$13.00 USD</span>
                </div>
                <button
                  className="w-full p-3 bg-violet-950 text-white"
                  onClick={handlePayment}
                  disabled={!stripe || !elements} 
                >
                  Complete Payment
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </Elements>
  );
}
