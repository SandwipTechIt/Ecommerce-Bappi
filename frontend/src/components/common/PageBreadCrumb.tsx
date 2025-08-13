import { Link, useLocation } from "react-router";

interface BreadcrumbProps {
  pageTitle: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter(Boolean);
  console.log(pathnames);
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {pageTitle}
      </h2>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          {pathnames.length > 0 && (
            <li className="inline-flex items-center gap-1.5">
              <Link to="/" className="hover:text-gray-700 dark:hover:text-white/70">
                Home
              </Link>
              <ChevronIcon />
            </li>
          )}
          {pathnames.map((name: string, index: number) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={name} className="inline-flex items-center gap-1.5">
                <Link
                  to={routeTo}
                  className={`capitalize ${isLast ? "font-medium text-gray-800 dark:text-white/90" : "hover:text-gray-700 dark:hover:text-white/70"}`}
                >
                  {name.replace(/-/g, " ")}
                </Link>
                {!isLast && <ChevronIcon />}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

const ChevronIcon: React.FC = () => (
  <svg
    className="stroke-current"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PageBreadcrumb;