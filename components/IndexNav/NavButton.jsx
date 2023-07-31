"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback } from "react";

const NavButton = ({ type, className }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = parseInt(searchParams.get("page") || 1); // Get the current page from the query string

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  let nextPage;

  type === "next" ? (nextPage = currentPage + 1) : (nextPage = currentPage - 1); //forward or backward nav

  nextPage < 1 ? nextPage = 1 : nextPage //no negative navigation

  return (
    <Link
      href={
        // <pathname>?sort=desc
        pathname + "?" + createQueryString("page", `${nextPage}`)
      } className="hover:bg-sky-500"
    >
      {type === "next"
        ? "NEXT"
        : "PREV"}
    </Link>
  );
};

export default NavButton;


////if first page then no prev if last no next
