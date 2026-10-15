"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { api } from "@/app/_api/api";
import { useAuth } from "@/app/(provider)/AuthProvider";
import { RST, ST } from "@/app/_features/constants";
import PetForm from "@/app/_features/PetForm";

const serif = Playfair_Display({ subsets: ["latin", "cyrillic"], weight: ["600", "700"] });

export default function AdminPage() {
  const { user, ready } = useAuth();
  const [tab, setTab] = useState("pets");
  const [stats, setStats] = useState(null);
  const [pets, setPets] = useState([]);
  const [reqs, setReqs] = useState([]);
  const [adding, setAdding] = useState(false);
  const isAdmin = user?.role === "admin";

  const load = useCallback(async () => {
    try {
      setStats(await api("/api/admin/stats"));
      setPets(await api("/api/admin/pets"));
      setReqs(await api("/api/admin/requests"));
    } catch {}
  }, []);
  useEffect(() => { if (isAdmin) load(); }, [isAdmin, load]);

  const act = async (fn) => { try { await fn(); await load(); } catch (e) { alert(e.message); } };

  if (!ready) return null;
  if (!isAdmin)
    return (
      <div className="mx-auto my-16 max-w-md rounded-3xl border border-[#eadfd3] bg-white p-8 text-center shadow-lg shadow-black/5">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#e3e6d7] text-2xl">🔒</div>
        <p className="mb-4 text-sm text-stone-600">Зөвхөн админ эрхтэй хэрэглэгч орно.</p>
        <Link href="/auth" className="btn">Нэвтрэх</Link>
      </div>
    );

  const cards = stats && [
    [stats.pets, "Нийт зар", "🐾", "bg-[#f3e4c8]"],
    [stats.waiting, "Баталгаа хүлээж буй", "⏳", "bg-[#f6ead0]"],
    [stats.requests, "Шинэ хүсэлт", "💌", "bg-[#e6dfec]"],
    [stats.adopted, "Гэртэй болсон", "🏡", "bg-[#e3e6d7]"],
    [stats.users, "Хэрэглэгч", "👥", "bg-[#dfe4ea]"],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className={`${serif.className} text-3xl text-[#3a2a22]`}>Админ самбар</h1>
        <button className="btn" onClick={() => setAdding(true)}>+ Зар нэмэх</button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {cards?.map(([n, l, icon, bg]) => (
          <div key={l} className="flex items-center gap-3 rounded-2xl border border-[#eadfd3] bg-white p-4 shadow-sm">
            <span className={`${bg} flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl`}>{icon}</span>
            <div>
              <b className="block text-2xl leading-none text-[#2f2f26]">{n}</b>
              <span className="mt-1 block text-xs text-stone-500">{l}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 mt-8 flex gap-2">
        <button className={tab === "pets" ? "btn" : "btn-g"} onClick={() => setTab("pets")}>Зарууд</button>
        <button className={tab === "req" ? "btn" : "btn-g"} onClick={() => setTab("req")}>Хүсэлтүүд</button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#eadfd3] bg-white shadow-sm">
        {tab === "pets" ? (
          <table className="tbl"><thead><tr><th>Нэр</th><th>Эзэн</th><th>Баталгаа</th><th>Төлөв</th><th></th></tr></thead>
            <tbody>{pets.map((p) => (
              <tr key={p._id}>
                <td className="font-semibold">{p.name}</td>
                <td>{p.owner?.name}<br /><small>{p.phone}</small></td>
                <td>{p.approved ? <span className="font-semibold text-[#5d6648]">✔ Батлагдсан</span> : <button className="btn" onClick={() => act(() => api("/api/admin/pets/" + p._id, "PATCH", { approved: true }))}>Батлах</button>}</td>
                <td><select className="my-0" value={p.status} onChange={(e) => act(() => api("/api/admin/pets/" + p._id, "PATCH", { status: e.target.value }))}>
                  {Object.entries(ST).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></td>
                <td><button className="btn-r" onClick={() => confirm("Устгах уу?") && act(() => api("/api/admin/pets/" + p._id, "DELETE"))}>Устгах</button></td>
              </tr>))}</tbody></table>
        ) : (
          <table className="tbl"><thead><tr><th>Амьтан</th><th>Хүсэгч</th><th>Мессеж</th><th>Төлөв</th><th></th></tr></thead>
            <tbody>{reqs.map((r) => (
              <tr key={r._id}>
                <td className="font-semibold">{r.pet?.name}</td>
                <td>{r.name}<br /><small>{r.phone}</small></td>
                <td>{r.msg}</td>
                <td>{RST[r.status]}</td>
                <td>{r.status === "new" && <div className="flex gap-2">
                  <button className="btn" onClick={() => act(() => api("/api/admin/requests/" + r._id, "PATCH", { status: "accepted" }))}>Зөвшөөрөх</button>
                  <button className="btn-r" onClick={() => act(() => api("/api/admin/requests/" + r._id, "PATCH", { status: "rejected" }))}>Татгалзах</button></div>}</td>
              </tr>))}</tbody></table>
        )}
        {((tab === "pets" && !pets.length) || (tab === "req" && !reqs.length)) && (
          <p className="p-8 text-center text-sm text-stone-500">Одоогоор мэдээлэл алга.</p>
        )}
      </div>

      {adding && <PetForm onClose={() => setAdding(false)} onSaved={load} />}
    </div>
  );
}
