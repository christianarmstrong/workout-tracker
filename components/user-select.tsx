"use client";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function UserSelect() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setInvalid(false);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:  email, password: password }),
      });
      const body = await res.json();
      if (body.ok) {
        setUser(body.user);
        router.push("/workouts");
      } else {
        setMessage(body.error ?? "Login failed");
        if (body.error === "Invalid credentials") setInvalid(true);
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-3">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm text-black"> Email </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className={`border rounded-md p-2 ${invalid ? "border border-red-300" : "border border-gray-300"}`}
          />
          <p className="text-sm text-black"> Password </p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={`border rounded-md p-2 ${invalid ? "border border-red-300" : "border border-gray-300"}`}
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in..." : "Log in"}
            </Button>
          </div>
        </div>
    </div>
  );
}