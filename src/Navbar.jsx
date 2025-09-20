import { useEffect, useState } from "react";

function Navbar() {
  const [time, setTime] = useState("");
  const [show, setShow] = useState(true);

  // 🕒 Clock Effect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Manila",
      };
      const formatted = now.toLocaleTimeString("en-US", options);
      setTime(`PHT ${formatted}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className={`w-full flex justify-between items-center px-6 py-3 border-b border-gray-300 bg-[#f6f3f9] fixed top-0 left-0 z-50
        transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <span className="text-sm font-semibold text-gray-800">NS</span>

      <span className="text-gray-700 text-sm">{time}</span>

      <a
        href="Shillingford - CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-gray-800 hover:underline"
      >
        CV
      </a>
    </nav>
  );
}

export default Navbar;
