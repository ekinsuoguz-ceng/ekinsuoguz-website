"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { verifyAdminPassword } from "./actions";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Convex Ekleme Fonksiyonları
  const createPost = useMutation(api.posts.createPost);
  const createEducation = useMutation(api.educations.createEducation);
  const createExperience = useMutation(api.experiences.createExperience);

  // Form Statedir
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  // Şifre Doğrulama (Backend Check)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const isValid = await verifyAdminPassword(password);

    if (isValid) {
      setIsAuthenticated(true);
    } else {
      setError("Hatalı şifre!");
    }
  };

  // Blog Yazısı Ekleme
  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({ title: postTitle, content: postContent });
    setPostTitle("");
    setPostContent("");
    alert("Yazı başarıyla eklendi!");
  };

  // 1. GİRİŞ FORMU (Şifre Onayı Bekleyen Ekran)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md space-y-4 w-full max-w-sm">
          <h2 className="text-xl font-bold text-slate-900">Admin Girişi</h2>
          <div>
            <input
              type="password"
              placeholder="Gizli Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded mt-1 text-slate-800"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition">
            Giriş Yap
          </button>
        </form>
      </div>
    );
  }

  // 2. YÖNETİM PANELİ EKRANI (Doğrulandıktan Sonra)
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-12">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Yönetim Paneli</h1>
        <button onClick={() => setIsAuthenticated(false)} className="text-sm text-red-600 underline">
          Çıkış Yap
        </button>
      </div>

      {/* Blog Yazısı Ekleme Formu */}
      <section className="bg-white p-6 border rounded-xl shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Yeni Blog Yazısı Ekle</h2>
        <form onSubmit={handleAddPost} className="space-y-4">
          <input
            type="text"
            placeholder="Yazı Başlığı"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
            className="w-full border p-2 rounded text-slate-800"
          />
          <textarea
            placeholder="Yazı İçeriği"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            required
            rows={4}
            className="w-full border p-2 rounded text-slate-800"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Kaydet
          </button>
        </form>
      </section>
    </div>
  );
}