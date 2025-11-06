import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "About Me",
    content: (
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold">Ruel F. Machete</h2>
        <p>
          Driven and detail-oriented 4th year BS Information Technology student
          with a solid foundation in communication, leadership, and teamwork.
        </p>
        <p>
          Skilled in financial management, strategic thinking, and digital tools.
          Actively engaged in academic and organizational activities, with a strong
          passion for continuous improvement and professional growth.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: "Education",
    content: (
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold">Education</h2>
        <p>
          <strong>La Consolacion University Philippines</strong> <br />
          Bachelor of Science in Information Technology <br />
          2022 – Present
        </p>
        <p>
          <strong>ABE International Business College – Malolos</strong> <br />
          Senior High School, 2021–2022
        </p>
        <p>
          <strong>Dampol 1 National High School</strong> <br />
          Junior High School, 2016–2020
        </p>
        <p>
          <strong>Dampol Elementary School</strong> <br />
          Primary Education, 2009–2016
        </p>
      </div>
    ),
  },
];

const SlideSection = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden bg-gray-900 text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute w-3/4 max-w-2xl text-center"
        >
          {slides[index].content}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 flex justify-center gap-4">
        <Button onClick={prevSlide} variant="outline">Previous</Button>
        <Button onClick={nextSlide} variant="default">Next</Button>
      </div>
    </div>
  );
};

export default SlideSection;
