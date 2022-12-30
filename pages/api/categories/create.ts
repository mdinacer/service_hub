import { CREATE_CATEGORY_MUTATION } from 'gql/service-categories/mutations';

import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

import { initializeApollo } from '../../../services/apolloClient';

import type { NextApiRequest, NextApiResponse } from 'next';
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

        const client = initializeApollo();

        let { data } = req.body

        const {
            data: { createCategory }
        } = await client.mutate({
            mutation: CREATE_CATEGORY_MUTATION,
            variables: {
                data
            }
        });

        return res.status(200).json(createCategory);
    } catch (error: any) {
        res.status(error.status || 500).end(error.message);
    }
});
