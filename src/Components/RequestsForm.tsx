import useProducts from "../ApiQueries/useProducts";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useMutateRequests } from "../ApiQueries/useRequests";
import { toastSuccess, toastError } from "./toastUtils";
import { useQueryClient } from "@tanstack/react-query";

type Request = {
  product: Product;
  productName: string;
  quantity: number;
};

type Product = {
  id: number;
  name: string;
};

const RequestsForm = () => {
  const queryClient = useQueryClient();
  const products = useProducts();
  const mutateRequests = useMutateRequests();

  const [requestsInProgress, setRequestsInProgress] = useState<Request[]>([]);

  const form = useForm({
    defaultValues: {
      productQuantity: 1,
      product: 1,
    },
    onSubmit: async ({ value }) => {
      const p: Product = products.data.find(
        (product: Product) => product.id == value.product
      );
      const newRequest: Request = {
        product: p,
        quantity: value.productQuantity,
        productName: p.name,
      };
      const updatedRequests = requestsInProgress.concat(newRequest);
      
      // Submit the requests
      mutateRequests.mutateAsync(updatedRequests).then(
        () => {
          toastSuccess("Request filed! Awaiting admin approval.");
          setRequestsInProgress([]);
          queryClient.invalidateQueries({ queryKey: ["requests"] });
        },
        () => {
          toastError("Something went wrong. Please try again in a minute.");
        }
      );
    },
  });

  if (!products.isPending && products.error) {
    toastError("Unable to fetch products!");
    return <p>Unable to fetch products. Server down?</p>;
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="mb-4">
        {requestsInProgress.length > 0 &&
          requestsInProgress.map((req) => (
            <p key={req.product.id} className="mb-2">
              {req.quantity} {req.productName} (id {req.product.id})
            </p>
          ))}
      </div>
      <div className="max-w-md mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="bg-white p-6 rounded shadow-md"
        >
          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <label className="block mb-2 font-bold" htmlFor="product">
                Product
              </label>
              <form.Field
                name="product"
                children={(field) => (
                  <select
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {products.isPending && <option>Loading . . .</option>}
                    {products.isSuccess && (
                      <>
                        {products.data.length != 0 &&
                          products.data!.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                      </>
                    )}
                  </select>
                )}
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 font-bold" htmlFor="productQuantity">
                Quantity
              </label>
              <form.Field
                name="productQuantity"
                children={(field) => (
                  <input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    className="w-full p-2 border rounded"
                  />
                )}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestsForm;
