import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './TitleHeader.scss';

const TitleHeader = ({
  title,
  menuItems,
  curPage,
  setCurPage,
  type = 'main-window',
}) => {
  const types = {
    'main-window': 'main-window',
    'main-form': 'main-form',
  };
  const curClassName = types[type];
  return (
    <div className="title-header">
      <div className={`${curClassName}__header ${curClassName}__header--full`}>
        {title ? <div className={`${curClassName}__title`}>{title}</div> : null}
        {menuItems ? (
          <div className={`${curClassName}__menu`}>
            {menuItems.map((item) => {
              const itemContents = (
                <>
                  {item.pageTitle}
                  {item.count ? (
                    <span className={`${curClassName}__items-count`}>
                      {item.count}
                    </span>
                  ) : null}
                </>
              );
              return item.link ? (
                <Link
                  className={`${curClassName}__item ${
                    (item.isActive === undefined &&
                      curPage === item.pageName) ||
                    item.isActive
                      ? `${curClassName}__item--active`
                      : ''
                  }`}
                  to={item.link}
                  onClick={() => setCurPage(item.pageName)}
                >
                  {itemContents}
                </Link>
              ) : (
                <div
                  className={`${curClassName}__item ${
                    (item.isActive === undefined &&
                      curPage === item.pageName) ||
                    item.isActive
                      ? `${curClassName}__item--active`
                      : ''
                  }`}
                  onClick={() => setCurPage(item.pageName)}
                >
                  {itemContents}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TitleHeader;

TitleHeader.propTypes = {
  title: PropTypes.string,
  menuItems: PropTypes.array,
  curPage: PropTypes.string,
  setCurPage: PropTypes.func,
  type: PropTypes.bool,
};
