import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

import type { NextApiRequest, NextApiResponse } from 'next';
import {
    UPDATE_MEMBER_MUTATION
} from '../../../gql/member/mutations';
import { initializeApollo } from '../../../services/apolloClient';

export default withApiAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        const session = await getSession(req, res);


        if (!session) {
            return res.status(403).end('Unauthorized');
        }

        const { user } = session;

        const client = initializeApollo();

        let { assetId, ...data } = req.body

        if (assetId) {
            data = Object.assign(data, {
                picture: {
                    connect: { id: assetId }
                }
            })
        }

        const {
            data: { updateMember }
        } = await client.mutate({
            mutation: UPDATE_MEMBER_MUTATION,
            variables: {
                auth0Id: user.sub,
                data
            }
        });

        return res.status(200).json(updateMember);
    } catch (error: any) {
        res.status(error.status || 500).end(error.message);
    }
});
