import {
    getSession,
    withApiAuthRequired
} from '@auth0/nextjs-auth0';

import type { NextApiRequest, NextApiResponse } from 'next';
import { CREATE_MEMBER_MUTATION, MemberCreateInput } from '../../../gql/member/mutations';
import { FETCH_MEMBER_QUERY } from '../../../gql/member/queries';
import { initializeApollo } from '../../../services/apolloClient';

export default withApiAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        const session = await getSession(req, res);

        if (!session) {
            return res.status(403).end('Unauthorized');
        }

        const { user } = session

        console.log(user);


        const client = initializeApollo();

        const {
            data: { member }
        } = await client.query({
            query: FETCH_MEMBER_QUERY,
            variables: {
                auth0Id: user.sub
            }
        });

        if (member) {
            return res.status(200).json(member);
        } else {
            const profile: MemberCreateInput = {
                displayName: user.name,
                email: user.email,
                mobile: ''
            }
            const {
                data: { createMember }
            } = await client.mutate({
                mutation: CREATE_MEMBER_MUTATION,
                variables: {
                    data: {
                        auth0Id: session.user.sub,
                        ...profile
                    }
                }
            });
            return res.status(200).json(createMember);
        }

    } catch (error: any) {
        res.status(error.status || 500).end(error.message);
    }
});
