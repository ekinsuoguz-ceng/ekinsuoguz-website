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
  const [countryError, setCountryError] = useState("");
  const [placeError, setPlaceError] = useState("");
  const [countryImageError, setCountryImageError] = useState("");

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
    setCountryError("");
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
      setCountryError(error instanceof Error ? error.message : "Ülke eklenemedi.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleAddPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeCountryId) return;

    setPlaceError("");
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
      setPlaceError(error instanceof Error ? error.message : "Gezi noktası eklenemedi.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUpdateCountryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageCountryId || !existingCountryImageFile) return;

    setCountryImageError("");
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
      setCountryImageError(error instanceof Error ? error.message : "Ülke fotoğrafı güncellenemedi.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const selectedImageCountry = countries?.find((country) => country._id === imageCountryId);

  // 1. GİRİŞ FORMU (Şifre Onayı Bekleyen Ekran)
  if (!isAuthenticated) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f2e9] px-5 py-12">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#e8bd56]/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-[#9e4d2d]/10 blur-3xl" />
        <form
          onSubmit={handleLogin}
          className="relative w-full max-w-md rounded-[2rem] border border-[#e6e0d2] bg-[#fffdf8] p-8 shadow-[0_24px_80px_-36px_rgba(36,67,55,0.35)] sm:p-10"
        >
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#244337] font-serif text-xl font-bold text-[#f8edce]">
              E
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-[#244337]">Ekinsu Oğuz</p>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9e4d2d]">Yönetim alanı</p>
            </div>
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#9e4d2d]">Hoş geldin</p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#244337]">Panele giriş yap</h1>
          <p className="mt-3 text-sm leading-6 text-[#68756d]">
            İçeriklerini ve seyahat notlarını düzenlemek için yönetici şifreni gir.
          </p>
          <label htmlFor="admin-password" className="mt-8 block text-sm font-semibold text-[#34463b]">
            Yönetici şifresi
          </label>
          <input
            id="admin-password"
            type="password"
            placeholder="Şifreni yaz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-[#d9dfd6] bg-white px-4 py-3.5 text-[#24372d] outline-none transition placeholder:text-[#a2aaa3] focus:border-[#53745f] focus:ring-4 focus:ring-[#53745f]/10"
          />
          {error && (
            <p role="alert" className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#244337] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#244337]/15 transition hover:-translate-y-0.5 hover:bg-[#315644] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244337]"
          >
            Panele gir <span aria-hidden="true">→</span>
          </button>
        </form>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2e9] text-[#26382e] lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="bg-[#244337] px-5 py-6 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:px-6 lg:py-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8bd56] font-serif text-xl font-bold text-[#244337]">E</span>
          <span>
            <span className="block font-serif text-lg font-semibold">Ekinsu Oğuz</span>
            <span className="block text-xs tracking-wide text-[#c2d1c4]">İçerik yönetimi</span>
          </span>
        </a>
        <p className="mb-3 mt-9 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a9c0ae] lg:block">Çalışma alanı</p>
        <nav aria-label="Yönetim paneli bölümleri" className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:mt-0 lg:flex-col lg:overflow-visible">
          {[
            ["#blog", "Blog yazısı", "01"],
            ["#countries", "Yeni ülke", "02"],
            ["#country-photo", "Ülke fotoğrafı", "03"],
            ["#places", "Gezi noktası", "04"],
          ].map(([href, label, number]) => (
            <a
              key={href}
              href={href}
              className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#dce6dc] transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8bd56]"
            >
              <span className="font-mono text-[10px] text-[#e8bd56]">{number}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-auto hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 lg:block">
          <p className="text-xs font-medium text-[#c2d1c4]">Seyahat arşivi</p>
          <p className="mt-2 font-serif text-3xl text-white">{countries?.length ?? "—"}</p>
          <p className="mt-1 text-xs text-[#a9c0ae]">ülke kaydı</p>
        </div>
        <p className="mt-6 hidden text-[11px] text-[#a9c0ae] lg:block">Küçük notlar, güzel anılar.</p>
      </aside>

      <main id="top" className="min-w-0 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9e4d2d]">Yönetim paneli</p>
            <h1 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-[#244337] sm:text-3xl">İçeriklerini yönet</h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="rounded-xl border border-[#d8d8ca] bg-[#fffdf8] px-4 py-2.5 text-sm font-semibold text-[#526258] transition hover:border-[#b78d6c] hover:text-[#9e4d2d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244337]"
          >
            Çıkış yap
          </button>
        </header>

        <section className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-[1.75rem] bg-[#e8bd56] shadow-[0_20px_60px_-38px_rgba(36,67,55,0.55)]">
          <div className="relative px-6 py-7 sm:px-9 sm:py-9">
            <div className="absolute -right-8 -top-16 h-56 w-56 rounded-full border-[28px] border-[#244337]/[0.07]" />
            <div className="absolute -bottom-20 right-28 h-40 w-40 rounded-full bg-[#9e4d2d]/[0.08]" />
            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#244337]/10 px-3 py-1.5 text-xs font-semibold text-[#244337]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9e4d2d]" />
                Her şey hazır
              </span>
              <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight text-[#244337] sm:text-3xl">
                Hikâyelerini paylaşmaya devam et.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#435849]">
                Yeni yazılar ekle, ülkelerini güncelle ve gezilerinden güzel anıları arşivine kaydet.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-7 grid max-w-6xl grid-cols-1 gap-5">
          <section id="blog" className="scroll-mt-6 rounded-[1.5rem] border border-[#e5e0d4] bg-[#fffdf8] p-5 shadow-[0_12px_40px_-30px_rgba(36,67,55,0.35)] sm:p-7">
            <div className="mb-6 flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f2e9d3] font-serif text-lg text-[#9e4d2d]">01</span>
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#244337]">Yeni blog yazısı</h2>
                <p className="mt-1 text-sm text-[#778078]">Düşüncelerini ve hikâyelerini yayınla.</p>
              </div>
            </div>
            <form onSubmit={handleAddPost} className="space-y-4">
              <div>
                <label htmlFor="post-title" className="mb-1.5 block text-sm font-semibold text-[#405046]">Yazı başlığı</label>
                <input id="post-title" type="text" placeholder="Örn. Yolda öğrendiklerim" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} required className="w-full rounded-xl border border-[#d9dfd6] bg-white px-4 py-3 text-sm text-[#26382e] outline-none transition placeholder:text-[#a2aaa3] focus:border-[#53745f] focus:ring-4 focus:ring-[#53745f]/10" />
              </div>
              <div>
                <label htmlFor="post-content" className="mb-1.5 block text-sm font-semibold text-[#405046]">İçerik</label>
                <textarea id="post-content" placeholder="Yazını buraya ekle..." value={postContent} onChange={(e) => setPostContent(e.target.value)} required rows={5} className="w-full resize-y rounded-xl border border-[#d9dfd6] bg-white px-4 py-3 text-sm leading-6 text-[#26382e] outline-none transition placeholder:text-[#a2aaa3] focus:border-[#53745f] focus:ring-4 focus:ring-[#53745f]/10" />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#244337] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#315644] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244337]">
                Yazıyı kaydet <span aria-hidden="true">→</span>
              </button>
            </form>
          </section>

          <section id="countries" className="scroll-mt-6 rounded-[1.5rem] border border-[#e5e0d4] bg-[#fffdf8] p-5 shadow-[0_12px_40px_-30px_rgba(36,67,55,0.35)] sm:p-7">
            <div className="mb-6 flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8eee7] font-serif text-lg text-[#244337]">02</span>
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#244337]">Yeni ülke ekle</h2>
                <p className="mt-1 text-sm text-[#778078]">Seyahat arşivine yeni bir durak ekle.</p>
              </div>
            </div>
            <form onSubmit={handleAddCountry} className="space-y-4">
              <div>
                <label htmlFor="country-name" className="mb-1.5 block text-sm font-semibold text-[#405046]">Ülke adı</label>
                <input id="country-name" type="text" placeholder="Örn. İtalya" value={countryName} onChange={(e) => setCountryName(e.target.value)} required className="w-full rounded-xl border border-[#d9dfd6] bg-white px-4 py-3 text-sm text-[#26382e] outline-none transition placeholder:text-[#a2aaa3] focus:border-[#53745f] focus:ring-4 focus:ring-[#53745f]/10" />
              </div>
              <div>
                <label htmlFor="country-description" className="mb-1.5 block text-sm font-semibold text-[#405046]">Kısa açıklama</label>
                <textarea id="country-description" placeholder="Bu yolculuğu özel yapan neydi?" value={countryDescription} onChange={(e) => setCountryDescription(e.target.value)} required rows={3} className="w-full resize-y rounded-xl border border-[#d9dfd6] bg-white px-4 py-3 text-sm leading-6 text-[#26382e] outline-none transition placeholder:text-[#a2aaa3] focus:border-[#53745f] focus:ring-4 focus:ring-[#53745f]/10" />
              </div>
              <div>
                <label htmlFor="country-image" className="mb-1.5 block text-sm font-semibold text-[#405046]">Kapak fotoğrafı <span className="font-normal text-[#899189]">(isteğe bağlı)</span></label>
                <input id="country-image" type="file" accept="image/*" onChange={(e) => setCountryImageFile(e.target.files?.[0] ?? null)} className="w-full rounded-xl border border-dashed border-[#cbd4c9] bg-[#f8f8f2] p-2 text-sm text-[#526258] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e8eee7] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#244337] hover:file:bg-[#dce7dc]" />
                <p className="mt-1.5 text-xs text-[#899189]">{countryImageFile ? `${countryImageFile.name} · ${(countryImageFile.size / (1024 * 1024)).toFixed(1)} MB` : "Görsel dosyası, en fazla 10 MB."}</p>
              </div>
              {countryError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{countryError}</p>}
              <button type="submit" disabled={isUploadingImage} className="inline-flex items-center gap-2 rounded-xl bg-[#244337] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#315644] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244337]">
                {isUploadingImage ? "Kaydediliyor..." : "Ülkeyi kaydet"}
              </button>
            </form>
          </section>

          <section id="country-photo" className="scroll-mt-6 rounded-[1.5rem] border border-[#e5e0d4] bg-[#fffdf8] p-5 shadow-[0_12px_40px_-30px_rgba(36,67,55,0.35)] sm:p-7">
            <div className="mb-6 flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f5e5db] font-serif text-lg text-[#9e4d2d]">03</span>
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#244337]">Ülke fotoğrafını değiştir</h2>
                <p className="mt-1 text-sm text-[#778078]">Bir ülkenin mevcut kapak görselini güncelle.</p>
              </div>
            </div>
            <form onSubmit={handleUpdateCountryImage} className="space-y-4">
              <div>
                <label htmlFor="image-country" className="mb-1.5 block text-sm font-semibold text-[#405046]">Ülke seç</label>
                <select id="image-country" value={imageCountryId} onChange={(e) => setImageCountryId(e.target.value as Id<"travelCountries"> | "")} required className="w-full rounded-xl border border-[#d9dfd6] bg-white px-4 py-3 text-sm text-[#26382e] outline-none transition focus:border-[#53745f] focus:ring-4 focus:ring-[#53745f]/10">
                  <option value="">Fotoğrafını güncellemek istediğin ülke</option>
                  {countries?.map((country) => <option key={country._id} value={country._id}>{country.name}</option>)}
                </select>
              </div>
              {selectedImageCountry?.resolvedImageUrl && (
                <div className="flex items-center gap-3 rounded-xl bg-[#f5f2e9] p-3">
                  <img src={selectedImageCountry.resolvedImageUrl} alt="" className="h-14 w-14 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#899189]">Mevcut kapak görseli</p>
                    <p className="mt-1 text-sm font-medium text-[#405046]">{selectedImageCountry.name}</p>
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="existing-country-image" className="mb-1.5 block text-sm font-semibold text-[#405046]">Yeni fotoğraf</label>
                <input id="existing-country-image" type="file" accept="image/*" onChange={(e) => setExistingCountryImageFile(e.target.files?.[0] ?? null)} required className="w-full rounded-xl border border-dashed border-[#cbd4c9] bg-[#f8f8f2] p-2 text-sm text-[#526258] file:mr-3 file:rounded-lg file:border-0 file:bg-[#f5e5db] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#9e4d2d] hover:file:bg-[#efdbcd]" />
                <p className="mt-1.5 text-xs text-[#899189]">{existingCountryImageFile ? `${existingCountryImageFile.name} · ${(existingCountryImageFile.size / (1024 * 1024)).toFixed(1)} MB` : "Görsel dosyası, en fazla 10 MB."}</p>
              </div>
              {countryImageError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{countryImageError}</p>}
              {!countries?.length && <p className="rounded-xl bg-[#f5f2e9] px-4 py-3 text-sm text-[#68756d]">{countries ? "Önce bir ülke eklemelisin." : "Ülkeler yükleniyor..."}</p>}
              <button type="submit" disabled={!countries?.length || isUploadingImage} className="inline-flex items-center gap-2 rounded-xl bg-[#9e4d2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#863f25] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9e4d2d]">
                {isUploadingImage ? "Fotoğraf yükleniyor..." : "Fotoğrafı güncelle"}
              </button>
            </form>
          </section>

          <section id="places" className="scroll-mt-6 rounded-[1.5rem] border border-[#e5e0d4] bg-[#fffdf8] p-5 shadow-[0_12px_40px_-30px_rgba(36,67,55,0.35)] sm:p-7">
            <div className="mb-6 flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8eee7] font-serif text-lg text-[#244337]">04</span>
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#244337]">Gezi noktası ekle</h2>
                <p className="mt-1 text-sm text-[#778078]">Bir ülkenin içindeki özel bir yeri kaydet.</p>
              </div>
            </div>
            <form onSubmit={handleAddPlace} className="space-y-4">
              <div>
                <label htmlFor="place-country" className="mb-1.5 block text-sm font-semibold text-[#405046]">Bağlı olduğu ülke</label>
                <select id="place-country" value={placeCountryId} onChange={(e) => setPlaceCountryId(e.target.value as Id<"travelCountries"> | "")} required className="w-full rounded-xl border border-[#d9dfd6] bg-white px-4 py-3 text-sm text-[#26382e] outline-none transition focus:border-[#53745f] focus:ring-4 focus:ring-[#53745f]/10">
                  <option value="">Bir ülke seç</option>
                  {countries?.map((country) => <option key={country._id} value={country._id}>{country.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="place-title" className="mb-1.5 block text-sm font-semibold text-[#405046]">Yer adı</label>
                <input id="place-title" type="text" placeholder="Örn. Kolezyum" value={placeTitle} onChange={(e) => setPlaceTitle(e.target.value)} required className="w-full rounded-xl border border-[#d9dfd6] bg-white px-4 py-3 text-sm text-[#26382e] outline-none transition placeholder:text-[#a2aaa3] focus:border-[#53745f] focus:ring-4 focus:ring-[#53745f]/10" />
              </div>
              <div>
                <label htmlFor="place-content" className="mb-1.5 block text-sm font-semibold text-[#405046]">Gezi notu</label>
                <textarea id="place-content" placeholder="Bu yerle ilgili anını veya notunu yaz..." value={placeContent} onChange={(e) => setPlaceContent(e.target.value)} required rows={4} className="w-full resize-y rounded-xl border border-[#d9dfd6] bg-white px-4 py-3 text-sm leading-6 text-[#26382e] outline-none transition placeholder:text-[#a2aaa3] focus:border-[#53745f] focus:ring-4 focus:ring-[#53745f]/10" />
              </div>
              <div>
                <label htmlFor="place-image" className="mb-1.5 block text-sm font-semibold text-[#405046]">Kapak fotoğrafı <span className="font-normal text-[#899189]">(isteğe bağlı)</span></label>
                <input id="place-image" type="file" accept="image/*" onChange={(e) => setPlaceImageFile(e.target.files?.[0] ?? null)} className="w-full rounded-xl border border-dashed border-[#cbd4c9] bg-[#f8f8f2] p-2 text-sm text-[#526258] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e8eee7] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#244337] hover:file:bg-[#dce7dc]" />
                <p className="mt-1.5 text-xs text-[#899189]">{placeImageFile ? `${placeImageFile.name} · ${(placeImageFile.size / (1024 * 1024)).toFixed(1)} MB` : "Görsel dosyası, en fazla 10 MB."}</p>
              </div>
              {placeError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{placeError}</p>}
              <button type="submit" disabled={!countries?.length || isUploadingImage} className="inline-flex items-center gap-2 rounded-xl bg-[#244337] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#315644] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244337]">
                {isUploadingImage ? "Kaydediliyor..." : "Gezi noktasını kaydet"}
              </button>
            </form>
          </section>
        </div>
        <footer className="mx-auto max-w-6xl py-8 text-center text-xs text-[#899189]">
          İçeriklerin kaydedildikçe sitende görünür.
        </footer>
      </main>
    </div>
  );
}