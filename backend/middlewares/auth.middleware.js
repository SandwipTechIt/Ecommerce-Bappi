export const protect = (req, res, next) => {

    const isAuthenticated = true; 
    
    if (isAuthenticated) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};