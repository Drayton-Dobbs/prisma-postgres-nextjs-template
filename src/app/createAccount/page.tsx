"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define validation schema using Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

type schemaType = z.infer<typeof schema>;

const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  // Form submit handler
  const onSubmit: SubmitHandler<schemaType> = async (data) => {
    try {
      const response = await fetch("/api/createAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      // Optionally handle success response
      const newUser = await response.json();
      console.log("User created:", newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="min-h-screen h-full w-full bg-red-500 flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between p-2 w-[400px]">
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="flex justify-between p-2">
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="flex justify-between p-2">
          <label>Name</label>
          <input type="text" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className="flex justify-end p-2">
          <button type="submit" className="bg-yellow-200 px-4 py-2 rounded-sm">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
