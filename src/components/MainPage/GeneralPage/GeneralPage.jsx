import { useEffect } from 'react';
import { MainPageWorkspace } from '../lazyImports.jsx';
import './GeneralPage.scss';
import 'Utils/MainWindow/MainWindow.scss';

const GeneralPage = (props) => {
  useEffect(() => {
    document.title = 'Главная страница';
  }, []);

  return (
    <div className="general-page">
      <div className="main-window">
        <div className="main-window__content">
          <MainPageWorkspace userHasAccess={props.userHasAccess} />
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;
