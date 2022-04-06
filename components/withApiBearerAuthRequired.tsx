import { NextApiResponse, NextApiRequest, NextApiHandler } from 'next';
import { NextJwtVerifier } from '@serverless-jwt/next';

export const verifyJwt = NextJwtVerifier({
    issuer: process.env.AUTH0_ISSUER_BASE_URL || "https://example.org/",
    audience: process.env.AUTH0_AUDIENCE || "https://example.org/"
});

export const WithApiAuthRequired = (scope: string, apiRoute: NextApiHandler) =>
    verifyJwt(async (req: NextApiRequest, res: NextApiResponse) => {
        const { claims } = (req as any).identityContext;
        if (!claims) {
            res.status(401).json({
                error: 'not_authenticated',
                description: 'The user is not authenticated'
            });
            return;
        }
        if (!claims.scope || claims.scope.indexOf(scope) === -1) {
            return res.status(403).json({
                error: 'access_denied',
                error_description: `Token does not contain the required '${scope}' scope`
            });
        }

        return apiRoute(req, res);
    });

// export type WithApiAuthRequired = (apiRoute: NextApiHandler) => NextApiHandler;
