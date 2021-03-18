import {
  addDraftToRecordedWork,
  addProductToRecordedWork,
  addRecordedWork,
  deleteDraftFromRecordedWork,
  deleteProductFromRecordedWork,
  deleteRecordedWork,
  editRecordedWork,
} from 'Utils/RequestsAPI/WorkManaging/WorkControl.jsx';

export const submitWorkData = async (
  worktimeInputs,
  date,
  employee,
  setIsLoading,
  inputs,
) => {
  setIsLoading(true);
  return await Promise.all(
    worktimeInputs.works.map(async (item) => {
      console.log(item);
      const temp = Object.assign({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        employeeId: employee.id,
        comment: item.comment,
        workListId: item.workId,
        hours: item.hours,
      });

      //Удаление элементов
      await Promise.all(
        worktimeInputs.originalWorks.map((originalWork) => {
          const item = worktimeInputs.works.find(
            (workItem) => workItem.id === originalWork.id,
          );
          if (originalWork.id && item === undefined) {
            console.log('deleting element', worktimeInputs);
            return Promise.all(
              originalWork.product.map((product) => {
                return deleteProductFromRecordedWork(
                  originalWork.id,
                  product.product.id,
                );
              }),
            )
              .then(() => {
                return Promise.all(
                  originalWork.draft.map((draft) => {
                    return deleteDraftFromRecordedWork(
                      originalWork.id,
                      draft.partId,
                      draft.partType,
                    );
                  }),
                );
              })
              .then(() => deleteRecordedWork(originalWork.id));
          }
        }),
      );

      if (item.isOld) {
        //если часы/комментарий не совпадают, то редактируем
        const originalItem = worktimeInputs.originalWorks.find(
          (originalWork) => item.id === originalWork.id,
        );

        if (
          originalItem &&
          (item.hours !== originalItem.hours ||
            item.comment !== originalItem.comment ||
            item.workName !== originalItem.workName)
        ) {
          await editRecordedWork(temp, item.id);
        }

        //Продукция
        //delete removed products
        Promise.all(
          originalItem.product.map((originalProduct) => {
            if (
              item.product.find(
                (product) => product.id === originalProduct.id,
              ) === undefined
            ) {
              console.log('delete product', originalProduct);
              return deleteProductFromRecordedWork(item.id, originalProduct.id);
            }
          }),
        );

        //add new products
        Promise.all(
          item.product.map((product) => {
            if (
              originalItem.product.find(
                (originalProduct) => product.id === originalProduct.id,
              ) === undefined
            ) {
              console.log('add product', product);
              return addProductToRecordedWork(
                item.id,
                product.id,
                product.quantity,
                {
                  name: product.name,
                },
              );
            }
          }),
        );

        //update edited products
        Promise.all(
          originalItem.product.map((originalProduct) => {
            const product = item.product.find(
              (product) => product.id === originalProduct.id,
            );
            if (
              product !== undefined &&
              originalProduct.quantity !== Number.parseFloat(product.quantity)
            ) {
              console.log('edit product', product, originalProduct);
              return deleteProductFromRecordedWork(
                item.id,
                originalProduct.id,
              ).then(() =>
                addProductToRecordedWork(
                  item.id,
                  product.id,
                  product.quantity,
                  {
                    name: product.name,
                  },
                ),
              );
            }
          }),
        );

        //Чертежи
        //delete removed drafts
        Promise.all(
          originalItem.draft.map((originalDraft) => {
            if (
              item.draft.find((draft) => draft.id === originalDraft.id) ===
              undefined
            ) {
              console.log('delete draft', originalDraft, originalItem);
              return deleteDraftFromRecordedWork(
                item.id,
                originalDraft.partId,
                originalDraft.partType,
              );
            }
          }),
        );

        //add new drafts
        Promise.all(
          item.draft.map((draft) => {
            if (
              originalItem.draft.find(
                (originalDraft) => draft.id === originalDraft.id,
              ) === undefined
            ) {
              console.log('add draft', draft);
              return addDraftToRecordedWork(
                item.id,
                draft.partId,
                draft.type,
                draft.quantity,
                draft.name,
              );
            }
          }),
        );

        //update edited drafts
        Promise.all(
          originalItem.draft.map((originalDraft) => {
            const draft = item.draft.find(
              (draft) => draft.id === originalDraft.id,
            );
            console.log('edit draft opportunity', originalDraft, draft);
            if (
              draft !== undefined &&
              originalDraft.quantity !== Number.parseFloat(draft.quantity)
            ) {
              console.log('edit draft success', draft);
              return deleteDraftFromRecordedWork(
                item.id,
                originalDraft.partId,
                originalDraft.partType ??
                  item.draft.find((item) => draft.partId === item.id)?.type,
              ).then(() =>
                addDraftToRecordedWork(
                  item.id,
                  draft.partId,
                  draft.partType,
                  draft.quantity,
                  draft.name,
                ),
              );
            }
          }),
        );

        inputs && inputs.updateSelectedDaysWork(item);
      }

      //if item is new, then just add it
      if (!item.isOld && item.workId !== null && item.isOld !== undefined) {
        console.log('adding item', item);
        return addRecordedWork(temp)
          .then((res) => res.json())
          .then((res) => {
            Promise.all(
              item.product.map((product) => {
                return addProductToRecordedWork(
                  res.id,
                  product.id,
                  product.quantity,
                  {
                    name: product.name,
                  },
                );
              }),
            );
            return res.id;
          })
          .then((id) => {
            return Promise.all(
              item.draft.map((draft) => {
                return addDraftToRecordedWork(
                  id,
                  draft.partId,
                  draft.type,
                  draft.quantity,
                  draft.name,
                );
              }),
            );
          })
          .then(() => inputs && inputs.addSelectedDaysWork(item))
          .catch((error) => {
            alert('Ошибка при добавлении записи');
            setIsLoading(false);
            console.log(error);
          });
      }
    }),
  ).then(() => {
    setIsLoading(false);
  });
};
