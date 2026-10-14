"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { verifyAdminPassword } from "./actions";

async function uploadImage(file: File, uploadUrl: string): Promise<Id<"_storage">> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Lütfen bir görsel dosyası seç.");
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Görsel dosyası 10 MB'dan küçük olmalı.");
  }

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!response.ok) {
    throw new Error("Görsel Convex'e yüklenemedi.");
  }

  const result = (await response.json()) as { storageId: Id<"_storage"> };
  return result.storageId;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Convex Ekleme Fonksiyonları
  const createPost = useMutation(api.posts.createPost);
  const createEducation = useMutation(api.educations.createEducation);
  const createExperience = useMutation(api.experiences.createExperience);
  const createCountry = useMutation(api.travel.createCountry);
  const updateCountryImage = useMutation(api.travel.updateCountryImage);
  const createTravelPlace = useMutation(api.travel.createTravelPlace);
  const generateUploadUrl = useMutation(api.travel.generateUploadUrl);
  const countries = useQuery(api.travel.getCountries);

  // Form Statedir
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryDescription, setCountryDescription] = useState("");
  const [countryImageFile, setCountryImageFile] = useState<File | null>(null);
  const [imageCountryId, setImageCountryId] = useState<Id<"travelCountries"> | "">("");
  const [existingCountryImageFile, setExistingCountryImageFile] = useState<File | null>(null);
  const [placeCountryId, setPlaceCountryId] = useState<Id<"travelCountries"> | "">("");
  const [placeTitle, setPlaceTitle] = useState("");
  const [placeContent, setPlaceContent] = useState("");
  const [placeImageFile, setPlaceImageFile] = useState<File | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");

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

  const handleAddCountry = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError("");
    setIsUploadingImage(true);
    try {
      const imageStorageId = countryImageFile
        ? await uploadImage(countryImageFile, await generateUploadUrl())
        : undefined;
      const countryId = await createCountry({
        name: countryName,
        description: countryDescription,
        ...(imageStorageId ? { imageStorageId } : {}),
        sortOrder: Date.now(),
      });
      setCountryName("");
      setCountryDescription("");
      setCountryImageFile(null);
      setPlaceCountryId(countryId);
      alert("Ülke başarıyla eklendi!");
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Ülke eklenemedi.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleAddPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeCountryId) return;

    setUploadError("");
    setIsUploadingImage(true);
    try {
      const coverImageStorageId = placeImageFile
        ? await uploadImage(placeImageFile, await generateUploadUrl())
        : undefined;
      await createTravelPlace({
        countryId: placeCountryId,
        title: placeTitle,
        content: placeContent,
        ...(coverImageStorageId ? { coverImageStorageId } : {}),
      });
      setPlaceTitle("");
      setPlaceContent("");
      setPlaceImageFile(null);
      alert("Gezi noktası başarıyla eklendi!");
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Gezi noktası eklenemedi.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUpdateCountryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageCountryId || !existingCountryImageFile) return;

    setUploadError("");
    setIsUploadingImage(true);
    try {
      const imageStorageId = await uploadImage(
        existingCountryImageFile,
        await generateUploadUrl(),
      );
      await updateCountryImage({ countryId: imageCountryId, imageStorageId });
      setExistingCountryImageFile(null);
      alert("Ülke fotoğrafı güncellendi!");
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Ülke fotoğrafı güncellenemedi.");
    } finally {
      setIsUploadingImage(false);
    }
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

      <section className="bg-white p-6 border rounded-xl shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Yeni Ülke Ekle</h2>
        <form onSubmit={handleAddCountry} className="space-y-4">
          <input
            type="text"
            placeholder="Ülke adı"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            required
            className="w-full border p-2 rounded text-slate-800"
          />
          <textarea
            placeholder="Ülke açıklaması"
            value={countryDescription}
            onChange={(e) => setCountryDescription(e.target.value)}
            required
            rows={3}
            className="w-full border p-2 rounded text-slate-800"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCountryImageFile(e.target.files?.[0] ?? null)}
            className="w-full border p-2 rounded text-slate-800"
          />
          {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
          <button type="submit" disabled={isUploadingImage} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {isUploadingImage ? "Yükleniyor..." : "Ülkeyi Kaydet"}
          </button>
        </form>
      </section>

      <section className="bg-white p-6 border rounded-xl shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Mevcut Ülkeye Fotoğraf Ekle</h2>
        <form onSubmit={handleUpdateCountryImage} className="space-y-4">
          <select
            value={imageCountryId}
            onChange={(e) => setImageCountryId(e.target.value as Id<"travelCountries"> | "")}
            required
            className="w-full border p-2 rounded text-slate-800"
          >
            <option value="">Ülke seç</option>
            {countries?.map((country) => (
              <option key={country._id} value={country._id}>{country.name}</option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setExistingCountryImageFile(e.target.files?.[0] ?? null)}
            required
            className="w-full border p-2 rounded text-slate-800"
          />
          {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
          <button
            type="submit"
            disabled={!countries?.length || isUploadingImage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploadingImage ? "Yükleniyor..." : "Fotoğrafı Yükle"}
          </button>
        </form>
      </section>

      <section className="bg-white p-6 border rounded-xl shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Ülkeye Gezi Noktası Ekle</h2>
        <form onSubmit={handleAddPlace} className="space-y-4">
          <select
            value={placeCountryId}
            onChange={(e) => setPlaceCountryId(e.target.value as Id<"travelCountries"> | "")}
            required
            className="w-full border p-2 rounded text-slate-800"
          >
            <option value="">Ülke seç</option>
            {countries?.map((country) => (
              <option key={country._id} value={country._id}>{country.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Yer adı, ör. Kolezyum"
            value={placeTitle}
            onChange={(e) => setPlaceTitle(e.target.value)}
            required
            className="w-full border p-2 rounded text-slate-800"
          />
          <textarea
            placeholder="Gezi notu"
            value={placeContent}
            onChange={(e) => setPlaceContent(e.target.value)}
            required
            rows={4}
            className="w-full border p-2 rounded text-slate-800"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPlaceImageFile(e.target.files?.[0] ?? null)}
            className="w-full border p-2 rounded text-slate-800"
          />
          {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
          <button
            type="submit"
            disabled={!countries?.length || isUploadingImage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploadingImage ? "Yükleniyor..." : "Gezi Noktasını Kaydet"}
          </button>
        </form>
      </section>
    </div>
  );
}