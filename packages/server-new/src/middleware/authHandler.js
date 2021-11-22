import { authService } from '../services';

// "Authorization: Bearer [token]" in header or "token: [token]"
export const authHandler = (req, res, next) => {
  let tokenToVerify;

  if (req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ');

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res
          .status(401)
          .json({ error: { message: 'Format for Authorization: Bearer [token]', code: 401 }, success: false });
      }
    } else {
      return res
        .status(401)
        .json({ error: { message: 'Format for Authorization: Bearer [token]', code: 401 }, success: false });
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ error: { message: 'No Authorization was found', code: 401 }, success: false });
  }

  return authService().verify(tokenToVerify, (err, thisToken) => {
    if (err) {
      return res.status(401).json({ error: { code: 401, ...err }, success: false });
    }
    // store { userId } to req.token for future use
    req.token = thisToken;
    return next();
  });
};
