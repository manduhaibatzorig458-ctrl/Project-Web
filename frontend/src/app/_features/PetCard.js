// import { ST } from "@/app/_features/constants";

// export default function PetCard({ pet, onClick }) {
//   return (
//     <div onClick={onClick} className="cursor-pointer overflow-hidden rounded-xl border border-[#eadfd3] bg-white transition hover:-translate-y-1">
//       <div className="flex h-32 items-center justify-center bg-[#fbe6da] bg-cover bg-center text-5xl"
//         style={pet.img ? { backgroundImage: `url(${pet.img})` } : undefined}>
//         {!pet.img && "🐾"}
//       </div>
//       <div className="p-3">
//         <b>{pet.name}</b>
//         <div className="text-sm text-stone-500">{pet.type} · {pet.age ?? "?"} нас · {pet.dist}</div>
//         <div className="mt-1 text-sm">● {ST[pet.status]}</div>
//       </div>
//     </div>
//   );
// }



import { ST } from "@/app/_features/constants";

const BADGE = {
  available: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  adopted: "bg-stone-200 text-stone-600",
};
const EMOJI = { Нохой: "🐕", Муур: "🐈", Бусад: "🐇" };

export default function PetCard({ pet, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-[#eadfd3] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className="relative flex aspect-[4/3] items-center justify-center bg-[#fbe6da] bg-cover bg-center text-6xl"
        style={pet.img ? { backgroundImage: `url(${pet.img})` } : undefined}
      >
        {!pet.img && EMOJI[pet.type]}
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${BADGE[pet.status]}`}>
          {ST[pet.status]}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold">{pet.name}</h3>
          <span className="text-sm text-stone-500">{pet.sex}</span>
        </div>
        <p className="mt-0.5 text-sm text-stone-500">
          {pet.type} · {pet.age < 1 ? `${Math.round((pet.age || 0) * 12)} сар` : `${pet.age} нас`}
        </p>
        <p className="mt-2 text-sm text-stone-600">📍 {pet.dist}</p>
      </div>
    </div>
  );
}