"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar/Navbar";
import { useSearchParams } from "next/navigation";
import { addToCart } from "../../network/lib/cart";
import { getProductById } from "../../network/lib/product";
import {
  makeComment,
  getProductComments,
  rateComment,
} from "../../network/lib/comment";
import { replyToComment, getCommentReplies } from "../../network/lib/replies";
import { createRating, getProductRatings } from "../../network/lib/rating";
import { getUserById } from "../../network/lib/user";

const DetailPage = ({ productId }) => {
  const userId = localStorage.getItem("user_id");
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState({});
  const [currentComment, setCurrentComment] = useState("");
  const [userNames, setUserNames] = useState({});
  const [sortCriterion, setSortCriterion] = useState("date");
  const [quantity, setQuantity] = useState(1);
  const [productFeatures, setProductFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [filteredComments, setFilteredComments] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const id = useSearchParams().get("id");

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    const fetchProductAndImages = async () => {
      try {
        const productRes = await getProductById(id);
        productRes.image = `http://localhost:8080/${productRes.image}`;

        setProduct(productRes);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await getProductComments(id);
        setComments(res.data);
      } catch (error) {
        console.error("Error fetching product comments:", error);
      }
    };

    fetchProductAndImages();
    fetchComments();
  }, [productId]);

  useEffect(() => {
    // Function to fetch replies for each comment
    const fetchReplies = async (commentId) => {
      try {
        const res = await getCommentReplies(commentId);
        return res.data;
      } catch (err) {
        console.error("Error fetching replies:", err);
        return [];
      }
    };

    // Fetch replies after comments are loaded
    const fetchAllReplies = async () => {
      const newReplies = {};
      for (const comment of comments) {
        newReplies[comment.comment_id] = await fetchReplies(comment.comment_id);
      }
      setReplies(newReplies);
    };

    if (comments.length > 0) {
      fetchAllReplies();
    }
  }, [comments]);

  useEffect(() => {
    if (product && product.features) {
      // Step 1: Group features into an object based on their keys
      const tempGroupedFeatures = product.features.reduce((acc, feature) => {
        if (!acc[feature.key]) {
          acc[feature.key] = [];
        }
        acc[feature.key].push(feature.value);
        return acc;
      }, {});

      // Step 2: Convert the grouped object into an array of objects
      const groupedFeaturesArray = Object.keys(tempGroupedFeatures).map(
        (key) => {
          return { key: key, values: tempGroupedFeatures[key] };
        }
      );

      setProductFeatures(groupedFeaturesArray);
    }
  }, [product]);

  useEffect(() => {
    const sortComments = (comments, criterion) => {
      return [...comments].sort((a, b) => {
        if (criterion === "date") {
          return new Date(b.created_at) - new Date(a.created_at);
        } else if (criterion === "rating") {
          return b.rating - a.rating;
        }
      });
    };

    setFilteredComments(sortComments(comments, sortCriterion));
  }, [comments, sortCriterion]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      for (const comment of comments) {
        try {
          const res = await getUserById(comment.user_id);
          names[comment.user_id] = res.data.name + " " + res.data.surname;
        } catch (err) {
          console.error(err);
        }
      }
      setUserNames(names);
    };

    if (comments.length > 0) {
      fetchUserNames();
    }
  }, [comments]);

  const handleRatingFilter = (rating) => {
    setRatingFilter(rating);
  };

  const handleMakeComment = async (comment) => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You must be logged in to comment",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
    await makeComment({
      product_id: product.product_id,
      user_id: userId,
      text: currentComment,
    })
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Comment added",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFeatureChange = (featureKey, value) => {
    setSelectedFeatures({ ...selectedFeatures, [featureKey]: value });
  };

  const handleReplyToComment = (commentId) => {
    // Implement the logic to handle the reply
    console.log(`Replying to comment ${commentId} with text: ${replyText}`);
    // Reset the states
    setReplyingTo(null);
    setReplyText("");

    replyToComment({
      comment_id: commentId,
      user_id: userId,
      text: replyText,
    }).then((res) => {
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Reply added",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };

  const calculateDiscountedPrice = () => {
    if (product.campaign) {
      return ((product.price * (100 - product.discountpercent)) / 100).toFixed(
        2
      );
    }
    return product.price;
  };

  const handleAddToCart = async () => {
    const discountedPrice = calculateDiscountedPrice();
    const cartData = {
      user_id: userId,
      product_id: product.product_id,
      amount: discountedPrice,
      quantity,
      features: selectedFeatures,
    };

    try {
      const res = await addToCart(cartData);
      if (res.status === "OK") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Item added to cart",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRateComment = (commentId, rating) => {
    rateComment(commentId, parseInt(rating))
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Comment rated",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRating = (rating) => {
    createRating({
      user_id: userId,
      product_id: product.product_id,
      rating_count: rating,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Rating added",
          });
        } else if (res.status === 200) {
          Swal.fire({
            icon: "warning",
            title: "Hata",
            text: "Zaten oy vermişsiniz.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductRatings(id)
      .then((res) => {
        setAverageRating(res.data.averageRating);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const discountedPrice = calculateDiscountedPrice();

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 text-black">
        {product && (
          <div className="">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            {product.campaign && (
              <div className="inline-block bg-red-400 text-white px-4 py-1 text-sm font-bold rounded-full shadow-md mb-2">
                %{product.discountpercent} indirim
              </div>
            )}

            <div className="flex flex-row gap-4">
              {/* Images section */}
              <div className="w-1/3">
                <img src={product.image} alt="" className="rounded-2xl" />
              </div>
              {/* Product details section */}
              <div className="flex flex-row w-2/3 justify-between">
                <div className="flex flex-col">
                  <div className="mb-4">
                    {product.campaign ? (
                      <>
                        <span className="text-xl font-bold line-through">
                          {product.price} TL
                        </span>
                        <span className="text-xl font-bold text-red-500 ml-2">
                          {discountedPrice} TL
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold">
                        {product.price} TL
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  {/* Add to cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md"
                  >
                    Sepete Ekle
                  </button>
                </div>
                <div className="flex flex-col space-y-4">
                  {productFeatures.map((feature, i) => (
                    <div key={i} className="bg-white p-4 shadow rounded-lg">
                      <h2 className="text-lg font-semibold text-gray-700 mb-2">
                        {feature.key}
                      </h2>
                      <select
                        name={feature.key}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        onChange={(e) =>
                          handleFeatureChange(feature.key, e.target.value)
                        }
                      >
                        <option value="">Seciniz</option>
                        {feature.values.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Bu ürünü değerlendir</h2>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => handleRating(star)}>
                    {/* Replace the following with your star icon */}
                    <span className="text-yellow-500 text-2xl">★</span>
                  </button>
                ))}
                {averageRating > 0 && (
                  <span className="ml-4 text-gray-500 my-auto">
                    Ortalama Puan: {averageRating}
                  </span>
                )}
              </div>
            </div>
            {/* Comments section */}
            <div className="mt-8">
              {/* Make comment section */}
              <div>
                <h2 className="text-xl font-bold mb-4">Yorumlar</h2>
                <div className="mb-4">
                  <textarea
                    onChange={(e) => setCurrentComment(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Yorum yaz..."
                  />
                </div>
                <div className="flex flex-row justify-between items-center space-x-4">
                  <button
                    onClick={handleMakeComment}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Yorum yap
                  </button>

                  <div>
                    <select
                      value={sortCriterion}
                      onChange={(e) => setSortCriterion(e.target.value)}
                      className="border border-gray-300 rounded-md py-2 px-4 bg-white"
                    >
                      <option value="date">Tarihe göre</option>
                      <option value="rating">Puana göre</option>
                    </select>
                  </div>
                  <span className="text-gray-500">
                    Toplam yorum sayısı: {comments.length}
                  </span>
                </div>
              </div>
              {/* Comments list */}
              <div>
                <div>
                  {filteredComments.map((comment) => (
                    <div
                      key={comment.comment_id}
                      className="mb-4 p-4 bg-white shadow rounded-lg"
                    >
                      {/* User and Comment Info */}
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-700">
                          {userNames[comment.user_id] || "Loading..."}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Comment Text */}
                      <p className="text-gray-800 mb-3">{comment.text}</p>

                      <div className="flex flex-row-reverse justify-between items-center">
                        <div className="w-10/12">
                          {replyingTo === comment.comment_id ? (
                            <div className="mt-4">
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Yanıtınızı giriniz..."
                              />
                              <button
                                onClick={() =>
                                  handleReplyToComment(comment.comment_id)
                                }
                                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                              >
                                Yanıt ver
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setReplyingTo(comment.comment_id)}
                              className="mt-2 bg-gray-300 text-black py-2 px-4 rounded-md"
                            >
                              Yanıt ver
                            </button>
                          )}
                        </div>

                        {/* Rating Section */}
                        <div className="flex items-center mt-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleRateComment(
                                comment.comment_id,
                                comment.rating + 1
                              );
                            }}
                            className="mr-2"
                          >
                            👍
                          </button>
                          <span className="font-semibold">
                            {comment.rating}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleRateComment(
                                comment.comment_id,
                                comment.rating - 1
                              );
                            }}
                            className="ml-2"
                          >
                            👎
                          </button>
                        </div>
                      </div>
                      {/* Display Replies */}
                      <div className="mt-4 ml-4">
                        {replies[comment.comment_id] &&
                          replies[comment.comment_id].map((reply) => (
                            <div
                              key={reply.reply_id}
                              className="bg-gray-100 p-2 rounded-lg mb-2"
                            >
                              <p className="text-sm text-gray-600">
                                {userNames[reply.user_id] || "User"}:
                              </p>
                              <p className="text-gray-800">{reply.text}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Related products section */}
            <div>{/* ... */}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailPage;
