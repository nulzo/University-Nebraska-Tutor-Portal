import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useFetchCourse() {
  async function getCourse() {
    const { data } = await axios.get("/api/courses/");
    return data;
  }
  const data = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourse(),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });
  if (data) {
    return data;
  }
}
