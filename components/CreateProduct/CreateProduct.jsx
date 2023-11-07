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
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black"
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-black"
        />
      </label>
      <label>
        Price:
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="text-black"
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-black"
        />
      </label>
      <button type="submit">Create Product</button>
    </form>
  );
}

export default CreateProduct;
