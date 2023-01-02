import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { CREATE_MEMBER_SERVICE_MUTATION } from '@gql/services/mutaions';

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

        const { user } = session;

        const client = initializeApollo();

        let { images, ...values } = req.body

        let data: any = { ...values }

        if (images && Array.isArray(images)) {
            data = Object.assign(data, {
                images: {
                    connect: images
                }
            })
        }

        console.log(JSON.stringify(req.body, null, 4));

        const {
            data: { updateMember: { services } }
        } = await client.mutate({
            mutation: CREATE_MEMBER_SERVICE_MUTATION,
            variables: {
                auth0Id: user.sub,
                data: req.body
            }
        });

        const [service] = services

        return res.status(200).json(service);
    } catch (error: any) {
        res.status(error.status || 500).end(error.message);
    }
});
