const CustomAPIError = require("../errors/CustomAPIError");
const CustomErrorMiddleware = (err, req, res, next) => {
   if (err instanceof CustomAPIError) {
      return res.status(err.status).json({ msg: err.message });
   }
   return res.status(500).json({ msg: "OOPS, Something went Wrong" });
};

module.exports = CustomErrorMiddleware;
