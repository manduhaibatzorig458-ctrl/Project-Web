"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Playfair_Display } from "next/font/google";
import { api } from "@/app/_api/api";
import { useAuth } from "@/app/(provider)/AuthProvider";
import { DIST, TYPES } from "@/app/_features/constants";

const serif = Playfair_Display({ subsets: ["latin", "cyrillic"], weight: ["600", "700"] });

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

const lbl = "mb-1.5 block text-[12px] font-semibold text-stone-600";

export default function PetForm({ onClose, onSaved }) {
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [f, setF] = useState({ name: "", type: "Нохой", age: "", sex: "Эр", dist: DIST[0], phone: "", desc: "" });
  const [img, setImg] = useState(null);
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async () => {
    try {
      await api("/api/pets", "POST", { ...f, age: Number(f.age) || 0, img });
      if (isAdmin) {
        alert("Зар нэмэгдлээ.");
        onClose();
        onSaved?.();
      } else {
        alert("Зар илгээгдлээ. Админ баталгаажуулсны дараа нийтлэгдэнэ.");
        onClose();
        router.push("/my");
      }
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="my-6 w-full max-w-lg rounded-3xl bg-white p-6 font-normal shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className={`${serif.className} text-2xl text-[#3a2a22]`}>Шинэ зар</h2>
            <p className="mt-1 text-sm text-stone-500">Амьтныхаа мэдээллийг оруулна уу</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Хаах"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-stone-400 transition hover:bg-stone-100"
          >
            ×
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={lbl}>Нэр</label>
            <input className="my-0 w-full" placeholder="Амьтны нэр" value={f.name} onChange={set("name")} />
          </div>
          <div>
            <label className={lbl}>Төрөл</label>
            <select className="my-0 w-full" value={f.type} onChange={set("type")}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Нас</label>
            <input className="my-0 w-full" type="number" step="0.5" min="0" placeholder="Жишээ: 2" value={f.age} onChange={set("age")} />
          </div>
          <div>
            <label className={lbl}>Хүйс</label>
            <select className="my-0 w-full" value={f.sex} onChange={set("sex")}>
              <option>Эр</option>
              <option>Эм</option>
            </select>
          </div>
          <div>
            <label className={lbl}>Дүүрэг</label>
            <select className="my-0 w-full" value={f.dist} onChange={set("dist")}>
              {DIST.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={lbl}>Утас</label>
            <input className="my-0 w-full" placeholder="Холбоо барих утас" value={f.phone} onChange={set("phone")} />
          </div>
          <div className="sm:col-span-2">
            <label className={lbl}>Тайлбар</label>
            <textarea className="my-0 w-full" rows={3} placeholder="Зан араншил, эрүүл мэнд, онцлог…" value={f.desc} onChange={set("desc")} />
          </div>

          <div className="sm:col-span-2">
            <label className={lbl}>Зураг</label>
            <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-[#d9d4c4] bg-[#fbf8f2] p-4 transition hover:border-[#7a8461]">
              {img ? (
                <img src={img} alt="Урьдчилсан харагдац" className="h-20 w-20 rounded-xl object-cover" />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#e3e6d7] text-3xl">🐾</span>
              )}
              <span className="text-sm text-stone-500">
                <b className="text-[#5d6648]">{img ? "Зураг солих" : "Зураг сонгох"}</b>
                <br />
                JPG, PNG
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => e.target.files[0] && setImg(await resize(e.target.files[0]))}
              />
            </label>
          </div>
        </div>

        {!isAdmin && (
          <p className="mt-4 rounded-xl bg-[#f4efe6] px-3 py-2 text-xs text-stone-600">
            Админ баталгаажуулсны дараа нийтлэгдэнэ.
          </p>
        )}
        {err && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="btn" onClick={submit}>Илгээх</button>
          <button className="btn-g" onClick={onClose}>Болих</button>
        </div>
      </div>
    </div>
  );
}
