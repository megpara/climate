import useSWR from "swr";
import { endpoints } from "../lib/constants";

function fetcher(route) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((user) => user || null);
}

export default function useAuth() {
  const { data: user, error, mutate } = useSWR(endpoints.user, fetcher);
  // const { data: registration, mutate: registerMutate } = useSWR(
  //   `/api/get-registration?email=${user && user.email}`,
  //   fetcher
  // );
  const { data: registration, mutate: registerMutate } = useSWR(
    endpoints.registration,
    fetcher
  );

  const loading = user === undefined;
  return {
    user,
    registration,
    loading,
    error,
    mutate,
    registerMutate,
  };
}
