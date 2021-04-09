import { Link } from 'react-router-dom';
import EditSVG from 'Assets/tableview/edit.inline.svg';
import PrintSVG from 'Assets/tableview/print.inline.svg';
import SelectSVG from 'Assets/tableview/ok.inline.svg';
import ViewSVG from 'Assets/tableview/view.inline.svg';

const defaultItem = {
  isRendered: false,
};

const icons = {
  edit: <EditSVG className="main-window__img" />,
  view: (
    <ViewSVG
      width={20}
      height={20}
      viewBox="0 0 16 16"
      className="main-window__img"
    />
  ),
  print: <PrintSVG className="main-window__img" />,
  select: <SelectSVG className="main-window__img" />,
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
        <img
          className="main-window__img"
          style={{ maxWidth: '24px' }}
          src={item.imgSrc}
        />
      ) : null}
    </div>
  );
};

export default ActionItem;
