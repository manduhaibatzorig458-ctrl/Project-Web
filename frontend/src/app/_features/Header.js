"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/(provider)/AuthProvider";
import PetForm from "@/app/_features/PetForm";

const NAV = [
  { href: "/adopt", label: "Үрчлүүлэх" },
  { href: "/stories", label: "Түүхүүд" },
  { href: "/about", label: "Бидний тухай" },
];

const Paw = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="#3b3b32">
    <ellipse cx="5.5" cy="10" rx="2" ry="2.6" />
    <ellipse cx="9.5" cy="5.5" rx="2" ry="2.6" />
    <ellipse cx="14.5" cy="5.5" rx="2" ry="2.6" />
    <ellipse cx="18.5" cy="10" rx="2" ry="2.6" />
    <path d="M12 11c-3 0-6 3.2-6 6 0 2 1.6 3 3.2 3 1 0 1.8-.5 2.8-.5s1.8.5 2.8.5c1.6 0 3.2-1 3.2-3 0-2.8-3-6-6-6z" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="9" r="3.2" />
    <path d="M6.5 18.5c1-2.4 3-3.5 5.5-3.5s4.5 1.1 5.5 3.5" />
  </svg>
);

const Heart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z" />
  </svg>
);

const avatarCls =
  "flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#6f7656] text-[#6f7656] transition hover:bg-[#6f7656] hover:text-white";

export default function Header() {
  const { user, logout } = useAuth();
  const [adding, setAdding] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#f4efe6]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        {/* Лого */}
        <Link href="/" className="flex items-center gap-2.5">
          <Paw />
          <span className="text-[13px] font-extrabold uppercase leading-[1.1] tracking-[0.08em] text-[#3b3b32]">
            АМИН
            <br />
            PAWS
          </span>
        </Link>

        {/* Цэс (баруун тийш) */}
        <nav className="ml-auto mr-4 hidden items-center gap-9 text-[13px] font-medium text-[#3b3b32] md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#6f7656] after:transition-all hover:text-[#6f7656] hover:after:w-full"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Баруун тал */}
        <div className="relative flex items-center gap-3">
          <Link
            href="/donate"
            className="flex items-center gap-2 rounded-xl bg-[#7a8461] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-[#667050]"
          >
            <Heart /> Хандив
          </Link>

          {user ? (
            <>
              <button onClick={() => setMenu((v) => !v)} aria-label="Профайл" className={avatarCls}>
                <UserIcon />
              </button>
              {menu && (
                <div className="absolute right-0 top-14 z-40 flex w-52 flex-col rounded-2xl border border-[#e6dccb] bg-white p-2 text-sm shadow-xl">
                  <span className="px-3 py-2 font-semibold text-[#3b3b32]">{user.name}</span>
                  <hr className="my-1 border-[#eee5d6]" />
                  {user.role === "admin" && (
                    <Link href="/admin" onClick={() => setMenu(false)} className="rounded-lg px-3 py-2 hover:bg-[#f4efe6]">
                      Админ
                    </Link>
                  )}
                  <Link href="/my" onClick={() => setMenu(false)} className="rounded-lg px-3 py-2 hover:bg-[#f4efe6]">
                    Миний зар
                  </Link>
                  <button
                    onClick={() => { setAdding(true); setMenu(false); }}
                    className="rounded-lg px-3 py-2 text-left hover:bg-[#f4efe6]"
                  >
                    + Зар нэмэх
                  </button>
                  <button
                    onClick={() => { logout(); setMenu(false); }}
                    className="rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
                  >
                    Гарах
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/auth" aria-label="Нэвтрэх" className={avatarCls}>
              <UserIcon />
            </Link>
          )}

          {/* Бургер (мобайл) */}
          <button
            onClick={() => setMobile((v) => !v)}
            aria-label="Цэс"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 md:hidden"
          >
            <span className="h-0.5 w-5 bg-[#3b3b32]" />
            <span className="h-0.5 w-5 bg-[#3b3b32]" />
            <span className="h-0.5 w-5 bg-[#3b3b32]" />
          </button>
        </div>
      </div>

      {/* Мобайл цэс */}
      {mobile && (
        <nav className="flex flex-col gap-1 border-t border-[#e6dccb] bg-[#f4efe6] px-5 py-3 md:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setMobile(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-white">
              {n.label}
            </Link>
          ))}
        </nav>
      )}

      {adding && <PetForm onClose={() => setAdding(false)} />}
    </header>
  );
}