import React from "react";
import { useState, useEffect } from "react";
import { getOrdersByUserId } from "../../network/lib/order";
import Link from "next/link";

const Orders = () => {
  const userId = localStorage.getItem("user_id");

  const order = {
    orderNumber: "123456",
    date: "2023-12-28",
    items: [
      { name: "Product 1", quantity: 2, price: 20 },
      { name: "Product 2", quantity: 1, price: 35 },
    ],
    status: "Delivered",
  };

  const totalAmount = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrdersByUserId(userId)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div className="w-[30rem]">
      <main className="py-8">
        <div className="ml-4 bg-white rounded-lg shadow-lg">
          <div className="p-4">
            <div className=" flex items-center justify-center text-black">
              {/* Order Details */}
              <h2 className="text-xl font-semibold text-black">
                Sipariş Geçmişi
              </h2>
            </div>
            <div className="flex flex-col overflow-y-scroll max-h-[44.55rem]">
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  className="mb-4 p-4 bg-white rounded-lg shadow"
                >
                  <h2 className="text-xl font-semibold text-black">
                    Sipariş numarası: {order.order_id}
                  </h2>
                  <p className="text-black">
                    <strong>Tarih:</strong>{" "}
                    {new Date(order.order_date).toLocaleDateString()}
                  </p>
                  <p className="text-black">
                    <strong>Toplam tutar:</strong> ${order.total_price}
                  </p>
                  <p className="text-black">
                    <strong>Teslimat adresi:</strong> {order.delivery_address}
                  </p>
                  <p className="text-black">
                    <strong>Teslimat yöntemi:</strong> {order.delivery_method}
                  </p>
                  <p className="text-black">
                    <strong>Ödeme yöntemi:</strong> {order.payment_method}
                  </p>
                  <p className="text-black">
                    <strong>Sipariş durumu:</strong> {order.order_state}
                  </p>

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-black">
                      Ürünler
                    </h3>
                    <ul className="overflow-y-scroll max-h-[10rem]">
                      {order.products.map((product, index) => (
                        <li key={index} className="flex items-center mt-2 mx-2">
                          <Link
                            href={{
                              pathname: "/product",
                              query: {
                                id: product.product_id,
                              },
                            }}
                          >
                            <img
                              src={"http://localhost:8080/" + product.image}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded mr-4 hover:scale-105 transition duration-300 ease-in-out"
                            />
                          </Link>
                          <div>
                            <p className="text-black">{product.name}</p>
                            <p className="text-black">
                              Fiyat: ${product.price}
                            </p>
                            <p className="text-black">
                              Adet: {product.quantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="py-4">{/* Additional content or links */}</footer>
    </div>
  );
};

export default Orders;
