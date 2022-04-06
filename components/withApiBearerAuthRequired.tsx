import { NextApiResponse, NextApiRequest, NextApiHandler } from 'next';
import { SessionCache } from '@auth0/nextjs-auth0';
import { NextJwtVerifier } from '@serverless-jwt/next';

const verifyJwt = NextJwtVerifier({
    issuer: process.env.AUTH0_ISSUER_BASE_URL || "https://example.org/",
    audience: process.env.AUTH0_AUDIENCE || "https://example.org/"
});

export type WithApiAuthRequired = (apiRoute: NextApiHandler) => NextApiHandler;

const requireScope = (scope: string, apiRoute: any) =>
    verifyJwt(async (req, res) => {
        const { claims } = (req as any).identityContext;
        if (!claims || !claims.scope || claims.scope.indexOf(scope) === -1) {
            return res.status(403).json({
                error: 'access_denied',
                error_description: `Token does not contain the required '${scope}' scope`
            });
        }
        return apiRoute(req, res);
    });

const withApiAuthFactory = (sessionCache: SessionCache): WithApiAuthRequired => {
    return (apiRoute) => async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

        const session = sessionCache.get(req, res);

        if (!session || !session.user) {
            res.status(401).json({
                error: 'not_authenticated',
                description: 'The user does not have an active session or is not authenticated'
            });
            return;
        }

        await apiRoute(req, res);
    };
}