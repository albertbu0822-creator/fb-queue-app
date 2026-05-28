"use client";
import { useState, useEffect, useRef } from "react";

const INITIAL_ORDERS = [
  { id: "A01", items: ["Nasi Goreng Special", "Es Teh Manis"], status: "ready", time: "12:01" },
  { id: "A02", items: ["Mie Ayam", "Jus Alpukat"], status: "cooking", time: "12:05" },
  { id: "A03", items: ["Soto Ayam", "Air Mineral"], status: "cooking", time: "12:08" },
  { id: "B01", items: ["Ayam Bakar", "Nasi Putih", "Es Jeruk"], status: "ready", time: "12:10" },
  { id: "B02", items: ["Gado-Gado", "Teh Hangat"], status: "waiting", time: "12:15" },
  { id: "B03", items: ["Bakso Komplit", "Es Campur"], status: "waiting", time: "12:18" },
  { id: "C01", items: ["Rendang", "Nasi Putih", "Sayur Lodeh"], status: "cooking", time: "12:20" },
  { id: "C02", items: ["Mie Goreng", "Es Teh"], status: "waiting", time: "12:22" },
];

const STATUS_CONFIG = {
  ready:   { label: "SIAP DIAMBIL",   color: "#00E5A0", bg: "rgba(0,229,160,0.12)",  pulse: true  },
  cooking: { label: "SEDANG DIMASAK", color: "#FFB800", bg: "rgba(255,184,0,0.10)",  pulse: false },
  waiting: { label: "MENUNGGU",       color: "#4A90D9", bg: "rgba(74,144,217,0.08)", pulse: false },
};

function Clock({ large }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  return (
    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: large ? "48px" : "22px", color: "#FFB800", letterSpacing: "3px", lineHeight: 1 }}>
      {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

function Ticker() {
  const msg = "🍽️  Selamat datang! Mohon ambil pesanan Anda saat nomor dipanggil.  •  Terima kasih telah bersabar.  •  Pesanan siap akan dipanggil 3 kali sebelum dibatalkan.  •  ";
  return (
    <div style={{ background: "#111", borderTop: "1px solid #1A1A1A", padding: "10px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-block", animation: "ticker 30s linear infinite", color: "#FFB800", fontFamily: "'Space Mono', monospace", fontSize: "13px", letterSpacing: "0.5px" }}>
        {msg}{msg}
      </div>
    </div>
  );
}

function OrderCard({ order, animating }) {
  const cfg = STATUS_CONFIG[order.status];
  return (
    <div style={{
      background: "#141414", border: `1px solid ${order.status === "ready" ? cfg.color : "#222"}`,
      borderRadius: "12px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "10px",
      position: "relative", overflow: "hidden",
      boxShadow: order.status === "ready" ? `0 0 24px rgba(0,229,160,0.18)` : "none",
      transition: "all 0.4s ease",
      animation: animating ? "cardPop 0.5s cubic-bezier(.22,1,.36,1)" : "none",
    }}>
      {order.status === "ready" && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)`, animation: "shimmer 2s ease infinite" }} />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "28px", fontWeight: "700", color: order.status === "ready" ? cfg.color : "#fff", letterSpacing: "2px" }}>#{order.id}</span>
        <span style={{ color: "#444", fontFamily: "'Space Mono', monospace", fontSize: "12px" }}>{order.time}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {order.items.map((item, i) => (
          <div key={i} style={{ color: "#888", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#333", fontSize: "10px" }}>▸</span>{item}
          </div>
        ))}
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: cfg.bg, border: `1px solid ${cfg.color}22`, borderRadius: "6px", padding: "5px 10px", alignSelf: "flex-start" }}>
        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: cfg.color, animation: cfg.pulse ? "blink 1s ease infinite" : "none" }} />
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: cfg.color, letterSpacing: "1.5px", fontWeight: "700" }}>{cfg.label}</span>
      </div>
    </div>
  );
}

function TVCard({ order }) {
  const cfg = STATUS_CONFIG[order.status];
  return (
    <div style={{
      background: order.status === "ready" ? "rgba(0,229,160,0.07)" : "#111",
      border: `2px solid ${order.status === "ready" ? cfg.color : "#222"}`,
      borderRadius: "16px", padding: "24px 28px", display: "flex", flexDirection: "column", gap: "12px",
      position: "relative", overflow: "hidden",
      boxShadow: order.status === "ready" ? `0 0 40px rgba(0,229,160,0.2)` : "none",
    }}>
      {order.status === "ready" && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)`, animation: "shimmer 2s ease infinite" }} />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "42px", fontWeight: "700", color: order.status === "ready" ? cfg.color : "#fff", letterSpacing: "3px" }}>#{order.id}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: cfg.bg, border: `1px solid ${cfg.color}33`, borderRadius: "8px", padding: "7px 14px" }}>
          <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: cfg.color, animation: cfg.pulse ? "blink 1s ease infinite" : "none" }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: cfg.color, letterSpacing: "2px", fontWeight: "700" }}>{cfg.label}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {order.items.map((item, i) => (
          <div key={i} style={{ color: "#777", fontSize: "15px", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#333" }}>▸</span>{item}
          </div>
        ))}
      </div>
    </div>
  );
}

