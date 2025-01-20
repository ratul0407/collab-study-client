import googlePng from "../assets/google.png";
import githubPng from "../assets/github.png";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="bg-blue-horizon min-h-screen bg-cover bg-center font-montserrat">
      <div className="py-20">
        <h3 className="pb-10 text-center font-cursive text-4xl text-white">
          Welcome Learner! Login and a begin lifelong journey
        </h3>
        <div className="max-w-lg space-y-4 border border-blue-500 p-12 shadow-xl lg:mx-auto lg:max-w-xl">
          <form className="space-y-4">
            <h3 className="text-center text-2xl font-bold text-white">
              Login With Email And password
            </h3>
            <label className="input-field text-white">
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
            <label className="input-field text-white">
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
          </form>
          <span className="flex justify-center text-xl text-white">
            - - - - - - - - or - - - - - - - -
          </span>
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
          <div>
            <span className="text-white">
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
