import PropTypes from 'prop-types';
import './Widget.scss';
import { Link } from 'react-router-dom';

const Widget = ({
  title = '',
  className = '',
  content = null,
  linkTo,
  subTitle = '',
  customHeader = null,
  miniWidget = false,
  icon = null,
}) => {
  return (
    <div
      className={`widget ${className ?? ''} ${
        miniWidget ? 'widget--mini' : ''
      }`}
    >
      {customHeader ?? (
        <div className="widget__title">
          {!miniWidget && <div className="widget__sub-title">{subTitle}</div>}
          {linkTo ? (
            <Link to={linkTo.address} title={linkTo.text}>
              <span>
                {icon}
                {title}
              </span>
            </Link>
          ) : (
            <span>
              {icon}
              {title}
            </span>
          )}
        </div>
      )}
      <div className="widget__content">{content}</div>
    </div>
  );
};

export default Widget;

Widget.proptypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  linkTo: PropTypes.object,
  subTitle: PropTypes.string,
  customHeader: PropTypes.object,
  miniWidget: PropTypes.bool,
  icon: PropTypes.any,
};
