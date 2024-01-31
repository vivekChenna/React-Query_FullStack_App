import { toast } from "react-hot-toast";
import { User_API } from "@/constants/constant";

export const getUserDetails = async () => {
  try {
    let response = await fetch(User_API);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (data) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(User_API, options);
    console.log("response inside add user");

    const jsonData = await response.json();

    toast.success("user created");
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

export async function updateUser(data) {
  try {
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

    const jsonData = await response.json();
    console.log("inside update api");
    console.log(jsonData);

    toast.success("user updated successfully");
  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = async (id) => {
  try {
    const options = {
      method: "DELETE",
    };

    const response = await fetch(`${User_API}/${id}`, options);
    console.log(response);

    const jsonData = await response.json();
    toast.error("user removed");
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};
