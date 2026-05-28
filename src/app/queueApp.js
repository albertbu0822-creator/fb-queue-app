"use client";
import { useState, useEffect } from "react";

const INITIAL_ORDERS = [
  { id: "A01", items: ["Nasi Goreng Special", "Es Teh Manis"], status: "ready", time: "12:01" },
  { id: "A02", items: ["Mie Ayam", "Jus Alpukat"], status: "cooking", time: "12:05" },
  { id: "B01", items: ["Ayam Bakar", "Nasi Putih"], status: "ready", time: "12:10" },
  { id: "B02", items: ["Gado-Gado", "Teh Hangat"], status: "waiting", time: "12:15" },
  { id: "C01", items: ["Rendang", "Nasi Putih"], status: "cooking", time: "12:20" },
];

const STATUS_CONFIG = {
  ready:   { label: "SIAP DIAMBIL",   color: "#00E5A0", bg: "rgba(0,229,160,0.12)",  pulse: true  },
  cooking: { label: "SEDANG DIMASAK", color: "#FFB800", bg: "rgba(255,184,0,0.10)",  pulse: false },
  waiting: { label: "MENUNGGU",       color: "#4A90D9", bg: "rgba(74,144,217,0.08)", pulse: false },
};

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  return <span style={{ fontFamily: "monospace", fontSize: "20px", color: "#FFB800" }}>{time.toLocaleTimeString("id-ID")}</span>;
}

export default function QueueApp() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [newId, setNewId] = useState("");
  const [newItems, setNewItems] = useState("");
  const [showPanel, setShowPanel] = useState(false);

  const addOrder = () => {
    if (!newId.trim()) return;
    setOrders(prev => [{ id: newId.toUpperCase(), items: newItems.split(",").map(s => s.trim()).filter(Boolean), status: "waiting", time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) }, ...prev]);
    setNewId(""); setNewItems("");
  };

  const cycleStatus = (id) => {
    const cycle = { waiting: "cooking", cooking: "ready", ready: "waiting" };
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: cycle[o.status] } : o));
  };

  const removeOrder = (id) => setOrders(prev => prev.filter(o => o.id !== id));

  const ready = orders.filter(o => o.status === "ready");

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#fff", fontFamily: "sans-serif" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { outline: none; }
      `}</style>

      <div style={{ background: "#0D0D0D", borderBottom: "1px solid #1A1A1A", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "24px" }}>🍜</span>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: "700" }}>ANTRIAN ORDER</div>
            <div style={{ color: "#555", fontSize: "11px", fontFamily: "monospace" }}>F&B QUEUE DISPLAY</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Clock />
          <button onClick={() => setShowPanel(!showPanel)} style={{ background: showPanel ? "#FFB800" : "#1A1A1A", border: "1px solid #333", borderRadius: "8px", color: showPanel ? "#000" : "#fff", padding: "8px 14px", cursor: "pointer", fontFamily: "monospace", fontSize: "11px", fontWeight: "700" }}>⚙️ KELOLA</button>
        </div>
      </div>

      <div style={{ background: "#111", borderTop: "1px solid #1A1A1A", padding: "10px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-block", animation: "ticker 25s linear infinite", color: "#FFB800", fontFamily: "monospace", fontSize: "13px" }}>
          🍽️ Mohon ambil pesanan saat nomor dipanggil • Terima kasih telah bersabar • Pesanan siap dipanggil 3x sebelum dibatalkan •&nbsp;&nbsp;&nbsp;🍽️ Mohon ambil pesanan saat nomor dipanggil • Terima kasih telah bersabar •
        </div>
      </div>

      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        {ready.length > 0 && (
          <div style={{ background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.3)", borderRadius: "12px", padding: "16px 24px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "32px" }}>🔔</span>
            <div>
              <div style={{ fontFamily: "monospace", color: "#00E5A0", fontSize: "12px", letterSpacing: "3px", fontWeight: "700", marginBottom: "8px" }}>PESANAN SIAP DIAMBIL</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {ready.map(o => <span key={o.id} style={{ background: "rgba(0,229,160,0.2)", border: "1px solid #00E5A0", borderRadius: "6px", padding: "4px 12px", fontFamily: "monospace", color: "#00E5A0", fontSize: "20px", fontWeight: "700" }}>#{o.id}</span>)}
              </div>
            </div>
          </div>
        )}

        {showPanel && (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#555", marginBottom: "14px", letterSpacing: "2px" }}>TAMBAH / KELOLA PESANAN</div>
            <div style={{ display:
