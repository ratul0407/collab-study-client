import { MdAddAPhoto } from "react-icons/md";
import { Link } from "react-router-dom";
import googlePng from "../assets/google.png";
import githubPng from "../assets/github.png";

function SignUp() {
  return (
    <div className="bg-blue-sky mx-auto min-h-screen bg-cover bg-center p-10 font-montserrat xl:container xl:w-full">
      <h3 className="mb-10 text-center font-cursive text-4xl text-white">
        Hey There Learner Welcome Back!
      </h3>
      <div className="max-w-lg border border-blue-500 p-12 shadow-xl lg:mx-auto lg:max-w-xl">
        <form className="">
          {/* inputs container */}
          <div className="space-y-4">
            <h3 className="text-center text-2xl font-bold text-white">
              Create your own account!
            </h3>
            {/* email input field */}
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
              <input type="text" className="grow" placeholder="Email" />
            </label>

            {/* username input field */}
            <label className="input-field">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Username" />
            </label>

            {/* password input field */}
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
              <input type="password" className="grow" placeholder="password" />
            </label>

            {/* profile pic input field */}
            <label className="input-field">
              <MdAddAPhoto />
              <input type="text" className="grow" placeholder="Photo url" />
            </label>

            {/* select options for role */}
            <select
              defaultValue="default"
              className="select select-bordered w-full appearance-none border-2 bg-transparent font-bold"
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <p className="py-4 font-medium text-white">
            Already Have an Account?{" "}
            <Link to="/login" className="text-violet-800 underline">
              Login
            </Link>
          </p>
        </form>

        <div className="grid gap-4">
          <button className="social-login-btn gap-3 py-3">
            <img className="w-8" src={googlePng} alt="" />

            <span>Continue With Google</span>
          </button>
          <button className="social-login-btn">
            <img className="w-14" src={githubPng} alt="" />
            <span>Continue With Github</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
