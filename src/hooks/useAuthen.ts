import { getUserProfile } from "@/api/auth";
import { QueryKey } from "@/constant/query-key";
import { authState } from "@/store/state/auth.atom";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

function useAuthen() {
  const [auth, setAuth] = useRecoilState(authState);
  const { data: userData, isError } = useQuery({
    queryKey: [QueryKey.GET_USER_PROFILE],
    queryFn: getUserProfile,
    retry: 0,
  });

  useEffect(() => {
    if (isError) {
      console.log("err");
      setAuth({
        isAuthenticated: false,
        user: null,
      });
    } else {
      if (userData) {
        setAuth({
          isAuthenticated: true,
          user: userData,
        });
      }
    }
  }, [userData, isError]);
}

export default useAuthen;
