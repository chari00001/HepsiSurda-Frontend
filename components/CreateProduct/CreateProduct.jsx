import { useState } from "react";
import { createProduct } from "../../network/lib/product";

function CreateProduct() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [features, setFeatures] = useState([{ key: "", value: "" }]);
  const [campaign, setCampaign] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleFeatureChange = (index, key, value) => {
    const newFeatures = [...features];
    newFeatures[index][key] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, { key: "", value: "" }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("features", JSON.stringify(features));
    formData.append("campaign", campaign);
    formData.append("discountPercent", campaign ? discountPercent : 0);
    if (image) {
      formData.append("image", image);
    }

    const res = await createProduct(formData);
    console.log(res);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-1/2 h-[40rem] p-4 space-y-4 bg-gray-100 rounded-md"
      encType="multipart/form-data"
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md text-black"
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md text-black"
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md text-black"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md text-black"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full p-2 border border-gray-300 rounded-md text-black"
      />
      <div className="flex flex-row w-full">
        <label className="flex items-center space-x-2 w-1/6">
          <input
            type="checkbox"
            checked={campaign}
            onChange={(e) => setCampaign(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-black">Campaign</span>
        </label>
        <input
          type="number"
          disabled={!campaign}
          defaultValue={0}
          placeholder="Discount Percent"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-black w-10/12"
          min="0"
          max="100"
        />
      </div>

      <div className="flex flex-col w-full space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              placeholder="Feature Key"
              value={feature.key}
              onChange={(e) =>
                handleFeatureChange(index, "key", e.target.value)
              }
              className="flex-1 p-2 border border-gray-300 rounded-md text-black"
            />
            <input
              type="text"
              placeholder="Feature Value"
              value={feature.value}
              onChange={(e) =>
                handleFeatureChange(index, "value", e.target.value)
              }
              className="flex-1 p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addFeature}
          className="p-2 px-4 text-white bg-green-500 rounded-md text-black"
        >
          Add Feature
        </button>
      </div>
      <button
        type="submit"
        className="p-2 px-4 text-white bg-blue-500 rounded-md text-black"
      >
        Create Product
      </button>
    </form>
  );
}

export default CreateProduct;
