    
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (data.success) setResult(data.result);
    else setResult("حدث خطأ، حاول مرة أخرى");
  };

  return (
    <main className="min-h-screen p-6 text-right">
      <h1 className="text-4xl font-bold mb-6 border-2 border-blue-500 p-2 rounded flex items-center justify-end gap-2">
        Prof Dali Nadjib
      </h1>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2">
        <textarea
          className="p-2 rounded bg-gray-800 text-white"
          placeholder="اكتب طلبك هنا..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition"
        >
          أرسل
        </button>
      </form>

      {result && (
        <div className="bg-gray-900 p-4 rounded shadow text-white">
          {result}
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
        <div className="bg-gray-800 p-4 rounded-lg shadow flex flex-col items-end">
          <span className="text-4xl">📚</span>
          <p className="mt-2 font-semibold">الدروس</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow flex flex-col items-end">
          <span className="text-4xl">📝</span>
          <p className="mt-2 font-semibold">الاختبارات</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow flex flex-col items-end">
          <span className="text-4xl">📁</span>
          <p className="mt-2 font-semibold">المراجعات</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow flex flex-col items-end">
          <span className="text-4xl">💡</span>
          <p className="mt-2 font-semibold">أفكار وملاحظات</p>
        </div>
      </div>
    </main>
  );
}

