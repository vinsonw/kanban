import clsx from "clsx";
import "./SimpleInput.scss";
import React from "react";

const SimpleInput = ({
  value,
  onChange,
  height = 40,
  type = "input",
  enableNonEmptyCheck = false,
}: {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  height?: number;
  type?: "input" | "textarea";
  enableNonEmptyCheck?: boolean;
}) => {
  const [error, setError] = React.useState(false);

  const setErrorBasedOnFlag = (errorToSet: boolean) => {
    if (enableNonEmptyCheck) setError(errorToSet);
  };

  const validate = (value: string) => {
    console.log("value", value);
    if (!value) {
      setErrorBasedOnFlag(true);
    } else {
      setErrorBasedOnFlag(false);
    }
  };

  return type === "input" ? (
    <div className={clsx("input-for-task-field-wrapper", { error })}>
      <input
        className={clsx("input-for-task-field", { error })}
        style={{ height, lineHeight: height }}
        value={value}
        onFocus={() => setError(false)}
        onChange={(e) => {
          onChange(e);
          validate(e.target.value);
        }}
        onBlur={(e) => {
          validate(e.target.value);
        }}
      />
      {error && <div className="empty-label">Can't be empty</div>}
    </div>
  ) : (
    <textarea
      className="textarea-for-task-field"
      value={value}
      onChange={onChange}
      rows={3}
      placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
    />
  );
};

export default SimpleInput;
