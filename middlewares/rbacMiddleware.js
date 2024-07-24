
export const roles = {
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    PATIENT: 'patient'
};

export const rbac = (requiredRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role; 
        if (!requiredRoles.includes(userRole)) {
            return res.status(403).json({ message: "Access forbidden: insufficient permissions" });
        }

        next();
    };
};
