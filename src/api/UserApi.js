import { toast } from "react-hot-toast";
export const getUserDetails = async () => {
  let response = await fetch(
    "https://65b790e246324d531d54efe3.mockapi.io/users"
  );
  let data = await response.json();
  return data;
};

export const addUser = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  await fetch("https://65b790e246324d531d54efe3.mockapi.io/users", options);

  toast.success("user created");
};

export async function updateUser(data) {
  console.log(data);
  const newUpdatedDetails = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUpdatedDetails),
  };

  const response = await fetch(
    `https://65b790e246324d531d54efe3.mockapi.io/users/${data.id}`,
    options
  );
  console.log(response);

  toast.success("user updated successfully");
}

export const deleteUser = async (id) => {
  const options = {
    method: "DELETE",
  };

  const response = await fetch(
    `https://65b790e246324d531d54efe3.mockapi.io/users/${id}`,
    options
  );
  console.log(response);

  toast.error("user removed");
};
