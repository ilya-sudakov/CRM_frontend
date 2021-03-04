import { useEffect } from 'react';

const useStickyElement = (
  element,
  stickyClassName = 'main-window__list-item--sticky',
) => {
  const getAllParentsHeight = (element) => {
    if (element === null) return 0;
    let height = element?.offsetTop ?? 0;
    height += getAllParentsHeight(element?.offsetParent);
    return height;
  };

  useEffect(() => {
    if (!element) return;
    const scrollCallBack = window.addEventListener('scroll', () => {
      const headerHeight =
        document.getElementsByClassName('header')[0]?.clientHeight ?? 60;
      console.log(
        window.pageYOffset,
        getAllParentsHeight(element) + headerHeight,
        window.pageYOffset - getAllParentsHeight(element) + headerHeight,
      );
      if (window.pageYOffset > getAllParentsHeight(element) - headerHeight) {
        element.classList.add(stickyClassName);
        element.style.top = `${
          window.pageYOffset - getAllParentsHeight(element) + headerHeight
        }px`;
      } else {
        element.classList.remove(stickyClassName);
        element.style.top = 0;
      }
    });
    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, [element]);
};

export default useStickyElement;
