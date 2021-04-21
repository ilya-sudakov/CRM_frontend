import PropTypes from 'prop-types';
import './InputText.scss';

const InputText = ({
  inputName,
  required,
  error,
  type,
  name,
  handleInputChange,
  defaultValue,
  readOnly,
  disabled,
  setErrorsArr,
  errorsArr,
}) => {
  return (
    <div className="input_text">
      <div className="input_text__input">
        <div className="input_text__input_name">
          {inputName + (required ? '*' : '')}
        </div>
        <div
          className={
            error === true
              ? 'input_text__input_field input_text__input_field--error'
              : 'input_text__input_field'
          }
        >
          {type === 'textarea' ? (
            <textarea
              name={name}
              autoComplete="off"
              onChange={handleInputChange}
              value={defaultValue}
              readOnly={readOnly}
              disabled={disabled}
            ></textarea>
          ) : (
            <input
              type={type ? type : 'text'}
              name={name}
              autoComplete="off"
              onChange={handleInputChange}
              value={defaultValue}
              readOnly={readOnly}
              disabled={disabled}
            />
          )}
        </div>
      </div>
      {error && (
        <div
          className="input_text__error"
          onClick={
            setErrorsArr
              ? () =>
                  setErrorsArr({
                    ...errorsArr,
                    [name]: false,
                  })
              : null
          }
        >
          Поле не заполнено!
        </div>
      )}
    </div>
  );
};

export default InputText;

InputText.propTypes = {
  inputName: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  handleInputChange: PropTypes.func,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  setErrorsArr: PropTypes.func,
  errorsArr: PropTypes.object,
};
