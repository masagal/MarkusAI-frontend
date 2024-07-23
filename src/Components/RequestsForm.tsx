import useProducts from "../ApiQueries/ProductQueries";
import { useForm } from "@tanstack/react-form";

const RequestsForm = () => {
  const products = useProducts();

  const form = useForm({
    defaultValues: {
      productQuantity: 1,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
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
              {!products.isPending &&
                products.data.length != 0 &&
                products.data!.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
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
  );
};

export default RequestsForm;
