import CheckBox from 'Utils/Form/CheckBox/CheckBox.jsx';
import styled from 'styled-components';

const AdvancedOptions = ({ advancedOptions, setAdvancedOptions }) => {
  const GroupOption = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    padding: 15px 20px;
    padding-bottom: 0;
  `;

  const GroupCheckbox = styled(GroupOption)`
    display: flex;
    flex-direction: column;

    .checkbox {
      .checkbox__text {
        color: #333;
      }
      &:not(:first-child) {
        --checkbox__checkmark--size: 18px;
        .checkbox__text {
          font-size: 0.8rem;
          color: #999;
        }
      }
    }
  `;

  const changeCheckboxGroupValue = (index, fieldName, value) => {
    let temp = advancedOptions;
    temp.splice(index, 1, {
      ...temp[index],
      [fieldName]: {
        text: temp[index][fieldName].text,
        value: value,
      },
    });
    setAdvancedOptions([...temp]);
  };

  return (
    <div>
      {advancedOptions.map((option, index) => {
        if (option.type === 'groupCheckbox') {
          return (
            <GroupCheckbox key={index}>
              <CheckBox
                text={option.parentCheckbox.text}
                id={option.parentCheckbox.text}
                checked={option.parentCheckbox.value}
                onChange={(value) =>
                  changeCheckboxGroupValue(index, 'parentCheckbox', value)
                }
              />
              {option.parentCheckbox.value && (
                <CheckBox
                  text={option.childCheckbox.text}
                  id={option.childCheckbox.text}
                  checked={option.childCheckbox.value}
                  onChange={(value) =>
                    changeCheckboxGroupValue(index, 'childCheckbox', value)
                  }
                />
              )}
            </GroupCheckbox>
          );
        }
      })}
    </div>
  );
};

export default AdvancedOptions;
