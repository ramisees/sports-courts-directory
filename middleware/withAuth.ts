import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export default function withAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const session = await getSession({ req });

      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Attach user to request object
      req.user = session.user as any;

      // Call the original handler
      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}
