import { useState } from "react";

export default function Home() {
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("ar"); // ar / fr / en
  const [result, setResult] = useState("");

  const generateContent = async () => {
    if (!level || !subject || !type) {
      alert("يرجى اختيار كل الخيارات أولاً!");
      return;
    }
    setResult("جاري التوليد...");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, subject, type, language }),
      });
      const data = await response.json();
      setResult(data.result || "لم يتم الحصول على أي نتيجة.");
    } catch (error) {
      setResult("حدث خطأ في الاتصال بالذكاء الاصطناعي.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* رأس التطبيق */}
      <div className="header">
        {/* لاحقًا يمكن وضع صورتك هنا */}
        <img src="https://via.placeholder.com/50" alt="Prof Dali" />
        <h1>prof - dali nadjib</h1>
      </div>

      {/* اختيار الطور */}
      <div className="select-box">
        <label>اختر الطور:</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">-- اختر الطور --</option>
          <option value="primaire">ابتدائي</option>
          <option value="college">متوسط</option>
          <option value="lycee">ثانوي</option>
        </select>
      </div>

      {/* اختيار المادة */}
      <div className="select-box">
        <label>اختر المادة:</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">-- اختر المادة --</option>
          <option value="math">رياضيات</option>
          <option value="francais">فرنسية</option>
          <option value="anglais">إنجليزية</option>
          <option value="science">علوم</option>
        </select>
      </div>

      {/* اختيار نوع المستند */}
      <div className="select-box">
        <label>اختر نوع المستند:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">-- اختر النوع --</option>
          <option value="memoire">مذكرة</option>
          <option value="test">فرض</option>
          <option value="exam">اختبار</option>
        </select>
      </div>

      {/* اختيار اللغة */}
      <div className="select-box">
        <label>اختر اللغة:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="ar">العربية</option>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* زر التوليد */}
      <button onClick={generateContent}>إنشاء / توليد</button>

      {/* عرض النتيجة */}
      <div id="result">{result}</div>
    </div>
  );
}
