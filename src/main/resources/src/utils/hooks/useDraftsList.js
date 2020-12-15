import { useEffect, useState } from "react";
import { getParts } from "../RequestsAPI/Parts.jsx";
import { getMachine } from "../RequestsAPI/Rigging/Machine.jsx";
import { getPressForm } from "../RequestsAPI/Rigging/PressForm.jsx";
import { getStamp } from "../RequestsAPI/Rigging/Stamp.jsx";

const useDraftsList = () => {
  const [drafts, setDrafts] = useState([]);
  const [isLoadingDrafts, setIsLoadingDrafts] = useState(true);

  const loadData = (signal) => {
    setIsLoadingDrafts(true);
    let newDrafts = [];
    getStamp(signal)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        response.map((item) => {
          return item.stampParts.map((stamp) => {
            return newDrafts.push({
              ...stamp,
              value: stamp.id,
              label: `${stamp.number}, ${stamp.name}`,
              type: "Stamp",
            });
          });
        });
        // console.log(newDrafts);
        return setDrafts([...newDrafts]);
      })
      .then(() => getPressForm(signal))
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        response.map((item) => {
          return item.pressParts.map((stamp) => {
            return newDrafts.push({
              ...stamp,
              value: stamp.id,
              label: `${stamp.number}, ${stamp.name}`,
              type: "Press",
            });
          });
        });
        return setDrafts([...newDrafts]);
      })
      .then(() => getMachine(signal))
      .then((response) => response.json())
      .then((response) => {
        // console.log(response)
        response.map((item) => {
          return item.benchParts.map((stamp) => {
            return newDrafts.push({
              ...stamp,
              value: stamp.id,
              label: `${stamp.number}, ${stamp.name}`,
              type: "Bench",
            });
          });
        });
        return setDrafts([...newDrafts]);
        // console.log(newDrafts)
      })
      .then(() => getParts(signal))
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        res.map((item) =>
          item.detailParts.map((stamp) =>
            newDrafts.push({
              ...stamp,
              value: stamp.id,
              label: `${stamp.number}, ${stamp.name}`,
              type: "Detail",
            })
          )
        );
        setIsLoadingDrafts(false);
        // console.log(newDrafts)
        return setDrafts([
          ...newDrafts.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }),
        ]);
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingDrafts(false);
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    loadData(abortController.signal);

    return function cancel() {
      abortController.abort();
    };
  }, []);

  return { drafts, isLoadingDrafts };
};

export default useDraftsList;
