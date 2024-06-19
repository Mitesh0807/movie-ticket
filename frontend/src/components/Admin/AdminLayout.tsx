import { Link, Outlet } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SVGProps, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { admin } from "@/store/slices/auth/authActions";
import Loading from "@/components/ui/Loading";

function AdminLayout() {
  const dispatch = useDispatch();
  const { isAdmin, status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(admin());
  }, [dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  if (!isAdmin) {
    return <div>You are not authorized to access this page.</div>;
  }
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link to={"/admin"} className="flex items-center justify-center">
          <ClapperboardIcon className="h-6 w-6" />
          <span className="sr-only">Admin Panel</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            to={"/admin/movie/create"}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Create Movie
          </Link>
          <Link
            to={"/admin/genre/create"}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Create Genre
          </Link>
          <Link
            to={"/admin/showtime/create"}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Create Showtime
          </Link>
          <Link
            to={"/admin/cinema/create"}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            create Cinema
          </Link>
          <Link
            to={"/admin"}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Link
              to={"/admin"}
              className="inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              Admin Home
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; 2024 MoviePlex. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            to={"/admin"}
            className="text-xs hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            to={"/admin"}
            className="text-xs hover:underline underline-offset-4"
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

export default AdminLayout;

function ClapperboardIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
      <path d="m6.2 5.3 3.1 3.9" />
      <path d="m12.4 3.4 3.1 4" />
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  );
}
