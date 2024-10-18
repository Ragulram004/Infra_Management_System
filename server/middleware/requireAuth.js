import jwt from 'jsonwebtoken';
import Personnel from '../models/personnelModel.js';

const requireAuth = async (req, res, next) => {
  // Verify Authorization
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET); // Verifies the token
    req.user = await Personnel.findOne({ _id }).select('_id'); // Attaches the user to the request object
    next(); // Moves to the next middleware
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' }); // Send specific error message for expired token
    }
    return res.status(401).json({ error: 'Request is not authorized' }); // Other JWT errors
  }
};

export { requireAuth };
