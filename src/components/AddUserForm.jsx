import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const formSchema = z.object({
  firstName: z.string().min(3, {
    message: "firstname must be at least 3 characters.",
  }),
  lastName: z.string().min(3, {
    message: "Lastname must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
});

const AddUserForm = ({AddUserFunction}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

 

  const onSubmit = (data)=>{
    console.log(data);
    AddUserFunction(data);
    form.reset();
  }



  return (
   
      <div className="w-[600px] mx-auto mb-5 border-none">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* First Name Input Field */}

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px]">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="vivek" {...field} />
                  </FormControl>
                  <FormDescription>This is your first name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name Input Field */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px]">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="chenna" {...field} />
                  </FormControl>
                  <FormDescription>This is your last name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Input Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px]">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="vivek@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
  );
};

export default AddUserForm;
