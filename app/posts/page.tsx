"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "../header";

export default function PostsPage() {
  const posts = useQuery(api.posts.getPosts);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <section id="posts" className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">
            Blog & Yazılar
          </h3>
          {!posts ? (
            <p className="text-slate-500">Yükleniyor...</p>
          ) : posts.length === 0 ? (
            <p className="text-slate-400 text-sm">Henüz paylaşılan bir yazı yok.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <article key={post._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <h4 className="font-semibold text-xl text-slate-900">{post.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{post.content}</p>
                  <p className="text-slate-400 text-xs pt-2">
                    {new Date(post._creationTime).toLocaleDateString("tr-TR")}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
