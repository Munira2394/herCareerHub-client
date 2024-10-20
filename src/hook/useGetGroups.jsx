import { useEffect, useState } from "react";
import useAxiosSecureHook from "./useAxiosSecureHook";

const useGetGroups = (refetch, mentorEmail) => {
  let endpoint = "";
  if (mentorEmail) {
    endpoint = `/${mentorEmail}`;
  }
  const axiosInstance = useAxiosSecureHook();
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    axiosInstance(`/groups${endpoint}`).then((res) => {
      setGroups(res.data);
    });
  }, [axiosInstance, refetch, endpoint]);
  return groups;
};

export default useGetGroups;
