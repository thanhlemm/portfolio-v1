"use client";
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

const Toolbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
      {/* Back to Top Button */}
      {isVisible && (
        <Button
          onClick={scrollToTop}
          aria-label="Back to top"
          variant="outline"
          size="icon"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default Toolbar;
