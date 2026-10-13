"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/app/_api/api";
import { useAuth } from "@/app/(provider)/AuthProvider";
import { RST, ST } from "@/app/_features/constants";

export default function MyPage() {
  const { user, ready } = useAuth();
  const [pets, setPets] = useState([]);
  const [reqs, setReqs] = useState([]);

  useEffect(() => {
    if (!user) return;
    api("/api/me/pets").then(setPets).catch(() => {});
    api("/api/me/requests").then(setReqs).catch(() => {});
  }, [user]);

  if (!ready) return null;
  if (!user) return <Link href="/auth" className="btn">Нэвтэрнэ үү</Link>;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-2 text-lg font-bold">Миний зарууд</h2>
        <div className="overflow-x-auto"><table className="tbl"><thead><tr><th>Нэр</th><th>Баталгаа</th><th>Төлөв</th></tr></thead>
          <tbody>{pets.map((p) => <tr key={p._id}><td>{p.name}</td><td>{p.approved ? "Нийтлэгдсэн" : "Хүлээгдэж буй"}</td><td>{ST[p.status]}</td></tr>)}</tbody></table></div>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-bold">Миний илгээсэн хүсэлт</h2>
        <div className="overflow-x-auto"><table className="tbl"><thead><tr><th>Амьтан</th><th>Төлөв</th></tr></thead>
          <tbody>{reqs.map((r) => <tr key={r._id}><td>{r.pet?.name}</td><td>{RST[r.status]}</td></tr>)}</tbody></table></div>
      </section>
    </div>
  );
}
