import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router";
import Gradient from "~/components/gradient";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const location = useLocation();
  const isNatureCode = location.pathname === "/nature-code";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="container relative z-50 flex h-16 lg:h-full max-w-[1216px] items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center transition-colors mr-12">
          <img
            src="/green-hopes.svg"
            alt="Green Hopes"
            className="w-auto h-[48px]"
          />
          <span className="sr-only">Green Hopes</span>
        </Link>
        {/* Centered Glassy Nav Links */}
        <div
          className="hidden xl:flex items-center absolute left-1/2 -translate-x-1/2 rounded-full border border-white/50 text-sm font-medium  shadow-lg shadow-gray-800/5 ring-1 ring-gray-800/[.075] backdrop-blur-xl px-8 py-2.5"
          style={{ background: "var(--nav-gradient)" }}
        >
          <ul className="flex items-center gap-x-6">
            <li>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <div
                    className="group"
                    onMouseEnter={() => setIsPopoverOpen(true)}
                    onMouseLeave={() => setIsPopoverOpen(false)}
                  >
                    <button className="flex items-center gap-1 transition-colors hover:text-primary group-hover:text-primary">
                      Projects
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="w-40 p-1 shadow-sm"
                  sideOffset={8}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  onMouseEnter={() => setIsPopoverOpen(true)}
                  onMouseLeave={() => setIsPopoverOpen(false)}
                >
                  <div className="space-y-0.5">
                    <Link
                      to="/nature-code"
                      className="block px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Nature Code
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
            <li>
              <Link
                to="/about"
                className="transition-colors hover:text-primary"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/timeline"
                className="transition-colors hover:text-primary"
              >
                Timeline
              </Link>
            </li>
          </ul>
        </div>
        {/* Social Links - Desktop right corner */}
        <div className="hidden lg:flex items-center gap-x-4 ml-auto">
          <a
            href="https://facebook.com/greenhopesofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32px"
              height="32px"
              className={`${
                location.pathname === "/nature-code"
                  ? " text-muted"
                  : "text-muted-foreground"
              }`}
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
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`lg:hidden transition-colors ml-auto ${isNatureCode ? "text-muted" : ""}`}
          type="button"
        >
          {isMenuOpen ? (
            <X size={24} className={isNatureCode ? "text-muted" : ""} />
          ) : (
            <Menu size={24} className={isNatureCode ? "text-muted" : ""} />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className={`fixed bg-background inset-x-0 bottom-0 z-40 block lg:hidden top-16 ${isNatureCode ? "nature-code-bg -mt-[64px] pt-[64px]" : ""}`}
          style={
            isNatureCode
              ? {
                  background: "var(--nature-code-gradient)",
                  clipPath: "inset(64px 0 0 0)",
                }
              : undefined
          }
        >
          <div className="flex h-full w-full flex-col justify-between text-left pt-[55px]">
            {/* Hide Gradient on /nature-code */}
            {!isNatureCode && (
              <Gradient
                className="-mt-[64px]"
                style={{
                  clipPath: "inset(64px 0 0 0)",
                }}
              />
            )}
            <nav className="px-7.5 md:px-8">
              <ul className="flex w-full flex-col overflow-y-auto">
                <li
                  className={`group/navitem relative ${isNatureCode ? "border-b border-muted/30" : "border-b"}`}
                >
                  <Button
                    asChild
                    variant="ghost"
                    className={`flex w-full items-center gap-x-1.5 rounded-full py-5 whitespace-pre text-lg leading-none transition-colors duration-200 h-auto justify-start ${isNatureCode ? "text-muted" : ""}`}
                  >
                    <Link to="/nature-code" onClick={toggleMenu}>
                      Nature Code
                    </Link>
                  </Button>
                </li>
                <li
                  className={`group/navitem relative ${isNatureCode ? "border-b border-muted/30" : "border-b"}`}
                >
                  <Button
                    asChild
                    variant="ghost"
                    className={`flex w-full items-center gap-x-1.5 rounded-full py-5 whitespace-pre text-lg leading-none  transition-colors duration-200  h-auto justify-start ${isNatureCode ? "text-muted" : ""}`}
                  >
                    <Link to="/about" onClick={toggleMenu}>
                      About
                    </Link>
                  </Button>
                </li>
                <li
                  className={`group/navitem relative ${isNatureCode ? "border-b border-muted/30" : "border-b"}`}
                >
                  <Button
                    asChild
                    variant="ghost"
                    className={`flex w-full items-center gap-x-1.5 rounded-full py-5 whitespace-pre text-lg leading-none  transition-colors duration-200  h-auto justify-start ${isNatureCode ? "text-muted" : ""}`}
                  >
                    <Link to="/timeline" onClick={toggleMenu}>
                      Timeline
                    </Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
