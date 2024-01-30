import { toast } from "react-hot-toast";
import { User_API } from "@/constants/constant";



export const getUserDetails = async () => {
  let response = await fetch(User_API);
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
  await fetch(User_API, options);

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

  const response = await fetch(`${User_API}/${data.id}`, options);
  console.log(response);

  toast.success("user updated successfully");
}

export const deleteUser = async (id) => {
  const options = {
    method: "DELETE",
  };

  const response = await fetch(`${User_API}/${id}`, options);
  console.log(response);

  toast.error("user removed");
};