function TVScreen({ orders, onExit }) {
  const ready = orders.filter(o => o.status === "ready");
  const cooking = orders.filter(o => o.status === "cooking");
  const waiting = orders.filter(o => o.status === "waiting");

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#080808", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif", overflow: "hidden" }}>
      <div style={{ background: "#0D0D0D", borderBottom: "1px solid #1A1A1A", padding: "18px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", background: "linear-gradient(135deg,#FF6B35,#FFB800)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" }}>🍜</div>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "22px", fontWeight: "700", letterSpacing: "2px", color: "#fff" }}>ANTRIAN PESANAN</div>
            <div style={{ color: "#555", fontSize: "12px", letterSpacing: "3px", fontFamily: "'Space Mono', monospace" }}>F&B QUEUE DISPLAY</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <Clock large />
          <button onClick={onExit} style={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: "8px", color: "#777", padding: "10px 18px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "1px" }}>✕ KELUAR</button>
        </div>
      </div>

      {ready.length > 0 && (
        <div style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.18), rgba(0,229,160,0.06))", borderBottom: "1px solid rgba(0,229,160,0.25)", padding: "22px 48px", display: "flex", alignItems: "center", gap: "28px" }}>
          <div style={{ fontSize: "44px", animation: "wiggle 2s ease infinite", flexShrink: 0 }}>🔔</div>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", color: "#00E5A0", fontSize: "13px", letterSpacing: "4px", fontWeight: "700", marginBottom: "10px" }}>NOMOR PESANAN SIAP DIAMBIL</div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {ready.map(o => (
                <span key={o.id} style={{ background: "rgba(0,229,160,0.2)", border: "2px solid #00E5A0", borderRadius: "10px", padding: "6px 20px", fontFamily: "'Space Mono', monospace", color: "#00E5A0", fontSize: "36px", fontWeight: "700", letterSpacing: "3px" }}>#{o.id}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", overflow: "hidden" }}>
        {[
          { list: ready,   color: "#00E5A0", label: "SIAP DIAMBIL",   dot: true  },
          { list: cooking, color: "#FFB800", label: "SEDANG DIMASAK", dot: false },
          { list: waiting, color: "#4A90D9", label: "MENUNGGU",       dot: false },
        ].map((col, idx) => (
          <div key={idx} style={{ borderRight: idx < 2 ? "1px solid #1A1A1A" : "none", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "16px 28px", background: "#0D0D0D", borderBottom: "1px solid #1A1A1A", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: col.color, animation: col.dot ? "blink 1s ease infinite" : "none" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: col.color, letterSpacing: "2px", fontWeight: "700" }}>{col.label}</span>
              <span style={{ marginLeft: "auto", fontFamily: "'Space Mono', monospace", fontSize: "18px", color: col.color, fontWeight: "700" }}>{col.list.length}</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {col.list.length === 0
                ? <div style={{ textAlign: "center", padding: "40px 0", color: "#2A2A2A", fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "2px" }}>— KOSONG —</div>
                : col.list.map(o => <TVCard key={o.id} order={o} />)
              }
            </div>
          </div>
        ))}
      </div>
      <Ticker />
    </div>
  );
}

