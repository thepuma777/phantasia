// pages/image.js
import React, { useState } from "react";

export default function ImagePage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setImage(data.image);
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">🖼 Δημιουργία Εικόνας</h1>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Πληκτρολόγησε την περιγραφή σου..."
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Δημιούργησε
      </button>
      {loading && <p className="mt-4">⏳ Δημιουργία...</p>}
      {image && <img src={image} alt="Ergebnis" className="mt-6 rounded shadow" />}
    </div>
  );
}
