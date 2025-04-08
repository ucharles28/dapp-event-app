// 'use client";'
import Image from "next/image";
import { Hero } from "./components/Hero";

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col">

      <Hero />
      {/* {events.length > 0 ? (
        <EventList events={collection} />
      ) : (
        <p className="text-center text-white mt-10">No events available.</p>
      )}

      <div className="mt-10 h-20 "></div>

      {collection.length > 0 && events.length > collection.length && (
        <div className="w-full flex justify-center items-center">
          <button
            className="px-6 py-3 rounded-lg text-sm font-medium text-white  bg-indigo-600 hover:bg-indigo-700  duration-300 transition-all"
            onClick={() => setEnd(end + count)}
          >
            Load More
          </button>
        </div>
      )} */}
    </div>
  );
}
