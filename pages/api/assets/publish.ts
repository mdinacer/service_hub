import { PUBLISH_ASSET_MUTATION } from 'gql/assets/mutations';
import { initializeApollo } from 'services/apolloClient';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

import type { NextApiRequest, NextApiResponse } from 'next';
export default withApiAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {

        const session = getSession(req, res);

        if (!session) {
            return res.status(403).end('Unauthorized');
        }

        const { assetId } = req.body;

        if (assetId) {
            const client = initializeApollo();

            const result = await client.mutate({
                mutation: PUBLISH_ASSET_MUTATION,
                variables: {
                    assetId
                }
            });
            const {
                data: { publishAsset }
            } = result;

            return res.status(200).json(publishAsset);
        }
    } catch (error: any) {
        res.status(error.status || 500).end(error.message);
    }
});
