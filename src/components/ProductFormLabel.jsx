import PropTypes from "prop-types";

function ProductFormLabel({ name, textLabel, customClassName, children }) {
  const text = textLabel || name;

  return (
    <label
      htmlFor={name}
      className={
        customClassName ||
        "block text-sm font-medium text-gray-700 mb-1 capitalize"
      }
    >
      {children || text}
    </label>
  );
}

ProductFormLabel.propTypes = {
  name: PropTypes.string.isRequired,
  textLabel: PropTypes.string,
  customClassName: PropTypes.string,
  children: PropTypes.node,
};

export default ProductFormLabel;
