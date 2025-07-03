import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label htmlFor="fristName">Frist Name</label>
          <input
            type="text"
            id="fristName"
            {...register("fristName", { required: "Enter Your Frist Name" })}
          />
          {errors.fristName && <p>{errors.fristName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Frist Name</label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", { required: "Enter Your Last Name" })}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "Enter Your Email Adress",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invaled Your Adress",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <button type="submit"> Click</button>
      </form>
    </div>
  );
  
}

export default App;
