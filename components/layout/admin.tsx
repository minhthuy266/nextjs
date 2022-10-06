import Link from "next/link";
import * as React from "react";
import Auth from "../common/auth";
import { LayoutProps } from "../models";

export function AdminLayout({ children }: LayoutProps) {
  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>

      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/about">
        <a>About</a>
      </Link>

      <div>{children}</div>
    </Auth>
  );
}
