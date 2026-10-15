"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Playfair_Display } from "next/font/google";
import { api } from "@/app/_api/api";
import { useAuth } from "@/app/(provider)/AuthProvider";

const serif = Playfair_Display({ subsets: ["latin", "cyrillic"], weight: ["600", "700"] });

const lbl = "mb-1.5 block text-[12px] font-semibold text-stone-600";

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
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-[#eadfd3] bg-white p-8 shadow-xl shadow-black/5 sm:p-10">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#e3e6d7] text-2xl">🐾</div>
          <h1 className={`${serif.className} text-2xl text-[#3a2a22]`}>Тавтай морил</h1>
          <p className="mt-1 text-sm text-stone-500">Нэвтэрч эсвэл шинээр бүртгүүлнэ үү</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className={lbl}>Нэр <span className="font-normal text-stone-400">(бүртгүүлэхэд)</span></label>
            <input className="my-0 w-full" placeholder="Таны нэр" value={f.name} onChange={set("name")} />
          </div>
          <div>
            <label className={lbl}>Имэйл</label>
            <input className="my-0 w-full" type="email" placeholder="name@example.com" value={f.email} onChange={set("email")} />
          </div>
          <div>
            <label className={lbl}>Нууц үг <span className="font-normal text-stone-400">(6+ тэмдэгт)</span></label>
            <input className="my-0 w-full" type="password" placeholder="••••••" value={f.password} onChange={set("password")} />
          </div>
        </div>

        {err && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="btn" onClick={() => go("login")}>Нэвтрэх</button>
          <button className="btn-g" onClick={() => go("register")}>Бүртгүүлэх</button>
        </div>
      </div>
    </div>
  );
}