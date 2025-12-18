import React, { useState, useEffect } from "react";
import { Link, scroller, Events, scrollSpy } from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
  const [active, setActive] = useState("hero");

  // ADDED "certificates" to the array
  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "contact", label: "Contact" },
  ];
  
  useEffect(() => {
    const lastSection = localStorage.getItem("activeSection");
    if (lastSection) {
      setActive(lastSection);
      setTimeout(() => {
        scroller.scrollTo(lastSection, {
          duration: 600,
          smooth: "easeInOutQuart",
          offset: -90, 
        });
      }, 200);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeSection", active);
  }, [active]);

  useEffect(() => {
    Events.scrollEvent.register("begin", () => {});
    Events.scrollEvent.register("end", () => {});
    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <ul className="nav-links">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                to={section.id}
                spy={true}
                smooth={true}
                offset={-90} 
                duration={600}
                className={active === section.id ? "active" : ""}
                onSetActive={(id) => setActive(id)}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;