import { Link, useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-[#23483A]">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Link
            to="/"
            className="rounded-md bg-gradient-to-br from-[#23483A] via-[#315C4A] to-[#456B57] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
          >
            Go back home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="rounded-md border border-gray-300 px-3.5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
