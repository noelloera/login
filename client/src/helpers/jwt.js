const getAccess = () => {
  return localStorage.getItem("access");
};

const getRefresh = () => {
  return localStorage.getItem("refresh");
};

const removeAccess = () => {
  localStorage.clear("access");
};
const removeRefresh = () => {
  localStorage.clear("refresh");
};

export { getAccess, getRefresh, removeAccess, removeRefresh };
