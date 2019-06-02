const initialController = {};

initialController.get = (req, res) => {
  res.json({
    message: 'Link Site API'
  });
};

export default initialController;
