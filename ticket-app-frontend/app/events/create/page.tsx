'use client';
import { pinata } from '@/app/lib/utils';
import { CreateEventParams } from '@/utils/type.dt'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { contractAddress, abi } from '@/app/lib/contract'
import { parseEther } from 'viem'

const CreateEventPage = () => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const [event, setEvent] = useState<CreateEventParams>({
    name: '',
    location: '',
    description: '',
    ticketPrice: 0,
    eventArt: '',
    thumbnail: '',
    eventDate: '',
    totalTickets: 0
  })
  const [thumbnailBase64, setThumbnailBase64] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState<File | null>()
  const [eventArtFile, setEventArtFile] = useState<File | null>()
  // const [setIsLoading, setIsLoading] = useState<boolean>(false)
  

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess) {
      // setIsLoading(false)
      // success notif
      alert("Transaction successfully")
      return
    }
  }, [isSuccess])

  useEffect(() => {
    console.log('Hash', hash)
  }, [hash])

  useEffect(() => {
    if (error) {
      // setIsLoading(false)
      // success notif
      // alert("Transaction successfully")
      return
    }
  }, [error])


  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (e.target instanceof HTMLInputElement && e.target.files) {
      if (name === 'thumbnail') {
        toBase64(e.target.files[0])
        setThumbnailFile(e.target.files[0])
      } else {
        setEventArtFile(e.target.files[0])
      }
      return
    }
    setEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function toBase64(file: File) {
    setThumbnailFile(file)
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setThumbnailBase64(String(reader.result));
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  async function uploadToIPFS(file: File) {
    if (!file) return;

    const upload = await pinata.upload.file(file)
    const url = await pinata.gateways.convert(upload.IpfsHash)

    return url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('event', event)
    if (!address && openConnectModal) {
      openConnectModal()
    }
    // setIsLoading(true)
    const thumbnailUrl = await uploadToIPFS(thumbnailFile as file)
    const eventArtUrl = await uploadToIPFS(eventArtFile as File)

    await writeContract({
      abi,
      address: contractAddress,
      functionName: 'createEvent',
      args: [
        event.name,
        event.description,
        event.location,
        String(eventArtUrl),
        String(thumbnailUrl),
        parseEther(String(event.ticketPrice)),
        BigInt(event.totalTickets),
        BigInt(Math.floor(new Date(event.eventDate).getTime() / 1000))
      ],
    })

    console.log('Hash', hash)
  }


  const inputClasses =
    'mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out'

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-gray-900 to-black text-gray-300">

      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-center text-white mb-8">Create New Event</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-xl"
        >
          {thumbnailBase64 && (
            <div className="flex justify-center mb-6">
              <img
                src={thumbnailBase64}
                alt="thumbnail"
                className="h-48 w-full object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                Event Title
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={inputClasses}
                placeholder="Enter event title"
                value={event.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className={inputClasses}
                placeholder="Abuja, Nigeria"
                value={event.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-400 mb-1">
                  Thumbnail
                </label>
                <input id="thumnail"
                  name="thumbnail"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" />
                {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> */}
              </div>

              <div>
                <label htmlFor="eventArt" className="block text-sm font-medium text-gray-400 mb-1">
                  Event Art
                </label>
                <input
                  id="eventArt"
                  name="eventArt"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" />
                {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> */}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="totalTickets" className="block text-sm font-medium text-gray-400 mb-1">
                  Total Tickets
                </label>
                <input
                  type="number"
                  name="totalTickets"
                  id="totalTickets"
                  min={1}
                  className={inputClasses}
                  placeholder="Enter total tickets"
                  value={event.totalTickets}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="ticketPrice"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Ticket Cost (ETH)
                </label>
                <input
                  type="number"
                  name="ticketPrice"
                  id="ticketPrice"
                  step="0.001"
                  min="0.001"
                  className={inputClasses}
                  placeholder="0.1"
                  value={event.ticketPrice}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2"> */}
            <div>
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-400 mb-1">
                  Event Date
                </label>
                <input
                  type="datetime-local"
                  name="eventDate"
                  id="eventDate"
                  className={inputClasses}
                  value={event.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* <div>
                <label htmlFor="endsAt" className="block text-sm font-medium text-gray-400 mb-1">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  name="endsAt"
                  id="endsAt"
                  className={inputClasses}
                  // value={event.endsAt}
                  // onChange={handleChange}
                  required
                />
              </div> */}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                {hash}
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                className={inputClasses}
                placeholder="Describe your event"
                value={event.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-150 ease-in-out"
            >
              Create Event
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default CreateEventPage;
