const handleErrors = (args, errorMessage) => {
  if (!args) {
    throw new Error(errorMessage);
  }
};

export default handleErrors;
