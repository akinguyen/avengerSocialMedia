import React from "react";
import classnames from "classnames";
const TextFieldGroup = ({
  type,
  name,
  placeholder,
  value,
  error,
  onChange,
  disabled,
  icon,
  header,
  required
}) => {
  return (
    <div className="row">
      <div className="col-md-3 field-label-responsive">
        <label for={name}>{header}</label>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
            <div className="input-group-addon" style={{ width: " 2.6rem" }}>
              <i className={icon} />
            </div>
            <input
              type={type}
              name={name}
              className={classnames("form-control", {
                "is-invalid": error
              })}
              id={name}
              placeholder={placeholder}
              required={required ? true : false}
              autofocus
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
            <div class="invalid-feedback">{error}</div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="form-control-feedback">
          <span className="text-danger align-middle" />
        </div>
      </div>
    </div>
  );
};
TextFieldGroup.defaultProps = {
  required: true,
  type: "text"
};
export default TextFieldGroup;
