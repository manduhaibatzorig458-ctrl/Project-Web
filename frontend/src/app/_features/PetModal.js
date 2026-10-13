"use client";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/app/_api/api";
import { useAuth } from "@/app/(provider)/AuthProvider";
import { ST } from "@/app/_features/constants";

export default function PetModal({ pet, onClose, onSent }) {
  const { user } = useAuth();
  const [f, setF] = useState({ name: user?.name || "", phone: "", msg: "" });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const send = async () => {
    try {
      await api(`/api/pets/${pet._id}/requests`, "POST", f);
      alert("Хүсэлт илгээгдлээ. Эзэмшигч тантай холбогдоно.");
      onSent();
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-start justify-center overflow-auto bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex h-48 items-center justify-center bg-[#fbe6da] bg-cover bg-center text-7xl"
          style={pet.img ? { backgroundImage: `url(${pet.img})` } : undefined}>{!pet.img && "🐾"}</div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{pet.name}</h2>
          <p className="text-sm text-stone-500">{pet.type} · {pet.age ?? "?"} нас · {pet.sex} · {pet.dist}</p>
          <p className="my-2">{pet.desc}</p>
          <p className="mb-3">● {ST[pet.status]}</p>
          {pet.status !== "adopted" && (user ? (
            <>
              <h3 className="font-semibold">Авах хүсэлт</h3>
              <input placeholder="Нэр" value={f.name} onChange={set("name")} />
              <input placeholder="Утас" value={f.phone} onChange={set("phone")} />
              <textarea rows={3} placeholder="Гэрийн нөхцөл" value={f.msg} onChange={set("msg")} />
              {err && <p className="text-sm text-red-700">{err}</p>}
              <button className="btn" onClick={send}>Илгээх</button>{" "}
            </>
          ) : (
            <Link href="/auth" className="btn inline-block">Хүсэлт илгээхийн тулд нэвтэрнэ үү</Link>
          ))}
          <button className="btn-g ml-1" onClick={onClose}>Хаах</button>
        </div>
      </div>
    </div>
  );
}
