import { NextApiRequest, NextApiResponse } from 'next';
import { signOut } from '@/auth';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  await signOut({ redirectTo: '/' });
  return res.status(200).json({ message: 'Logged out successfully' });
};

export default logout;