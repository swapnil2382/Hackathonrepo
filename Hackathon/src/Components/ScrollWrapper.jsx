import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

const ScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null);
  let scroll = null;

  useEffect(() => {
    scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    const updateScroll = () => {
      if (scroll) {
        scroll.update();
      }
    };
    window.addEventListener("resize", updateScroll);

    return () => {
      if (scroll) scroll.destroy();
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="flex flex-col min-h-screen"
    >
      {children}
    </div>
  );
};

export default ScrollWrapper;
