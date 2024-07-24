"use client";

export default function Button() {
  const openLink = () => {
    window.open('https://savvycal.com/khanhumayun/12a708c5', '_blank');
  };

  return (
    <div>
      <button
        onClick={openLink}
        className="bg-black  px-8 py-4 text-white font-mono rounded-xl"
      >
        Book a chat
      </button>
    </div>
  );
}
