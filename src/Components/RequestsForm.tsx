import useProducts from "../ApiQueries/ProductQueries";
import { useForm } from "@tanstack/react-form";

const RequestsForm = () => {
  const { isPending, error, data } = useProducts();

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
