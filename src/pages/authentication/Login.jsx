import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import SocialLogin from "../../components/authentication/SocialLogin";
import useAuth from "../../hooks/useAuth";
function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.pass);
      toast.success(`Welcome Back!`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-blue-horizon bg-cover bg-center font-montserrat text-white">
      <div className="py-20">
        <h3 className="pb-10 text-center font-cursive text-4xl">
          Welcome Learner! Login and a begin lifelong journey
        </h3>
        <div className="max-w-lg space-y-4 border border-blue-500 p-12 shadow-xl lg:mx-auto lg:max-w-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-4">
            <h3 className="text-center text-2xl font-bold">
              Login With Email And password
            </h3>
            <label className="input-field">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                {...register("email")}
                type="text"
                className="grow"
                placeholder="Email"
              />
            </label>
            <label className="input-field">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                {...register("pass")}
                type="password"
                className="grow"
                placeholder="password"
              />
            </label>
            <button type="submit" className="authentication-btn">
              Login
            </button>
          </form>
          <span className="flex justify-center text-xl">
            - - - - - - - - or - - - - - - - -
          </span>
          <SocialLogin />
          <div>
            <span>
              New to the site?
              <Link to="/sign-up" className="text-violet-600 underline">
                Create an account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
