const pinGenerate = () => {
  const id = Math.round(Math.random() * 100000000000000000000) + "";
  if (id.length >= 20) {
    return id;
  }
  return pinGenerate();
};

export default pinGenerate;
