import { useEffect } from "react";

const useStickyElement = (
  element,
  offsetTop = 0,
  stickyClassName = "main-window__list-item--sticky"
) => {
  const getPosition = (element) => {
    let xPosition = 0;
    let yPosition = 0;

    while (element) {
      xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
      yPosition += element.offsetTop - element.scrollTop + element.clientTop;
      element = element.offsetParent;
    }

    return { x: xPosition + offsetTop, y: yPosition };
  };

  useEffect(() => {
    if (!element) return;
    const { x: offset } = getPosition(element);
    const scrollCallBack = window.addEventListener("scroll", () => {
      const headerHeight =
        document.getElementsByClassName("header")[0]?.clientHeight ?? 60;
      console.log(offset + headerHeight, window.pageYOffset);
      if (window.pageYOffset > offset + headerHeight) {
        element.classList.add(stickyClassName);
        element.style.top = `${headerHeight}px`;
      } else {
        element.classList.remove(stickyClassName);
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, [element]);
};

export default useStickyElement;
