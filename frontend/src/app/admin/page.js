"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/app/_api/api";
import { useAuth } from "@/app/(provider)/AuthProvider";
import { RST, ST } from "@/app/_features/constants";

export default function AdminPage() {
  const { user, ready } = useAuth();
  const [tab, setTab] = useState("pets");
  const [stats, setStats] = useState(null);
  const [pets, setPets] = useState([]);
  const [reqs, setReqs] = useState([]);
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
  if (!isAdmin) return <div><p className="mb-2">Зөвхөн админ эрхтэй хэрэглэгч орно.</p><Link href="/auth" className="btn">Нэвтрэх</Link></div>;

  const cards = stats && [
    [stats.pets, "Нийт зар"], [stats.waiting, "Баталгаа хүлээж буй"], [stats.requests, "Шинэ хүсэлт"],
    [stats.adopted, "Гэртэй болсон"], [stats.users, "Хэрэглэгч"],
  ];

  return (
    <div>
      <h1 className="mb-3 text-2xl font-bold">Админ самбар</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3">
        {cards?.map(([n, l]) => <div key={l} className="rounded-lg border border-[#eadfd3] bg-white p-3 text-center"><b className="block text-2xl">{n}</b><span className="text-sm">{l}</span></div>)}
      </div>
      <div className="my-3 flex gap-2">
        <button className={tab === "pets" ? "btn" : "btn-g"} onClick={() => setTab("pets")}>Зарууд</button>
        <button className={tab === "req" ? "btn" : "btn-g"} onClick={() => setTab("req")}>Хүсэлтүүд</button>
      </div>
      <div className="overflow-x-auto">
        {tab === "pets" ? (
          <table className="tbl"><thead><tr><th>Нэр</th><th>Эзэн</th><th>Баталгаа</th><th>Төлөв</th><th></th></tr></thead>
            <tbody>{pets.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.owner?.name}<br /><small>{p.phone}</small></td>
                <td>{p.approved ? "✔" : <button className="btn" onClick={() => act(() => api("/api/admin/pets/" + p._id, "PATCH", { approved: true }))}>Батлах</button>}</td>
                <td><select value={p.status} onChange={(e) => act(() => api("/api/admin/pets/" + p._id, "PATCH", { status: e.target.value }))}>
                  {Object.entries(ST).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></td>
                <td><button className="btn-r" onClick={() => confirm("Устгах уу?") && act(() => api("/api/admin/pets/" + p._id, "DELETE"))}>Устгах</button></td>
              </tr>))}</tbody></table>
        ) : (
          <table className="tbl"><thead><tr><th>Амьтан</th><th>Хүсэгч</th><th>Мессеж</th><th>Төлөв</th><th></th></tr></thead>
            <tbody>{reqs.map((r) => (
              <tr key={r._id}>
                <td>{r.pet?.name}</td>
                <td>{r.name}<br /><small>{r.phone}</small></td>
                <td>{r.msg}</td>
                <td>{RST[r.status]}</td>
                <td>{r.status === "new" && <div className="flex gap-1">
                  <button className="btn" onClick={() => act(() => api("/api/admin/requests/" + r._id, "PATCH", { status: "accepted" }))}>Зөвшөөрөх</button>
                  <button className="btn-r" onClick={() => act(() => api("/api/admin/requests/" + r._id, "PATCH", { status: "rejected" }))}>Татгалзах</button></div>}</td>
              </tr>))}</tbody></table>
        )}
      </div>
    </div>
  );
}
