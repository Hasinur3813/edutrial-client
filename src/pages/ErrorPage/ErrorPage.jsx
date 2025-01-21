import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightGray text-text">
      <div className="text-center">
        {/* Error Image */}
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-illustration-download-in-svg-png-gif-file-formats--404-error-page-pack-network-communication-illustrations-6167023.png?f=webp"
          alt="404 Not Found"
          className="w-1/2 mx-auto max-w-sm"
        />

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-error mt-6">Oops!</h1>
        <p className="mt-2 text-muted text-lg">
          Something went wrong. We couldn’t find the page you’re looking for.
        </p>

        {/* Go Back Button */}
        <Link to="/" className="mt-6 inline-block">
          <button className="flex items-center gap-2 px-6 py-2 bg-primaryColor hover:bg-secondaryColor text-white rounded-lg shadow-md transition-all">
            <FaArrowLeft /> Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
