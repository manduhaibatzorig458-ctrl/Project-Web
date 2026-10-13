import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const serif = Playfair_Display({ subsets: ["latin", "cyrillic"], weight: ["700", "800"] });

const FEATURES = [
  {
    title: "Үрчлэх",
    text: "Нэг амьдралыг аврах",
    icon: (
      <>
        <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
        <path d="M12 18s-3.5-2.2-3.5-4.7A2 2 0 0 1 12 12a2 2 0 0 1 3.5 1.3C15.5 15.8 12 18 12 18z" />
      </>
    ),
  },
  {
    title: "Туслах",
    text: "Жижиг тусламж ч үнэ цэнэтэй",
    icon: (
      <>
        <path d="M12 12s-4.5-2.8-4.5-6A2.5 2.5 0 0 1 12 4.5 2.5 2.5 0 0 1 16.5 6c0 3.2-4.5 6-4.5 6z" />
        <path d="M3 16l4-1 5 1.5 5-2a1.5 1.5 0 0 1 1 2.8L12 20l-6 1-3-2z" />
      </>
    ),
  },
  {
    title: "Нийгэмлэг",
    text: "Хамтдаа амьтдаг аврах",
    icon: (
      <>
        <circle cx="12" cy="6" r="2.5" />
        <circle cx="5.5" cy="9" r="2" />
        <circle cx="18.5" cy="9" r="2" />
        <path d="M8 19v-3a4 4 0 0 1 8 0v3z" />
      </>
    ),
  },
];

function PetsArt() {
  return (
    <svg viewBox="0 0 420 440" className="h-full w-auto" aria-label="Нохой, муур">
      {/* Нохой: цээж */}
      <path d="M60 440C60 345 125 300 210 300s150 45 150 140z" fill="#d9a35b" />
      {/* чихнүүд */}
      <path d="M108 128C58 140 46 235 84 275c38 12 58-45 58-105z" fill="#b57630" />
      <path d="M312 128c50 12 62 107 24 147-38 12-58-45-58-105z" fill="#b57630" />
      {/* толгой */}
      <ellipse cx="210" cy="180" rx="106" ry="112" fill="#e8b873" />
      <ellipse cx="210" cy="240" rx="60" ry="48" fill="#f7e2bf" />
      {/* нүд */}
      <circle cx="168" cy="172" r="12" fill="#3a2a22" />
      <circle cx="252" cy="172" r="12" fill="#3a2a22" />
      <circle cx="172" cy="168" r="4" fill="#fff" />
      <circle cx="256" cy="168" r="4" fill="#fff" />
      <path d="M148 148q20-14 40-4M232 144q20-10 40 4" stroke="#b57630" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* хамар, ам */}
      <ellipse cx="210" cy="218" rx="22" ry="15" fill="#3a2a22" />
      <ellipse cx="203" cy="213" rx="6" ry="3" fill="#6b5a50" />
      <path d="M210 232v10M210 242q-18 14-36-2M210 242q18 14 36-2" stroke="#3a2a22" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M196 246q14 36 28 0z" fill="#f08a9a" />

      {/* Муур */}
      <path d="M255 440c0-45 28-70 68-70s68 25 68 70z" fill="#8c7b68" />
      <path d="M268 340l6-58 38 34zM378 340l-6-58-38 34z" fill="#8c7b68" />
      <path d="M277 330l3-30 20 18zM369 330l-3-30-20 18z" fill="#e9b5b5" />
      <ellipse cx="323" cy="362" rx="62" ry="52" fill="#9a8873" />
      <path d="M323 318v16M308 320l3 13M338 320l-3 13" stroke="#5e5143" strokeWidth="4" strokeLinecap="round" />
      <path d="M296 360q9 8 18 0M332 360q9 8 18 0" stroke="#3a2a22" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M316 374h14l-7 8z" fill="#e58a98" />
      <path d="M323 382q-8 8-16 2M323 382q8 8 16 2" stroke="#3a2a22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M262 372h-24M262 382l-22 6M384 372h24M384 382l22 6" stroke="#f3ece0" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="323" cy="425" rx="26" ry="22" fill="#f3ece0" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative mx-auto overflow-hidden rounded-[2rem] bg-[#d7dcc2]">
      {/* Зүүн дэвсгэр */}
      <div className="absolute inset-y-0 left-0 w-full bg-[#e3e6d7] md:w-[60%] md:rounded-br-[240px]" />
      {/* Баруун тойрог */}
      <div className="absolute -right-20 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#d3d8c1] md:block" />

      <div className="relative grid items-center md:grid-cols-[1.1fr_0.9fr]">
        {/* Зүүн тал */}
        <div className="px-8 py-12 sm:px-12 md:py-20 lg:px-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[#6f7656]">
            🐾 Гэр бүлээ хайж байна
          </span>

          <h1 className={`${serif.className} mt-5 text-4xl leading-[1.12] text-[#3a2a22] sm:text-5xl lg:text-6xl`}>
            Хайр түгээж,
            <br />
            <span className="text-[#7a8461]">амьтдад шинэ</span>
            <br />
            амьдрал бэлэглэе. 
          </h1>

          <div className="mt-20 flex flex-wrap gap-3 ">
            <Link
              href="#pets"
              className="rounded-xl bg-[#7a8461] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-[#7a8461]/30 transition hover:-translate-y-0.5 hover:bg-[#667050]"
            >
              Амьтан үзэх
            </Link>
            <Link
              href="/donate"
              className="rounded-xl border-2 border-[#7a8461] px-7 py-3 text-sm font-semibold text-[#5d6648] transition hover:bg-white/70"
            >
              Хандив
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#3b3b32]/10 pt-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#3b3b32" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  {f.icon}
                </svg>
                <div className="text-xs leading-tight">
                  <div className="text-[13px] font-bold text-[#3b3b32]">{f.title}</div>
                  <div className="mt-0.5 text-[#6b6b60]">{f.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Баруун тал */}
        <div className="relative flex h-[340px] items-end justify-center md:h-[560px]">
          {/* чимэглэл */}
          <svg className="absolute right-[18%] top-10 hidden md:block" width="46" height="34" viewBox="0 0 46 34" stroke="#7a8461" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 20l-4-9M20 12l-1-10M34 14l8-8" />
          </svg>
          <svg className="absolute left-[8%] top-24 hidden md:block" width="34" height="32" viewBox="0 0 24 24" fill="none" stroke="#7a8461" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z" />
          </svg>

          <div className="h-[92%]">
            <PetsArt />
          </div>
        </div>
      </div>
    </section>
  );
}