"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import Header from "../header";
import Footer from "../footer";

export default function TravelsPage() {
  const countries = useQuery(api.travel.getCountries);
  const [selectedCountryId, setSelectedCountryId] = useState<Id<"travelCountries"> | null>(null);
  const selectedCountry = countries?.find((country) => country._id === selectedCountryId);
  const places = useQuery(
    api.travel.getPlacesByCountry,
    selectedCountryId ? { countryId: selectedCountryId } : "skip",
  );

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#D2A844] via-[#E8BD56] to-[#F8F1DF]">
      <Header />

      <div className="max-w-4xl mx-auto w-full flex-1 px-6 py-12">
        <section id="travel" className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">
            Places I&apos;ve Been
          </h3>
          {selectedCountryId && selectedCountry ? (
            <div className="space-y-6">
              <button
                type="button"
                onClick={() => setSelectedCountryId(null)}
                className="text-sm font-medium text-[#244337] transition hover:text-[#9E4D2D]"
              >
                &larr; All Countries
              </button>
              <div>
                <h4 className="font-serif text-3xl text-[#244337]">
                  {selectedCountry.name}
                </h4>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">
                  {selectedCountry.description}
                </p>
              </div>
              {!places ? (
                <p className="text-slate-600">Places are loading...</p>
              ) : places.length === 0 ? (
                <p className="text-slate-600">No travel spots have been added to this country yet.</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {places.map((place) => {
                    const imageUrl =
                      place.resolvedCoverImageUrl ??
                      place.photoUrls.find((url): url is string => Boolean(url));

                    return (
                      <article
                        key={place._id}
                        className="overflow-hidden rounded-xl border border-[#D7C79D] bg-[#FFF9EC] shadow-sm"
                      >
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt={place.title}
                            className="h-48 w-full object-cover"
                          />
                        )}
                        <div className="space-y-2 p-5">
                          <h5 className="font-semibold text-slate-900">{place.title}</h5>
                          <p className="text-sm leading-relaxed text-slate-600">
                            {place.content}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          ) : !countries ? (
            <p className="text-slate-500">Loading...</p>
          ) : countries.length === 0 ? (
            <p className="text-slate-600 text-sm">
              No countries have been added yet. You can add country cards from the admin panel.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {countries.map((country) => (
                <button
                  key={country._id}
                  type="button"
                  onClick={() => setSelectedCountryId(country._id)}
                  className="group overflow-hidden rounded-xl border border-[#D7C79D] bg-[#FFF9EC] text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244337]"
                >
                  {country.resolvedImageUrl && (
                    <img
                      src={country.resolvedImageUrl}
                      alt=""
                      className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                  )}
                  <div className="space-y-2 p-5">
                    <h4 className="font-serif text-xl text-[#244337]">{country.name}</h4>
                    <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {country.description}
                    </p>
                    <span className="inline-block pt-2 text-xs font-semibold uppercase tracking-wide text-[#9E4D2D]">
                      Explore &rarr;
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}
