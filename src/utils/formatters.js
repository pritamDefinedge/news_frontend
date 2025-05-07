export const formatPanNumber = (value) => {
  let formattedValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  if (formattedValue.length <= 5) {
    return formattedValue.replace(/[^A-Za-z]/g, "");
  }
  if (formattedValue.length <= 9) {
    return (
      formattedValue.slice(0, 5) +
      formattedValue.slice(5).replace(/[^0-9]/g, "")
    );
  }
  return (
    formattedValue.slice(0, 5) +
    formattedValue.slice(5, 9).replace(/[^0-9]/g, "") +
    formattedValue.slice(9, 10).replace(/[^A-Za-z]/g, "")
  );
};

export const formatGstNumber = (value) => {
  let formattedValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  if (formattedValue.length <= 2) return formattedValue.replace(/[^0-9]/g, "");
  if (formattedValue.length <= 7)
    return (
      formattedValue.slice(0, 2) +
      formattedValue.slice(2).replace(/[^A-Za-z]/g, "")
    );
  if (formattedValue.length <= 11)
    return (
      formattedValue.slice(0, 7) +
      formattedValue.slice(7).replace(/[^0-9]/g, "")
    );
  if (formattedValue.length <= 12)
    return (
      formattedValue.slice(0, 11) +
      formattedValue.slice(11).replace(/[^A-Za-z]/g, "")
    );
  if (formattedValue.length <= 13)
    return (
      formattedValue.slice(0, 12) +
      formattedValue.slice(12).replace(/[^1-9A-Za-z]/g, "")
    );
  return formattedValue.slice(0, 14) + formattedValue.slice(14, 15);
};

export const formatIfSCcode = (value) => {
  let formattedValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  if (formattedValue.length <= 4) {
    return formattedValue.replace(/[^A-Z]/g, "");
  }
  if (formattedValue.length === 5) {
    return formattedValue.slice(0, 4) + (formattedValue[4] === "0" ? "0" : "");
  }
  if (formattedValue.length <= 11) {
    return (
      formattedValue.slice(0, 4) +
      "0" +
      formattedValue.slice(5, 11).replace(/[^A-Z0-9]/g, "")
    );
  }
  return formattedValue.slice(0, 11);
};
