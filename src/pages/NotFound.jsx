import { Link } from "react-router-dom";

/**
 * 404 Page
 */

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">

      <div className="text-center">

        <h1 className="text-7xl font-bold text-blue-600">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-500">
          The page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Go Home
        </Link>

      </div>

    </div>
  );
};

export default NotFound;