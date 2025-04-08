'use client';
import Image from "next/image";
import { Hero } from "./components/Hero";
import { useReadContract } from "wagmi";
import { contractAddress, abi } from "./lib/contract";
import { config } from '@/app/lib/wagmi';
import { useEffect, useState } from "react";
import { EventStruct } from "@/utils/type.dt";
import { readContract } from "wagmi/actions";

export default function Home() {
  const { data, isPending } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getEvents',
    config
  })

  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    if (data) {
      console.log('data', data)
      setEvents(data as any[])
    }
  }, [data])
  
  // useEffect(() => {
  //   async function load() {
  //     const result = await readContract(config, {
  //         abi,
  //         address: contractAddress,
  //         functionName: 'getEvent',
  //         args: [BigInt(1)],
  //     })

  //     // setEvents(result as any[])
  //     console.log(result as any)
  // }
  //   load()
  // }, [])

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
