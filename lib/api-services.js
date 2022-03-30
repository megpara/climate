export const postData = (data, route) => {
  return fetch(`/api/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .catch(console.log);
};
