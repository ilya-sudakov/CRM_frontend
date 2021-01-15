import React, { useState, useEffect } from "react";
import "./StorageLepsari.scss";
import "../../../../utils/MainWindow/MainWindow.scss";
import TableViewNew from "../../Storage/TableView/TableView.jsx";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import {
  deleteStorage,
  getStorage,
} from "../../../../utils/RequestsAPI/Workshop/LepsariStorage.jsx";
import FloatingPlus from "../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import ControlPanel from "../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";

const StorageLepsari = (props) => {
  const [storage, setStorage] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Склад";
    const abortController = new AbortController();
    loadStorage(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  const loadStorage = (signal) => {
    getStorage(signal)
      .then((res) => res.json())
      .then((res) => {
        setStorage(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItem = (event) => {
    const id = event.target.dataset.id;
    deleteStorage(id).then(() => loadStorage());
  };

  return (
    <div className="storage-lepsari">
      <div className="main-window">
        <FloatingPlus
          linkTo="/lepsari/workshop-storage/new"
          visibility={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEMZ"]}
        />
        <SearchBar
          fullSize
          placeholder="Введите артикул детали для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel itemsCount={`Всего: ${storage.length} записей`} />
        <TableViewNew
          data={storage}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          workshopName="lepsari"
        />
      </div>
    </div>
  );
};

export default StorageLepsari;
