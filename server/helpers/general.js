const checkId = (id) => {
  const newId = parseInt(id, 10);
  return isNaN(newId) ? 0 : newId;
};


export default checkId;
