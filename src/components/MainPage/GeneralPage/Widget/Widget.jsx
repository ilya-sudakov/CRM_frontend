import PropTypes from 'prop-types';
import './Widget.scss';
import Button from 'Utils/Form/Button/Button.jsx';
import { useHistory } from 'react-router-dom';

const Widget = ({
  title = '',
  className = '',
  content = null,
  linkTo,
  subTitle = '',
  customHeader = null,
  miniWidget = false,
}) => {
  let history = useHistory();

  return (
    <div
      className={`widget ${className ?? ''} ${
        miniWidget ? 'widget--mini' : ''
      }`}
    >
      {customHeader ?? (
        <div className="widget__title">
          {!miniWidget && <div className="widget__sub-title">{subTitle}</div>}
          <span>{title}</span>
          {!miniWidget && linkTo ? (
            <Button
              className="main-window__button main-window__button--inverted"
              inverted
              text={linkTo.text}
              imgSrc={linkTo.img ?? null}
              renderImg={linkTo.renderImg}
              onClick={() => history.push(linkTo.address)}
            ></Button>
          ) : null}
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
};
