import { useState } from "react";
import { createProduct } from "../../network/lib/product";

function CreateProduct() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const product = { name, type, price, description };
    const res = await createProduct(product);
    console.log(res);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 bg-gray-100 rounded-md w-1/2 h-[40rem]"
    >
      <div className="w-[10rem]">
        <label className="text-black">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black w-[10rem]"
          />
        </label>
      </div>
      <div className="w-[10rem]">
        <label className="text-black">
          Type:
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="text-black"
          />
        </label>
      </div>
      <div className="w-[10rem]">
        <label className="text-black">
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="text-black"
          />
        </label>
      </div>
      <div className="w-[10rem]">
        <label className="text-black">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-black"
          />
        </label>
      </div>
      <button
        type="submit"
        className="text-white rounded-md p-2 px-4 bg-blue-500"
      >
        Create Product
      </button>
    </form>
  );
}

export default CreateProduct;
