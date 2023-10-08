"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback } from "react";

const NavButton = ({ type }: { type: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageParam = searchParams.get("page");
  const currentPage = parseInt(pageParam ?? "1", 10);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  let nextPage;

  type === "next" ? (nextPage = currentPage + 1) : (nextPage = currentPage - 1); // forward or backward nav

  if (nextPage < 1) {
    nextPage = 1;
  }

  return (
    <Link
      href={
        // <pathname>?sort=desc
        pathname + "?" + createQueryString("page", `${nextPage}`)
      }
      className="hover:bg-sky-500"
    >
      {type === "next" ? "NEXT" : "PREV"}
    </Link>
  );
};

export default NavButton;
