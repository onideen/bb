import React from "react";
import {
  Navbar as MaterialNavbar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import NavElement from "./NavElement";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <NavElement title="Om Oss" to="/om-oss" />
      <NavElement title="Kurs" to="/kurs" />
      <NavElement title="Svermfangere" to="/svermfangere" />
      <NavElement title="Kontakt" to="/kontakt" />
      <NavElement title="Bli Medlem" to="/bli-medlem" />
    </ul>
  );

  return (
    <>
      <MaterialNavbar
        className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-0"
        color="blue"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link
            href="/"
            passHref
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <Image
              src="/images/logo.jpg"
              alt="Bærum Birøkterlag"
              className="h-24"
            />
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </MaterialNavbar>
    </>
  );
}
