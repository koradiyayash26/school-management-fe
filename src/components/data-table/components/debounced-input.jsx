import { Input } from "@/components/ui/input";
import React from "react";
import PropTypes from "prop-types";

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input
      {...props}
      placeholder="Filter tasks..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="h-8 w-full md:w-[250px]"
    />
  );
}

DebouncedInput.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  debounce: PropTypes.number,
};

export default DebouncedInput;
