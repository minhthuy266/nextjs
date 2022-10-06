import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import * as React from "react";

export interface AuthProps {
  children: any;
}

export default function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  React.useEffect(() => {
    if (!firstLoading && !profile) {
      router.push("/login");
    }
  }, [firstLoading, profile, router]);

  if (profile) return <p>Loading</p>;

  return <div>{children}</div>;
}
