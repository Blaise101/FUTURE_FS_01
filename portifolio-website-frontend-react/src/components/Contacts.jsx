export default function Contacts() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data.message);
  };

  return (
    <section
      className="py-24"
      id="contact"
    >
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
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow focus:outline-none focus:ring-2 focus:ring-lime-500"
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
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow focus:outline-none focus:ring-2 focus:ring-lime-500"
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
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow focus:outline-none focus:ring-2 focus:ring-lime-500"
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
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow focus:outline-none focus:ring-2 focus:ring-lime-500"
              name="message"
              placeholder="Message..."
              required
              rows="5"
            ></textarea>
          </div>
          <div className="pt-4 text-center">
            <button
              className="lime-glow lime-glow-hover w-full transform rounded-lg bg-lime-500 px-8 py-3 text-lg font-bold text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-lime-400"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
