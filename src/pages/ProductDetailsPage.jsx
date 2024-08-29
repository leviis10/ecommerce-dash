import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ProductApi from "../apis/ProductApi";
import ProductFormLabel from "../components/ProductFormLabel";
import { IMAGE_PLACEHOLDER_URL } from "../constants/images.constant";

function ProductDetailsPage() {
  const { id } = useParams();
  const { categories } = useSelector((state) => state.products);
  const location = useLocation();
  const [product, setProduct] = useState({
    name: location.state?.name || "",
    description: location.state?.description || "",
    price: location.state?.price || "",
    stock: location.state?.stock || "",
    image: null,
    imageUrls:
      location.state?.imageUrls && location.state?.imageUrls.length > 0
        ? location.state?.imageUrls[0]
        : IMAGE_PLACEHOLDER_URL,
    categories:
      location.state?.categories.map((category) => category.id.toString()) ||
      [],
  });
  const isEditForm = !!id;

  useEffect(() => {
    (async function () {
      await ProductApi.getCategories();
    })();
  }, [location.state, id]);

  function productChangeHandler(e) {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function categoriesHandlerChange(e) {
    setProduct((prevState) => {
      return {
        ...prevState,
        categories: [...e],
      };
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        setProduct((prevState) => {
          return {
            ...prevState,
            image: file,
            imageUrls: reader.result,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleRemoveImage() {
    setProduct((prevState) => {
      return {
        ...prevState,
        image: null,
        imageUrls: IMAGE_PLACEHOLDER_URL,
      };
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isEditForm ? "Update product form" : "Create product form"}
      </h1>

      <form action="" className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* column 1 */}
          <div className="space-y-6">
            <div>
              <ProductFormLabel name="name" />
              <input
                id="name"
                name="name"
                type="text"
                value={product.name}
                onChange={productChangeHandler}
                className="border w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <ProductFormLabel name="description" />
              <textarea
                id="description"
                name="description"
                className="border w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                value={product.description}
                onChange={productChangeHandler}
                required
              />
            </div>

            <div>
              <ProductFormLabel name="price" />
              <input
                id="price"
                name="price"
                type="number"
                value={product.price}
                onChange={productChangeHandler}
                className="border w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product price"
                required
              />
            </div>

            <div>
              <ProductFormLabel name="stock" />
              <input
                id="stock"
                name="stock"
                type="number"
                value={product.stock}
                onChange={productChangeHandler}
                className="border w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <ProductFormLabel name="categories" />
              {categories && categories.length > 0 && (
                <Select
                  id="categories"
                  name="categories"
                  label="select categories"
                  selectionMode="multiple"
                  placeholder="Select categories"
                  className="w-full"
                  selectedKeys={product.categories}
                  onSelectionChange={categoriesHandlerChange}
                >
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </div>
          </div>

          {/* column 2 */}
          <div className="space-y-6">
            <div>
              <ProductFormLabel name="image" />
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <img
                    src={product.imageUrls}
                    alt="Product preview"
                    className="mx-auto h-64 w-64 object-cover rounded-md"
                  />

                  <div>
                    <div className="flex text-sm text-gray-600 justify-center mt-2">
                      <ProductFormLabel
                        name="file-upload"
                        textLabel="Upload a file"
                        customClassName="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          type="file"
                          id="file-upload"
                          name="file-upload"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </ProductFormLabel>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF, up to 10MB
                    </p>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="mt-2 px-3 py-1 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditForm ? "Update product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductDetailsPage;
