import useProducts from "../ApiQueries/useProducts";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import useMutateRequests from "../ApiQueries/RequestsFormQueries";
import { toastSuccess, toastError } from "./toastUtils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
      setRequestsInProgress(
        requestsInProgress.concat([
          {
            product: p,
            quantity: value.productQuantity,
            productName: p.name,
          },
        ])
      );
      console.log(value);
    },
  });

  const submitRequests = () => {
    mutateRequests.mutateAsync(requestsInProgress).then(
      () => {
        toastSuccess("Request filed! Awaiting admin approval.");
        setRequestsInProgress([]);
        queryClient.invalidateQueries({ queryKey: ["requests"] });
      },
      () => {
        toastError("Something went wrong. Please try again in a minute.");
      }
    );
  };

  if (!products.isPending && products.error) {
    toastError("Unable to fetch products!");
    return <p>Unable to fetch products. Server down?</p>;
  }

  return (
    <>
      <div>
        {requestsInProgress.length > 0 &&
          requestsInProgress.map((req) => (
            <p key={req.product.id}>
              {req.quantity} {req.productName} (id {req.product.id})
            </p>
          ))}
        <button onClick={submitRequests}>Submit Requests</button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="product"
            children={(field) => (
              <select
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
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
          <form.Field
            name="productQuantity"
            children={(field) => (
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="text"
              />
            )}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default RequestsForm;
