import StudentDetail from "@/components/swr/StudentDetail";
import { useState } from "react";

export default function SWRPage() {
  const [detailList, setDetailList] = useState([1, 1, 1]);

  const handleAddClick = () => {
    setDetailList((prevList) => [...prevList, 1]);
  };

  return (
    <div>
      <h1>SWR Playground</h1>

      <button onClick={handleAddClick}>Add Detail</button>

      <ul>
        {detailList.map((detail, index) => (
          <li key={index}>
            <StudentDetail studentId="lea2aa9l7x3a5v1" />
          </li>
        ))}

        <li>
          <StudentDetail studentId="lea2aa9l7x3a5v1" />
        </li>

        <li>
          <StudentDetail studentId="lea2aa9l7x3a5v2" />
        </li>

        <li>
          <StudentDetail studentId="lea2aa9l7x3a5v3" />
        </li>

        <li>
          <StudentDetail studentId="lea2aa9l7x3a5v3" />
        </li>
      </ul>
    </div>
  );
}
