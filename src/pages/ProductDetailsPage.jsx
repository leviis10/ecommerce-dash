import { Select, SelectItem } from "@nextui-org/react";
import ProductFormLabel from "../components/ProductFormLabel";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ProductApi from "../apis/ProductApi";
import { useSelector } from "react-redux";

function ProductDetailsPage() {
  const { id } = useParams();
  const { categories } = useSelector((state) => state.products);
  const isEditForm = !!id;

  useEffect(() => {
    (async function () {
      await ProductApi.getCategories();
    })();
  }, []);

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
                required
              />
            </div>

            <div>
              <ProductFormLabel name="price" />
              <input
                id="price"
                name="price"
                type="text"
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
                className="border w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <ProductFormLabel name="categories" />
              <Select
                id="categories"
                name="categories"
                label="select categories"
                selectionMode="multiple"
                placeholder="Select categories"
                className="w-full"
              >
                {categories.map((category) => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* column 2 */}
          <div className="space-y-6">
            <div>
              <ProductFormLabel name="image" />
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <img
                    src="https://placehold.co/400/png"
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
                        />
                      </ProductFormLabel>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF, up to 10MB
                    </p>
                    <button
                      type="button"
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
      </form>
    </div>
  );
}

export default ProductDetailsPage;
