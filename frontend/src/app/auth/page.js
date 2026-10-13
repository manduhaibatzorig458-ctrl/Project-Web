"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/app/_api/api";
import { useAuth } from "@/app/(provider)/AuthProvider";

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const go = async (mode) => {
    try {
      const d = await api("/api/auth/" + mode, "POST", f);
      login(d);
      router.push(d.user.role === "admin" ? "/admin" : "/");
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="mx-auto my-8 max-w-md rounded-xl border border-[#eadfd3] bg-white p-4">
      <h2 className="text-xl font-bold">Нэвтрэх / Бүртгүүлэх</h2>
      <input placeholder="Нэр (бүртгүүлэхэд)" value={f.name} onChange={set("name")} />
      <input type="email" placeholder="Имэйл" value={f.email} onChange={set("email")} />
      <input type="password" placeholder="Нууц үг (6+)" value={f.password} onChange={set("password")} />
      {err && <p className="text-sm text-red-700">{err}</p>}
      <div className="mt-2 flex gap-2">
        <button className="btn" onClick={() => go("login")}>Нэвтрэх</button>
        <button className="btn-g" onClick={() => go("register")}>Бүртгүүлэх</button>
      </div>
    </div>
  );
}
