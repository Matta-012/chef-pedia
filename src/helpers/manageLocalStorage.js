export const saveLocalStorage = (key, param) => {
  localStorage.setItem(key, JSON.stringify(param));
};

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
