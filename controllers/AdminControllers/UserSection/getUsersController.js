const User = require("../../../models/user");
const ErrorService = require("../../../service/errorsService");

const getUsersController = async (req, res) => {
  try {
    let users, rev, searchCount;
    const { page, sort, reverse, search, limit } = req.query;
    reverse ? (rev = -1) : (rev = 1);
    
    if (search) {
      let reg = new RegExp(`^${search}`, "i");
      searchCount = await User.countDocuments({ $or: [{ email: { $regex: reg } }, { name: { $regex: reg } }] })
      users = await User.find(
        { $or: [{ email: { $regex: reg } }, { name: { $regex: reg } }] },
        { password: 0 }
      )
        .sort({[sort]: rev, email: rev})
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      users = await User.find({}, { password: 0 })
        .sort({[sort] : rev, email: rev})
        .skip((page - 1) * limit)
        .limit(limit);
    }
    res.status(200).json({ users, searchCount });
  } catch (e) {
    ErrorService(e, res)
  }
};

module.exports = getUsersController;
