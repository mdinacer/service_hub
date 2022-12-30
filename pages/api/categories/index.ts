import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { FETCH_CATEGORIES_QUERY } from '@gql/service-categories/queries';
import { initializeApollo } from '@services/apolloClient';

import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        const client = initializeApollo();

        let {
            data: { categories }
        } = await client.query({
            query: FETCH_CATEGORIES_QUERY,
        });

        return res.status(200).json(categories);
    } catch (error: any) {
        res.status(error.status || 500).end(error.message);
    }
});
