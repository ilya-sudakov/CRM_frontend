import { Link } from 'react-router-dom';
import EditSVG from 'Assets/tableview/edit.inline.svg';

const defaultItem = {
  isRendered: false,
};

const icons = {
  edit: <EditSVG className="main-window__img" />,
};

const ActionItem = ({ item = defaultItem, icon }) => {
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
        {icon ? (
          icons[icon]
        ) : item.imgSrc ? (
          <img className="main-window__img" src={item.imgSrc} />
        ) : null}
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
      {icon ? (
        icons[icon]
      ) : item.imgSrc ? (
        <img className="main-window__img" src={item.imgSrc} />
      ) : null}
    </div>
  );
};

export default ActionItem;
