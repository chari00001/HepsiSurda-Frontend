"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar/Navbar";

const DetailPage = ({ productId }) => {
  const [product, setProduct] = useState({
    name: "Mock Product",
    images: [
      { id: 1, url: "https://example.com/image1.jpg", alt: "Image 1" },
      { id: 2, url: "https://example.com/image2.jpg", alt: "Image 2" },
    ],
    price: "$99.99",
    details: "This is a mock product.",
  });
  const [comments, setComments] = useState([
    { id: 1, text: "Great product!", rating: 5 },
    { id: 2, text: "Not bad, but could be better.", rating: 3 },
    { id: 3, text: "I love it!", rating: 5 },
    { id: 4, text: "Average product.", rating: 2 },
  ]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);

  const id = useSearchParams().get("id");

  useEffect(() => {
    // Fetch product details by ID from the server
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    // Fetch comments for the product from the server
    // const fetchComments = async () => {
    //   try {
    //     const response = await fetch(`/api/products/${productId}/comments`);
    //     const data = await response.json();
    //     setComments(data);
    //   } catch (error) {
    //     console.error("Error fetching comments:", error);
    //   }
    // };

    fetchProduct();
    // fetchComments();
  }, [productId]);

  useEffect(() => {
    // Apply rating filter to comments
    if (ratingFilter) {
      const filtered = comments.filter(
        (comment) => comment.rating === ratingFilter
      );
      setFilteredComments(filtered);
    } else {
      setFilteredComments(comments);
    }
  }, [comments, ratingFilter]);

  const handleRatingFilter = (rating) => {
    setRatingFilter(rating);
  };

  const handleMakeComment = (comment) => {
    // Add new comment to the server and update comments state
    // ...
  };

  const handleReplyToComment = (commentId, reply) => {
    // Add reply to the comment on the server and update comments state
    // ...
  };

  const handleAddToCart = () => {
    // Add the product to the cart
    // ...
  };

  const handleCompare = () => {
    // Add the product to the compare list
    // ...
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 text-black">
        {product && (
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Images section */}
              <div>
                {product.images.map((image) => (
                  <div
                    key={image.id}
                    className="w-full h-48 mb-2 overflow-hidden rounded-lg"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {/* Product details section */}
              <div>
                <div className="mb-4">
                  <span className="text-xl font-bold">{product.price}</span>
                </div>
                <div>
                  <p className="text-gray-800">{product.details}</p>
                </div>
                {/* Add to cart button */}
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md"
                >
                  Add to Cart
                </button>
                {/* Cargo and delivery options section */}
                <div>{/* ... */}</div>
                {/* Compare button */}
                <button
                  onClick={handleCompare}
                  className="bg-gray-500 text-white py-2 px-4 mt-2 rounded-md"
                >
                  Compare
                </button>
              </div>
            </div>
            {/* Comments section */}
            <div className="mt-8">
              {/* Make comment section */}
              <div>{/* ... */}</div>
              {/* Filter comments by rating button */}
              <div className="mb-4">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingFilter(rating)}
                    className="mr-2 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                  >
                    {rating} Stars
                  </button>
                ))}
                <button
                  onClick={() => setRatingFilter(null)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  All Ratings
                </button>
              </div>
              {/* Comments list */}
              <div>
                {comments.map((comment) => (
                  <div key={comment.id} className="mb-4">
                    {/* Comment content */}
                    <p className="text-gray-800">{comment.text}</p>
                    {/* Rating bar */}
                    <div>{/* ... */}</div>
                    {/* Reply section */}
                    <div>{/* ... */}</div>
                  </div>
                ))}
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
