import DashboardLayout from "../layouts/DashboardLayout";

const cards = [
  { title: "Simple card", body: "Use this for summaries, quick actions, or small modules." },
  { title: "Responsive grid", body: "On mobile it stacks. On tablets and laptops it becomes a clean grid." },
  { title: "Action section", body: "Good for dashboard shortcuts and small system features." }
];

export default function Page3() {
  return (
    <DashboardLayout>
      <section className="grid gap-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: "#2563EB" }}>
            Page 3
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Cards Template</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Use this for dashboard sections, action panels, feature cards, or simple report blocks.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => (
            <article key={card.title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-black text-white" style={{ background: index === 0 ? "#2563EB" : "#0f172a" }}>
                {index + 1}
              </div>
              <h2 className="mt-5 text-xl font-black text-slate-950">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{card.body}</p>
            </article>
          ))}
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Ready for your real feature</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                Replace this with reports, profile settings, sales summaries, admin tools, or any exam requirement.
              </p>
            </div>
            <button className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950">Customize</button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
