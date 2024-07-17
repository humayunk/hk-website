"use client";

export default function Button() {
  const openLink = () => {
    window.open('https://savvycal.com/khanhumayun/12a708c5', '_blank');
  };

  return (
    <div>
      <button
        onClick={openLink}
        className="bg-violet-500 shadow-solid-s px-8 py-4 text-white font-mono transition duration-300 ease-in-out hover:shadow-solid-l rounded-full"
      >
        Book a chat
      </button>
    </div>
  );
}
