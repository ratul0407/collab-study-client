import { Link, useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <h3 className="text-2xl lg:text-5xl">Something Went Wrong :(</h3>
      <div className="flex items-center gap-4">
        <Link to="/" className="btn">
          Go back to home
        </Link>
        <Link className="btn" onClick={() => navigate(-1)}>
          Go back
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
