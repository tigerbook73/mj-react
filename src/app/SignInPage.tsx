import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useMJStore from "@/stores/mj-store";
import { clientApi } from "@/client/client-api";

export default function SignInPage() {
  const user = useMJStore((state) => state.user);
  const setUser = useMJStore((state) => state.setUser);
  const setSignedIn = useMJStore((state) => state.setSignedIn);

  const [formData, setFormData] = useState({ email: user.email, password: user.password });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await clientApi.signIn(formData.email, formData.password);
      setUser(formData);
      setSignedIn(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setFormData({ email: user.email, password: user.password });
    }
  }, [user.email, user.password]);

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="min-w-100 space-y-4 p-6 border rounded-md shadow-md">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
}