function ReadyBanner({ orders }) {
  const ready = orders.filter(o => o.status === "ready");
  if (ready.length === 0) return null;
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.15), rgba(0,229,160,0.05))", border: "1px solid rgba(0,229,160,0.3)", borderRadius: "16px", padding: "20px 28px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "20px" }}>
      <div style={{ fontSize: "36px", animation: "wiggle 2s ease infinite" }}>🔔</div>
      <div>
        <div style={{ fontFamily: "'Space Mono', monospace", color: "#00E5A0", fontSize: "13px", letterSpacing: "3px", fontWeight: "700", marginBottom: "6px" }}>PESANAN SIAP DIAMBIL</div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {ready.map(o => (
            <span key={o.id} style={{ background: "rgba(0,229,160,0.2)", border: "1px solid #00E5A0", borderRadius: "6px", padding: "4px 12px", fontFamily: "'Space Mono', monospace", color: "#00E5A0", fontSize: "18px", fontWeight: "700", letterSpacing: "2px" }}>#{o.id}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function QueueApp() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [newOrderId, setNewOrderId] = useState("");
  const [newItems, setNewItems] = useState("");
  const [animatingId, setAnimatingId] = useState(null);
  const [view, setView] = useState("all");
  const [showPanel, setShowPanel] = useState(false);
  const [tvMode, setTvMode] = useState(false);

  const toggleTV = () => {
    if (!tvMode) {
      if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
      setTvMode(true);
    } else {
      if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
      setTvMode(false);
    }
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setTvMode(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const addOrder = () => {
    if (!newOrderId.trim()) return;
    const order = { id: newOrderId.trim().toUpperCase(), items: newItems.split(",").map(s => s.trim()).filter(Boolean), status: "waiting", time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) };
    setOrders(prev => [order, ...prev]);
    setAnimatingId(order.id);
    setTimeout(() => setAnimatingId(null), 600);
    setNewOrderId(""); setNewItems("");
  };

  const cycleStatus = (id) => {
    const cycle = { waiting: "cooking", cooking: "ready", ready: "waiting" };
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: cycle[o.status] } : o));
    setAnimatingId(id);
    setTimeout(() => setAnimatingId(null), 600);
  };

  const removeOrder = (id) => setOrders(prev => prev.filter(o => o.id !== id));

  const filtered = view === "all" ? orders : orders.filter(o => o.status === view);
  const counts = { all: orders.length, ready: orders.filter(o=>o.status==="ready").length, cooking: orders.filter(o=>o.status==="cooking").length, waiting: orders.filter(o=>o.status==="waiting").length };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes ticker  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes wiggle  { 0%,100%{transform:rotate(0)} 20%{transform:rotate(-15deg)} 40%{transform:rotate(15deg)} 60%{transform:rotate(-10deg)} 80%{transform:rotate(10deg)} }
        @keyframes cardPop { from{transform:scale(0.92);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes fadeIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#111; }
        ::-webkit-scrollbar-thumb { background:#333; border-radius:4px; }
        input { outline:none; }
        button:hover { filter:brightness(1.1); }
      `}</style>

      {tvMode && <TVScreen orders={orders} onExit={toggleTV} />}

      <div style={{ background: "#0D0D0D", borderBottom: "1px solid #1A1A1A", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg,#FF6B35,#FFB800)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🍜</div>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "16px", fontWeight: "700", letterSpacing: "1px", color: "#fff" }}>ANTRIAN ORDER</div>
            <div style={{ color: "#555", fontSize: "11px", letterSpacing: "2px", fontFamily: "'Space Mono', monospace" }}>F&B QUEUE DISPLAY</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Clock />
          <button onClick={toggleTV} style={{ background: "linear-gradient(135deg,#FF6B35,#FFB800)", border: "none", borderRadius: "8px", color: "#000", padding: "8px 18px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "1px", fontWeight: "700" }}>📺 TV MODE</button>
          <button onClick={() => setShowPanel(!showPanel)} style={{ background: showPanel ? "#FFB800" : "#1A1A1A", border: "1px solid #333", borderRadius: "8px", color: showPanel ? "#000" : "#fff", padding: "8px 16px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "1px", fontWeight: "700" }}>⚙ KELOLA</button>
        </div>
      </div>

      <Ticker />

      <div style={{ padding: "28px 32px", maxWidth: "1400px", margin: "0 auto" }}>
        <ReadyBanner orders={orders} />

        {showPanel && (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "14px", padding: "20px 24px", marginBottom: "28px", animation: "fadeIn 0.3s ease" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "2px", color: "#555", marginBottom: "16px" }}>TAMBAH / KELOLA PESANAN</div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
              <input value={newOrderId} onChange={e => setNewOrderId(e.target.value)} onKeyDown={e => e.key === "Enter" && addOrder()} placeholder="No. Order (cth: D01)"
                style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px", color: "#fff", padding: "10px 14px", fontFamily: "'Space Mono', monospace", fontSize: "13px", width: "160px" }} />
              <input value={newItems} onChange={e => setNewItems(e.target.value)} onKeyDown={e => e.key === "Enter" && addOrder()} placeholder="Menu (pisahkan dengan koma)"
                style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px", color: "#fff", padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", flex: 1, minWidth: "220px" }} />
              <button onClick={addOrder} style={{ background: "#FFB800", border: "none", borderRadius: "8px", color: "#000", padding: "10px 20px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontWeight: "700", fontSize: "12px", letterSpacing: "1px" }}>+ TAMBAH</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "220px", overflowY: "auto" }}>
              {orders.map(o => (
                <div key={o.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 12px", background: "#161616", borderRadius: "8px" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", color: "#FFB800", fontSize: "13px", minWidth: "50px" }}>#{o.id}</span>
                  <span style={{ color: "#666", fontSize: "12px", flex: 1 }}>{o.items.join(", ")}</span>
                  <button onClick={() => cycleStatus(o.id)} style={{ background: STATUS_CONFIG[o.status].bg, border: `1px solid ${STATUS_CONFIG[o.status].color}44`, borderRadius: "6px", color: STATUS_CONFIG[o.status].color, padding: "4px 10px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "1px" }}>
                    {STATUS_CONFIG[o.status].label}
                  </button>
                  <button onClick={() => removeOrder(o.id)} style={{ background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.2)", borderRadius: "6px", color: "#FF5050", padding: "4px 10px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "10px" }}>✕ HAPUS</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {[{ key: "all", label: "Semua" }, { key: "ready", label: "Siap" }, { key: "cooking", label: "Memasak" }, { key: "waiting", label: "Menunggu" }].map(tab => (
            <button key={tab.key} onClick={() => setView(tab.key)} style={{ background: view === tab.key ? "#fff" : "#141414", border: `1px solid ${view === tab.key ? "#fff" : "#222"}`, borderRadius: "8px", color: view === tab.key ? "#000" : "#666", padding: "8px 16px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: view === tab.key ? "700" : "400", letterSpacing: "1px", transition: "all 0.2s" }}>
              {tab.label} <span style={{ marginLeft: "6px", background: view === tab.key ? "#00000022" : "#1A1A1A", borderRadius: "4px", padding: "1px 6px", fontSize: "10px" }}>{counts[tab.key]}</span>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
          {[{ label: "Total Order", value: counts.all, color: "#fff" }, { label: "Siap Diambil", value: counts.ready, color: "#00E5A0" }, { label: "Sedang Dimasak", value: counts.cooking, color: "#FFB800" }, { label: "Menunggu", value: counts.waiting, color: "#4A90D9" }].map(stat => (
            <div key={stat.label} style={{ flex: 1, background: "#111", border: "1px solid #1A1A1A", borderRadius: "10px", padding: "14px 18px", minWidth: "0" }}>
              <div style={{ color: "#444", fontSize: "10px", fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", marginBottom: "6px" }}>{stat.label.toUpperCase()}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "28px", fontWeight: "700", color: stat.color }}>{String(stat.value).padStart(2, "0")}</div>
            </div>
          ))}
        </div>

        {filtered.length === 0
          ? <div style={{ textAlign: "center", padding: "60px 0", color: "#333", fontFamily: "'Space Mono', monospace", fontSize: "13px", letterSpacing: "2px" }}>— TIDAK ADA PESANAN —</div>
          : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
              {filtered.map(order => <OrderCard key={order.id} order={order} animating={animatingId === order.id} />)}
            </div>
        }
      </div>
    </div>
  );
}
