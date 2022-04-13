import { useState, useEffect } from "react";
import { windowExists } from "../lib/utils";

const useScrolled = (amount = 0) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const scrollStart = window.scrollY;
    console.log(scrollStart);

    function onScroll() {
      const delta = window.scrollY - scrollStart;
      console.log(delta);
      if (delta < amount) {
        // setScrolled(false);
      } else {
        setScrolled(true);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      if (windowExists) {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, []);

  return scrolled;
};

export default useScrolled;
