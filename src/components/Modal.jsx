"use client"

import { IoClose } from "react-icons/io5"

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <IoClose size={24} />
        </button>
        {children}
      </div>
    </div>
  )
}
