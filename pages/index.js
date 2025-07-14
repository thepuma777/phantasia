// pages/index.js
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">👋 Καλώς ήρθες στο Phantasia</h1>
      <p className="mb-4 text-gray-600">Δημιούργησε εικόνες & βίντεο με τεχνητή νοημοσύνη – στα ελληνικά!</p>

      <div className="flex flex-col gap-4">
        <Link href="/image">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            🖼 Δημιουργία Εικόνας
          </button>
        </Link>
        <Link href="/video">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            🎥 Δημιουργία Βίντεο
          </button>
        </Link>
      </div>
    </main>
  );
}
