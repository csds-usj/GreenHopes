import { Facebook } from "lucide-react";
import { Link } from "react-router";

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-muted">
      <hr />
      <div className="mx-auto w-full max-w-screen-xl xl:pb-2">
        <div className="md:flex md:justify-between px-8 p-4 py-16 sm:pb-16 gap-4">
          <div className="mb-12 flex-col flex gap-4">
            <Link className="flex items-center gap-2" to="/">
              <img
                src="/green-hopes.svg"
                alt="Green Hopes"
                className="w-[150px] h-auto"
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
              Sri Jayewardenepura Contacts
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 tracking-tighter font-medium">Show</h2>
              <ul className="gap-4 grid">
                <li>
                  <Link className="cursor-pointer duration-200 " to="/awards">
                    Awards
                  </Link>
                </li>
                <li>
                  <Link
                    className="cursor-pointer duration-200 "
                    to="/hall-of-fame"
                  >
                    Hall of Fame
                  </Link>
                </li>
                <li>
                  <Link className="cursor-pointer duration-200 " to="/terms">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 tracking-tighter font-medium">Show</h2>
              <ul className="gap-4 grid">
                <li>
                  <Link className="cursor-pointer duration-200 " to="/awards">
                    Awards
                  </Link>
                </li>
                <li>
                  <Link
                    className="cursor-pointer duration-200 "
                    to="/hall-of-fame"
                  >
                    Hall of Fame
                  </Link>
                </li>
                <li>
                  <Link className="cursor-pointer duration-200 " to="/terms">
                    Terms & Conditions
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
            >
              <Facebook className="h-6 w-6 transition-colors" />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
