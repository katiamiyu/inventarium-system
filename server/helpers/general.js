const checkId = id => {
    const newId = parseInt(id, 10);
    if (isNaN(newId)) {
      return 0;
    }
    return newId;
    }


export default checkId;