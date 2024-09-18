import { verifyUser } from "./jwtAuth.js";

const jwtVerification = (verifiedRole) => {
  return async (req, res, next) => {
    try {
      
      await verifyUser(req, res, async () => {
        const requestedRole = req.user.role;

        if (requestedRole === verifiedRole) {
          console.log("Verified request");
          next(); // Role matches, proceed
        } else {
          return res.status(403).json({
            success: false,
            message: "Access denied. Insufficient role privileges"
          });
        }
      });
    } catch (error) {
      console.error("Error in jwtVerification middleware:", error);
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  };
};

export { jwtVerification };
