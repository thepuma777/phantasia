// pages/video.js
import React, { useState } from "react";

const gallery = [
  {
    url: "https://example.com/demo-video1.mp4",
    prompt: "Ένας μάγος σε ελληνικό κάστρο, μαγικό στυλ, 8s, fantasy",
  },
  {
    url: "https://example.com/demo-video2.mp4",
    prompt: "Ρεαλιστικό ηλιοβασίλεμα στην Πάρο, 5s, realistic",
  },
  {
    url: "https://example.com/demo-video3.mp4",
    prompt: "Καρτούν ρομπότ που περπατά στην Αθήνα, 4s, cartoon",
  },
];

export default function VideoPage() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState("5s");
  const [style, setStyle] = useState("realistic");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const res = await fetch("/api/generate-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, duration, style }),
    });
    const data = await res.json();
    setVideo(data.preview);
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">🎥 Δημιουργία Βίντεο</h1>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Πληκτρολόγησε την ιδέα σου..."
        className="w-full border p-2 rounded mb-4"
      />

      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="4s">📏 4 Δευτερόλεπτα</option>
        <option value="5s">📏 5 Δευτερόλεπτα</option>
        <option value="8s">📏 8 Δευτερόλεπτα</option>
        <option value="10s">📏 10 Δευτερόλεπτα</option>
      </select>

      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="realistic">📸 Ρεαλιστικό</option>
        <option value="fantasy">🧙 Φαντασίας / Μαγικό</option>
        <option value="cartoon">👧 Καρτουνίστικο</option>
        <option value="futuristic">🦾 Μελλοντικό / Sci-Fi</option>
      </select>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Δημιούργησε
      </button>

      {loading && <p className="mt-4">⏳ Επεξεργασία...</p>}
      {video && (
        <video src={video} controls className="mt-6 rounded shadow w-full" />
      )}

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">🎬 Παράδειγμα Γκαλερί</h2>
        <div className="grid gap-6">
          {gallery.map((item, index) => (
            <div key={index} className="border rounded-lg p-3 shadow">
              <video src={item.url} controls className="w-full mb-2 rounded" />
              <p className="text-sm italic mb-1">🧠 {item.prompt}</p>
              <button
                onClick={() => {
                  setPrompt(item.prompt);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
              >
                📋 Αντιγραφή prompt
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
