import { initializeApollo } from '@services/apolloClient';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { DELETE_ASSET_MUTATION } from 'gql/assets/mutations';

import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {

        const client = initializeApollo();

        const { assetId } = req.body;

        const {
            data: { deleteAsset }
        } = await client.mutate({
            mutation: DELETE_ASSET_MUTATION,
            variables: {
                assetId
            }
        });

        return res.status(200).json(deleteAsset);
    } catch (error: any) {
        res.status(error.status || 500).end(error.message);
    }
});
