"use client";
import { useCallback, useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { api } from "@/app/_api/api";
import { DIST, ST, TYPES } from "@/app/_features/constants";
import Hero from "@/app/_features/Hero";
import PetCard from "@/app/_features/PetCard";
import PetModal from "@/app/_features/PetModal";

const serif = Playfair_Display({ subsets: ["latin", "cyrillic"], weight: ["600", "700"] });

const EMPTY = { q: "", type: "", age: "", dist: "", status: "" };

const CATEGORIES = [
  { label: "Нохой", emoji: "🐕", bg: "bg-[#f3e4c8]", set: { type: "Нохой", age: "" } },
  { label: "Муур", emoji: "🐈", bg: "bg-[#e3e6d7]", set: { type: "Муур", age: "" } },
  { label: "Гөлөг", emoji: "🐶", bg: "bg-[#f1dcc3]", set: { type: "Нохой", age: "k" } },
  { label: "Зулзага", emoji: "🐱", bg: "bg-[#e6dfec]", set: { type: "Муур", age: "k" } },
  { label: "Бусад амьтан", emoji: "🐇", bg: "bg-[#f6ead0]", set: { type: "Бусад", age: "" } },
  { label: "Настай", emoji: "🦮", bg: "bg-[#dfe4ea]", set: { type: "", age: "o" } },
];

const selCls =
  "my-0 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-[#3b3b32]";
const lblCls = "mb-1 block text-[11px] font-medium text-stone-500";

export default function Home() {
  const [f, setF] = useState(EMPTY);
  const [pets, setPets] = useState([]);
  const [sel, setSel] = useState(null);
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const load = useCallback(async () => {
    try {
      setPets(await api("/api/pets?" + new URLSearchParams(f)));
      setErr("");
    } catch (e) {
      setErr(e.message);
    }
  }, [f]);
  useEffect(() => { load(); }, [load]);

  const filtered = Object.values(f).some(Boolean);
  const scrollToList = () => document.getElementById("pets")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Hero />

      {/* ХАЙЛТЫН САМБАР */}
      <div className="relative z-10 mx-auto mt-10 max-w-6xl px-4">
        <div className="grid items-end gap-4 rounded-3xl border border-[#eadfd3] bg-[#fbf8f2] p-6 shadow-lg shadow-black/5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:p-8">
          <div>
            <label className={lblCls}>Амьтны төрөл</label>
            <select className={selCls} value={f.type} onChange={set("type")}>
              <option value="">Бүгд</option>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={lblCls}>Нас</label>
            <select className={selCls} value={f.age} onChange={set("age")}>
              <option value="">Бүх нас</option>
              <option value="k">1-ээс бага</option>
              <option value="m">1–5 нас</option>
              <option value="o">5+ нас</option>
            </select>
          </div>
          <div>
            <label className={lblCls}>Дүүрэг</label>
            <select className={selCls} value={f.dist} onChange={set("dist")}>
              <option value="">Бүх дүүрэг</option>
              {DIST.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className={lblCls}>Төлөв</label>
            <select className={selCls} value={f.status} onChange={set("status")}>
              <option value="">Бүгд</option>
              {Object.entries(ST).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <button
            onClick={scrollToList}
            className="flex items-center justify-center gap-2 rounded-full bg-[#7a8461] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#667050] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7a8461]/50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
            </svg>
            Тохирохыг олох
          </button>
        </div>

        <div className="relative mt-3">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
          <input
            className="my-0 w-full rounded-full border border-[#eadfd3] bg-white py-2.5 pl-10 pr-4 text-sm"
            placeholder="Нэр, тайлбараар хайх…"
            value={f.q}
            onChange={set("q")}
          />
        </div>
      </div>

      {/* АНГИЛАЛ */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <h2 className={`${serif.className} text-center text-2xl text-[#3a2a22]`}>Үрчлэлтийн ангилал</h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded bg-[#7a8461]" />

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => {
            const active = f.type === c.set.type && f.age === c.set.age;
            return (
              <button
                key={c.label}
                onClick={() => { setF({ ...EMPTY, ...c.set }); scrollToList(); }}
                className={`${c.bg} flex flex-col items-center gap-3 rounded-3xl px-3 py-6 transition hover:-translate-y-1 hover:shadow-md ${
                  active ? "ring-2 ring-[#7a8461]" : ""
                }`}
              >
                <span className="text-5xl leading-none">{c.emoji}</span>
                <span className="text-sm font-bold text-[#2f2f26]">{c.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* АМЬТДЫН ЖАГСААЛТ */}
      <section id="pets" className="mx-auto mt-14 max-w-6xl scroll-mt-4 px-4 pb-16">
        <div className="flex items-center justify-between gap-3">
          <h2 className={`${serif.className} text-2xl text-[#3a2a22]`}>
            Манай найзууд <span className="text-[#7a8461]">♡</span>
          </h2>
          <div className="flex items-center gap-4 text-sm">
            {!err && <span className="text-stone-500">{pets.length} зар</span>}
            {filtered && (
              <button className="text-[#7a8461] underline" onClick={() => setF(EMPTY)}>
                Цэвэрлэх
              </button>
            )}
          </div>
        </div>

        {err && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {err} (backend ажиллаж байгаа эсэхийг шалгана уу)
          </p>
        )}

        <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-5">
          {pets.map((p) => <PetCard key={p._id} pet={p} onClick={() => setSel(p)} />)}
        </div>

        {!pets.length && !err && (
          <div className="mt-6 flex flex-col items-center rounded-3xl border-2 border-dashed border-[#eadfd3] bg-white/60 px-6 py-14 text-center">
            <div className="text-6xl">🐾</div>
            <h3 className="mt-3 text-lg font-bold">{filtered ? "Тохирох зар олдсонгүй" : "Одоогоор зар алга"}</h3>
            <p className="mt-1 max-w-sm text-sm text-stone-500">
              {filtered ? "Шүүлтүүрээ өөрчилж үзнэ үү." : "Гэр оронгүй амьтны зар нэмж, анхны зарыг нийтлээрэй."}
            </p>
            {filtered && (
              <button className="btn mt-4" onClick={() => setF(EMPTY)}>Шүүлтүүр цэвэрлэх</button>
            )}
          </div>
        )}
      </section>

      {sel && <PetModal pet={sel} onClose={() => setSel(null)} onSent={() => { setSel(null); load(); }} />}
    </>
  );
}