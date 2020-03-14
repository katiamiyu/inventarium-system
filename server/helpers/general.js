const checkId = id => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return 0;
    }
    return id;
    }


export default checkId;