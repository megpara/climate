import useSWR from "swr";

function fetcher(route) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((user) => user || null);
}

export default function useAuth() {
  const { data: user, error, mutate } = useSWR("/api/user", fetcher);
  const { data: registration } = useSWR(
    `/api/get-registration?email=${user && user.email}`,
    fetcher
  );
  const loading = user === undefined;
  return {
    user,
    registration,
    loading,
    error,
    mutate,
  };
}