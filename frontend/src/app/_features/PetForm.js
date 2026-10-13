"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/app/_api/api";
import { DIST, TYPES } from "@/app/_features/constants";

function resize(file) {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, 400 / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = img.width * k; c.height = img.height * k;
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.7));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}

export default function PetForm({ onClose }) {
  const router = useRouter();
  const [f, setF] = useState({ name: "", type: "Нохой", age: "", sex: "Эр", dist: DIST[0], phone: "", desc: "" });
  const [img, setImg] = useState(null);
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async () => {
    try {
      await api("/api/pets", "POST", { ...f, age: Number(f.age) || 0, img });
      alert("Зар илгээгдлээ. Админ баталгаажуулсны дараа нийтлэгдэнэ.");
      onClose();
      router.push("/my");
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-start justify-center overflow-auto bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-4 font-normal" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold">Шинэ зар</h2>
        <input placeholder="Нэр" value={f.name} onChange={set("name")} />
        <select value={f.type} onChange={set("type")}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
        <input type="number" step="0.5" min="0" placeholder="Нас" value={f.age} onChange={set("age")} />
        <select value={f.sex} onChange={set("sex")}><option>Эр</option><option>Эм</option></select>
        <select value={f.dist} onChange={set("dist")}>{DIST.map((d) => <option key={d}>{d}</option>)}</select>
        <input placeholder="Утас" value={f.phone} onChange={set("phone")} />
        <textarea rows={3} placeholder="Тайлбар" value={f.desc} onChange={set("desc")} />
        <input type="file" accept="image/*" onChange={async (e) => e.target.files[0] && setImg(await resize(e.target.files[0]))} />
        <p className="text-xs text-stone-500">Админ баталгаажуулсны дараа нийтлэгдэнэ.</p>
        {err && <p className="text-sm text-red-700">{err}</p>}
        <div className="mt-2 flex gap-2"><button className="btn" onClick={submit}>Илгээх</button><button className="btn-g" onClick={onClose}>Болих</button></div>
      </div>
    </div>
  );
}
