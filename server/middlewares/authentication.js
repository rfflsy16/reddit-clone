import { db } from "../config/mongoDB.js";
import { verifyToken } from "../helpers/jwt.js";
import { ObjectId } from "mongodb";

const authentication = async (req) => {
    const { authorization } = req.headers
    // console.log(authorization)
    if (!authorization) throw new Error('Unauthorized');

    const bearer = authorization.split(' ')[0]
    if (bearer !== 'Bearer') throw new Error('Unauthorized');

    const access_token = authorization.split(' ')[1]
    // console.log(access_token)

    if (!access_token) throw new Error('Invalid Login');

    const payload = verifyToken(access_token);
    // console.log(payload, '<<<<<<<<<<<<<<<<<')

    const _id = new ObjectId(payload.id)

    // console.log(_id)

    const userLogin = await db.collection('Users').findOne({ _id })

    if (!userLogin) throw new Error('Unauthorized');

    // console.log(userLogin)

    return {
        userId: userLogin._id,
        name: userLogin.name,
        username: userLogin.username,
        email: userLogin.email,
    }
}

export default authentication