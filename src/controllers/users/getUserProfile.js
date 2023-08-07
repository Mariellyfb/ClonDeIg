const selectUserByIdModel = require("../../models/users/selectUserByIdModel");

const getUserProfile = async (req, res, next) => {
  try {
    //Obtenemos id del usuario por los path params
    const { userId } = req.params;

    //Obtemos los datos del usuario.
    const user = await selectUserByIdModel(userId);
    res.send({
      status: "ok",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = getUserProfile;
