import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  addUser,
  deleteUser,
  getUserDetails,
  updateUser,
} from "../api/UserApi";
import AddUserForm from "./AddUserForm";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import Loader from "./Loader";
import UserDataLoader from "./UserDataLoader";

const UserDetails = () => {
  const [newUserDetails, setNewUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setNewUserDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError: isQueryError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUserDetails,
  });

  const {
    status: addUserStatus,
    mutate: addUserMutation,
    isPending: isAddingUser,
    isError: isErrorAddUser,
  } = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], (oldQueryData) => {
        return [...oldQueryData, data];
      });
    },
    onError: (error) => {
      console.log("something went wrong" + error.message);
    },
  });

  const { mutate: removeUserMutation, isPending: isRemovingUser } = useMutation(
    {
      mutationFn: deleteUser,
      onSuccess: (data) => {
        queryClient.setQueryData(["users"], (oldQueryData) => {
          return oldQueryData.filter((obj) => {
            return obj.id !== data.id;
          });
        });
      },
    }
  );

  const { mutate: updateUserMutation, isPending: isUpdatingUser } = useMutation(
    {
      mutationFn: updateUser,
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  if (isLoading) {
    return (
      <div className=" w-[100vw] h-[80vh] flex items-center justify-center flex-col">
        <Loader />
        <p className=" text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (isQueryError) {
    if (error.message === '["users"] data is undefined') {
      return (
        <div className=" w-full h-full flex flex-col gap-1 items-center justify-center">
          <p className=" font-semibold text-red-500 text-3xl">Network Error</p>
          <p className=" font-semibold text-xl text-red-500">you are offline</p>
        </div>
      );
    } else {
      return <h2 className=" font-semibold text-3xl">{error.message}</h2>;
    }
  }

  const AddUserFunction = (data) => {
    addUserMutation(data);
  };

  const handleUpdateClick = (user) => {
    setNewUserDetails({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  };

  const handleSaveChanges = (id) => {
    if (
      !newUserDetails.email ||
      !newUserDetails.firstName ||
      !newUserDetails.lastName
    ) {
      toast.error("Invalid data");
      return;
    } else if (!newUserDetails.email.includes(".com")) {
      toast.error("Invalid email");
      return;
    } else {
      updateUserMutation({ ...newUserDetails, id: id });
    }
  };



  return (
    <div className=" w-[1100px] mx-auto mt-4 mb-4">
      <AddUserForm AddUserFunction={AddUserFunction} />

      {isErrorAddUser ? (
        <div className="text-center">
          <p className=" font-semibold text-4xl text-red-500">
            Something went wrong
          </p>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center">
          <h1 className=" font-semibold text-5xl">No User Found</h1>
          <p className=" text-sm mt-1 text-gray-500">
            create a user by submitting the form
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>FirstName</TableHead>
              <TableHead>LastName</TableHead>
              <TableHead className="">Email</TableHead>
              <TableHead className="text-right">Operations</TableHead>
            </TableRow>
          </TableHeader>
          {isRemovingUser || isUpdatingUser || isAddingUser ? (
            <UserDataLoader />
          ) : (
            <TableBody>
              {data?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user?.id}</TableCell>
                  <TableCell>{user?.firstName}</TableCell>
                  <TableCell>{user?.lastName}</TableCell>
                  <TableCell className="">{user?.email}</TableCell>
                  <TableCell className=" flex items-center gap-3 flex-row-reverse">
                    <Button
                      className="p-2"
                      variant="destructive"
                      onClick={() => {
                        removeUserMutation(user.id);
                      }}
                    >
                      delete
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => handleUpdateClick(user)}
                        >
                          Update
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Update User Details</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="firstName" className="text-right">
                              firstName
                            </Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={newUserDetails.firstName}
                              onChange={HandleChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lastName" className="text-right">
                              lastName
                            </Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={newUserDetails.lastName}
                              onChange={HandleChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              email
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              onChange={HandleChange}
                              value={newUserDetails.email}
                              className="col-span-3"
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={() => handleSaveChanges(user.id)}
                          >
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </div>
  );
};

export default UserDetails;
