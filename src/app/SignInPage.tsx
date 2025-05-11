import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useMJStore from "@/stores/mj-store";
import { clientApi } from "@/client/client-api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password !== data.email, {
    message: "Password cannot be the same as email",
    path: ["password"],
  });

export default function SignInPage() {
  const user = useMJStore((state) => state.user);
  const setUser = useMJStore((state) => state.setUser);
  const setSignedIn = useMJStore((state) => state.setSignedIn);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      password: user.password,
    },
    mode: "onBlur",
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await clientApi.signIn(formData.email, formData.password);
      setUser(formData);
      setSignedIn(true);
    } catch (e) {
      console.error(e);
      toast.error("Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-100 w-1/3 space-y-4 p-6 border rounded-md shadow-md"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Sign In ..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
