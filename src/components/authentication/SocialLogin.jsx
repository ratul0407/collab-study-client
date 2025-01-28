import googlePng from "../../assets/google.png";
import githubPng from "../../assets/github.png";
import useAuth from "../../hooks/useAuth";
import { saveUser } from "../../api/utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function SocialLogin() {
  const { googleSignIn, githubSignIn } = useAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const data = await googleSignIn();
      await saveUser(data?.user);
      toast.success("Sign In SuccessFul");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleGithubSignIn = async () => {
    try {
      const data = await githubSignIn();
      console.log(data);
      if (!data.email)
        toast.error(
          "You might not be able to use the application unless you sign in with google, or you email, as github doesn't proved necessary information for our application to run properly",
        );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="grid gap-4">
      <button
        onClick={handleGoogleSignIn}
        className="social-login-btn gap-3 py-3"
      >
        <img className="w-8" src={googlePng} alt="" />

        <span>Continue With Google</span>
      </button>
      <button onClick={handleGithubSignIn} className="social-login-btn">
        <img className="w-14" src={githubPng} alt="" />
        <span>Continue With Github</span>
      </button>
    </div>
  );
}

export default SocialLogin;
