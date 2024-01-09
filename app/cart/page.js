"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  getAllCartItemsByUserId,
  deleteCartItemById,
  deleteAllCartItemsByUserId,
  updateCartItemQuantity,
} from "../../network/lib/cart";
import { getProductById } from "../../network/lib/product";
import { makeOrder } from "../../network/lib/order";
import { getAllCoupons, getCouponByCode } from "../../network/lib/coupon";
import Swal from "sweetalert2";

const CartPage = () => {
  const userId = localStorage.getItem("user_id");

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [orderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItemsRes = await getAllCartItemsByUserId(userId);
        const cartItemsWithDetails = await Promise.all(
          cartItemsRes.map(async (item) => {
            try {
              const productDetails = await getProductById(item.product_id);
              console.log(productDetails);
              return {
                ...item,
                name: productDetails.name,
                price: productDetails.price,
                image: productDetails.image,
                description: productDetails.description,
              };
            } catch (err) {
              console.error("Error fetching product details", err);
              return item;
            }
          })
        );
        console.log(cartItemsWithDetails);
        setItems(cartItemsWithDetails);
      } catch (err) {
        console.error("Error fetching cart items", err);
      }
    };

    fetchCartItems();
  }, [userId]);

  useEffect(() => {
    if (items) {
      let total = 0;
      items.map((item) => {
        total += item.amount * item.quantity;
      });
      console.log(total);
      setTotal(total);
    }
  }, [items]);

  const completeOrder = () => {
    makeOrder({
      user_id: userId,
      products: items,
      total_price: quantity * total,
      delivery_address: "123 Main St",
      payment_method: "Credit Card",
      order_state: "Pending",
    })
      .then((res) => {
        if (res.status === "OK") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Order completed",
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (itemId) => {
    deleteCartItemById(itemId)
      .then((res) => {
        if (res.status === 204) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Item deleted",
          });
          setTimeout(() => {
            window.location.href = "/cart";
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEmptyCart = () => {
    deleteAllCartItemsByUserId(userId)
      .then((res) => {
        if (res.status === 204) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Cart emptied",
          });
          setTimeout(() => {
            window.location.href = "/cart";
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateQuantity = (itemId, quantity) => {
    updateCartItemQuantity(itemId, quantity)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Item quantity updated",
          });
          setTimeout(() => {
            window.location.href = "/cart";
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModal = () => {
    setOrderModalOpen(true);
  };

  const closeModal = () => {
    setOrderModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Sepetiniz</h1>
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Ürün
                </th>
                <th scope="col" className="px-6 py-3">
                  Adet
                </th>
                <th scope="col" className="px-6 py-3">
                  Fiyat
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr className="bg-white border-b" key={i}>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.quantity > 1) {
                            updateQuantity(item.cart_id, item.quantity - 1);
                          }
                        }}
                        className="bg-red-500 text-white rounded px-2 py-1 mr-2"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          updateQuantity(item.cart_id, item.quantity + 1);
                        }}
                        className="bg-green-500 text-white rounded px-2 py-1 ml-2"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">${item.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteItem(item.cart_id)}
                      className="font-medium text-red-600 hover:underline mr-2"
                    >
                      Sepetten Çıkar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleEmptyCart}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Sepeti boşalt
          </button>
          <div className="text-lg font-bold text-gray-700">
            Toplam: ${total}
          </div>
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Siparişi gözden geçir
          </button>
        </div>
      </div>
      <OrderCompletionModal
        isOpen={orderModalOpen}
        onClose={closeModal}
        cartItems={items}
        userId={userId}
        total={total}
      />
    </div>
  );
};

const OrderCompletionModal = ({
  isOpen,
  onClose,
  cartItems,
  userId,
  total,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);

  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponUsed, setCouponUsed] = useState(false);

  useEffect(() => {
    if (total) {
      setTotalPrice(total);
    }
  }, [total]);

  const renderOrderSummary = () => {
    return cartItems.map((item, index) => (
      <div key={index} className="flex justify-between mb-2">
        <span className="text-black">
          Ürün: {productDetails[item.product_id]}
        </span>
        <span className="text-black">Adet: {item.quantity}</span>
        <span className="text-black">Fiyat: ${item.amount}</span>
      </div>
    ));
  };

  const handleEmptyCart = () => {
    deleteAllCartItemsByUserId(userId)
      .then((res) => {
        if (res.status === 204) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Cart emptied",
          });
          setTimeout(() => {
            window.location.href = "/cart";
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const applyCoupon = () => {
    getCouponByCode(couponCode)
      .then((res) => {
        if (res.status === 200) {
          const isExpired = new Date(res.data.enddate) < new Date();
          if (isExpired) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Kuponun süresi dolmuş",
            });
          } else {
            console.log(res.data);
            if (res.data.coupontype === "price") {
              setTotalPrice(totalPrice - parseInt(res.data.pricediscount));
            } else if (res.data.coupontype === "percent") {
              setTotalPrice(
                totalPrice -
                  (totalPrice * parseInt(res.data.percentdiscount)) / 100
              );
            }
            setCouponUsed(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completeOrder = () => {
    // Check if all required fields are filled
    if (
      !deliveryAddress.trim() ||
      !paymentMethod.trim() ||
      !deliveryMethod.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all fields before completing the order.",
      });
      return;
    }

    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        makeOrder({
          user_id: userId,
          products: cartItems,
          total_price: totalPrice,
          delivery_method: deliveryMethod,
          delivery_address: deliveryAddress,
          payment_method: paymentMethod,
          order_state: "Pending",
        })
          .then((res) => {
            if (res.status === "OK") {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Order completed",
              });
              handleEmptyCart(); // Empty the cart after successful order
              setTimeout(() => {
                window.location.href = "/";
              }, 1500);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    // Fetch product details for each cart item
    const fetchProductDetails = async () => {
      const details = {};
      for (const item of cartItems) {
        try {
          const response = await getProductById(item.product_id);
          details[item.product_id] = response.name;
        } catch (error) {
          console.error("Error fetching product details", error);
        }
      }
      setProductDetails(details);
    };

    if (isOpen) {
      fetchProductDetails();
    }
  }, [isOpen, cartItems]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-1/3 space-y-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Sipariş Özeti</h2>
        <div>{renderOrderSummary()}</div>

        <div className="flex flex-col space-y-3">
          <div>
            <label className="block text-gray-700">Adres</label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-700">Ödeme Yöntemi</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
            >
              <option value="" disabled>
                Ödeme Yöntemi Seçin
              </option>
              <option value="Kredi Kartı">Kredi Kartı</option>
              <option value="Banka Kartı">Banka Kartı</option>
              <option value="PayPal">PayPal</option>
              <option value="Kapıda ödeme">Kapıda ödeme</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Teslimat Yöntemi</label>
            <select
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
            >
              <option value="" disabled>
                Teslimat Yöntemi Seçin
              </option>
              <option value="Standart Taşıma">Standart Taşıma</option>
              <option value="Express Taşıma">Express Taşıma</option>
              <option value="Gece Taşıma">Gece Taşıma</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Kupon kodu</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Kupon kodunuzu giriniz"
                // Assuming you have a state variable for the coupon code
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md text-gray-700"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (couponUsed) {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "You already used a coupon",
                    });
                  } else {
                    applyCoupon();
                  }
                }} // Assuming you have an applyCoupon function
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-semibold text-gray-800">
              Toplam Tutar:
            </div>
            <div className="text-2xl font-bold text-green-600">
              {totalPrice} TL{" "}
              {/* Replace with your total price state variable */}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Kapat
            </button>
            <button
              onClick={completeOrder}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Siparişi Tamamla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
