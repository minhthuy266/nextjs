import * as React from "react";
import useSWR from "swr";

export interface StudentDetailProps {
  studentId: string;
}

export default function StudentDetail({ studentId }: StudentDetailProps) {
  const { data, error, mutate, isValidating } = useSWR(
    `/students/${studentId}`,
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );

  const handleMutateClick = () => {
    mutate({ name: "THUY" }, true);
  };

  return (
    <div>
      Name: {data?.name || "---"}
      <button onClick={handleMutateClick}>Mutate</button>
    </div>
  );
}
