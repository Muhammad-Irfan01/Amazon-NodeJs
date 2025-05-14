const jwt = require('jsonwebtoken')
const USER = require ('../Models/UserSchema');
const AKey = process.env.accessKey;
const RKey = process.env.refreshKey;

const authenticate = async (req, res, next) =>{

    try {
        const accessToken = req.headers.authorization?.split(" ")[1];
        if(!accessToken){
            return res.status(401).json({error : 'access token not provided'})
        }


        try {
            const decoded = jwt.verify(accessToken, AKey);
            req.changPassUser = decoded
            const user = await USER.findOne({_id : decoded._id});
            if(!user){
                 return res.status(401).json({error : 'user not found'})
            }

            req.user = user;
            req.userID = user._id;
            return next();
        } catch (accessTokenError) {
            console.log('access token expired', accessTokenError.message);

            const {refreshToken} = req.body;
            if (!refreshToken) {

                return res.status(403).json({error : 'RToken not provided'});
            }

            try {
                const refreshDecoded = jwt.verify(refreshToken, RKey);

                const user = await USER.findOne({_id : refreshDecoded._id, 'refreshTokens.token' : refreshToken});
                if(!user) {
                    return res.status(403).json({error : 'invalid refresh token'});
                }

                const newAccessToken = jwt.sign({_id : user._id}, AKey, {expiresIn : '1h'});
                
                res.setHeader('Authorization', `Bearer ${newAccessToken}`);

                req.user = user;
                req.userID = user._id;

                return next();

            } catch (refreshTokenError) {
               return  res.status(401).json({error : 'refresh token expired'})
            }
        }
    } catch (error) {
        console.log(error.message, 'authentiction error');
        res.status(400).json('unauthorized: No token provided');
    }
}
module.exports = authenticate;
