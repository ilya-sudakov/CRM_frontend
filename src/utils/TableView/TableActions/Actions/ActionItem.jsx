import { Link } from 'react-router-dom';

const defaultItem = {
  isRendered: false,
};

const ActionItem = ({ item = defaultItem }) => {
  const isRendered = item.isRendered === undefined || item.isRendered === true;
  if (item.customElement) return !isRendered ? null : item.customElement;
  if (!isRendered) return null;
  if (item.link) {
    return (
      <Link
        className="main-window__action"
        to={item.link}
        title={item.title}
        target={item.openInNewTab ? '_blank' : ''}
        rel={item.openInNewTab ? 'noopener noreferrer' : ''}
      >
        {item.text}
        <img className="main-window__img" src={item.imgSrc} />
      </Link>
    );
  }
  return (
    <div
      className="main-window__action"
      onClick={item.onClick}
      title={item.title}
    >
      {item.text}
      {item.imgSrc ? (
        <img className="main-window__img" src={item.imgSrc} />
      ) : null}
    </div>
  );
};

export default ActionItem;
