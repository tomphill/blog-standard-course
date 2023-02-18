import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const {
      user: { sub },
    } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db('BlogStandard');
    const userProfile = await db.collection('users').findOne({
      auth0Id: sub,
    });

    const { postId } = req.body;

    await db.collection('posts').deleteOne({
      userId: userProfile._id,
      _id: new ObjectId(postId),
    });

    res.status(200).json({ success: true });
  } catch (e) {
    console.log('ERROR TRYING TO DELETE A POST: ', e);
  }
  return;
});
