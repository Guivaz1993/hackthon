const BASE_URL = "https://hackthon-squad15.herokuapp.com";
// const BASE_URL = "http://localhost:8000";

async function Post(resource, data, token) {
  const response = await fetch(BASE_URL + resource, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function Get(resource, token) {
  const response = await fetch(
    BASE_URL + resource,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    },
  );

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function Put(resource, token, data) {
  const response = await fetch(BASE_URL + resource, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

export {
  Get,
  Post,
  Put,
};
