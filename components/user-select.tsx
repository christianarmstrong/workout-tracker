"use client";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function UserSelect({ users }: { users: { id: string; name?: string }[] }) {
 const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!selected) return setMessage("Select a user");
    setLoading(true);
    setMessage(null);
    setInvalid(false);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: selected, password }),
      });
      const body = await res.json();
      if (res.ok && body.ok) {
        router.push("/workouts");
      } else {
        setMessage(body.error ?? "Login failed");
        if (res.status === 401 || body.error === "Invalid credentials") setInvalid(true);
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <Select onValueChange={(val: string) => { setSelected(val); setShowPassword(true); }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          {users.map((u) => (
            <SelectItem key={u.id} value={u.name ?? String(u.id)}>
              {u.name ?? u.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showPassword && (
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm text-black"> Password </p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={`border rounded-md p-2 ${invalid ? "border border-red-300" : "border border-gray-300"}`}
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={handleLogin} disabled={loading || !selected}>
              {loading ? "Signing in..." : "Log in"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}