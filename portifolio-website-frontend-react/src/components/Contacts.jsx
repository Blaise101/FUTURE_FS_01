import { useState } from "react";
import Toast from "./partials/Toast";

export default function Contacts() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    try {
      const res = await fetch(
        "https://future-fs-01-ebrq.onrender.com/api/contact",
        // "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send");
      }

      showToast("Message sent successfully ✅", "success");
      e.target.reset();
    } catch (err) {
      console.error(err);
      showToast(err.message || "Something went wrong ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-24"
      id="contact"
    >
      <Toast
        message={toast.message}
        type={toast.type}
      />

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">Get In Touch</h2>

        <p className="mb-10 text-lg text-gray-400">
          Get in touch with me for more information about me or leave any
          testimonial you need to give about me.
        </p>

        <form
          className="space-y-6 text-left"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row w-full gap-6">
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow form-item focus:outline-none focus:ring-2 focus:ring-lime-500"
                name="name"
                required
                placeholder="Full Name..."
                type="text"
              />
            </div>
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow form-item focus:outline-none focus:ring-2 focus:ring-lime-500"
                name="email"
                required
                placeholder="Email..."
                type="email"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Subject
            </label>
            <input
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow form-item focus:outline-none focus:ring-2 focus:ring-lime-500"
              placeholder="Subject..."
              name="subject"
              type="text"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow form-item focus:outline-none focus:ring-2 focus:ring-lime-500"
              name="message"
              placeholder="Message..."
              required
              rows="5"
            ></textarea>
          </div>
          <div className="pt-4 text-center">
            <button
              id="submitBtn"
              disabled={loading}
              type="submit"
              className="flex items-center justify-center gap-2   disabled:opacity-60 disabled:cursor-not-allowed lime-glow lime-glow-hover w-full transform rounded-lg bg-lime-500 px-8 py-3 text-lg font-bold text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-lime-400"
            >
              {loading && (
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}

              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
