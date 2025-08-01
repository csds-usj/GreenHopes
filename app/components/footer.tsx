import { Link } from "react-router";

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-foreground text-muted"
      style={{ background: "var(--footer-gradient)" }}
    >
      <div className="mx-auto w-full max-w-screen-xl xl:pb-2">
        <div className="md:flex md:justify-between px-8 p-4 py-16 sm:pb-16 gap-4">
          <div className="mb-12 flex-col flex gap-4">
            <Link className="flex items-center gap-2" to="/">
              <img
                src="/green-hopes.svg"
                alt="Green Hopes"
                className="w-auto h-[48px]"
              />
              <span className="sr-only">JESA</span>
            </Link>
            <div className="flex justify-start items-center space-x-2">
              <img
                alt="USJP Logo"
                src="/usjp.jpg"
                width={40}
                height={40}
                className="select-none pointer-events-none"
              />
              <img
                alt="CSDS Logo"
                src="/csds.png"
                width={40}
                height={40}
                className="select-none pointer-events-none"
              />
            </div>
            <p className="max-w-xs text-sm ">
              Career Skills Development Society • 2025/2026 <br />
              in collaboration with Career Guidance Unit of <br /> University of
              Sri Jayewardenepura
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 tracking-tighter font-medium uppercase">
                Company
              </h2>
              <ul className="gap-4 grid">
                <li>
                  <Link
                    className="cursor-pointer duration-200 opacity-60 hover:opacity-100"
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="cursor-pointer duration-200 opacity-60 hover:opacity-100"
                    to="/timeline"
                  >
                    Timeline
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 tracking-tighter font-medium uppercase">
                Projects
              </h2>
              <ul className="gap-4 grid">
                <li>
                  <Link
                    className="cursor-pointer duration-200 opacity-60 hover:opacity-100"
                    to="/nature-code"
                  >
                    Nature Code
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between rounded-md py-4 px-8 gap-4">
          <span className="text-sm  sm:text-center">
            Copyright © 2025{" "}
            <Link className="cursor-pointer" to="/">
              CDSD
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex space-x-5 sm:justify-center sm:mt-0">
            <a
              href="https://facebook.com/greenhopesofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32px"
                height="32px"
                className="fill-muted"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                />
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
