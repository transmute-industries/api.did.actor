import { NextApiResponse, NextApiRequest, NextApiHandler } from 'next';
import { NextJwtVerifier } from '@serverless-jwt/next';
import { config } from './config';

export const verifyJwt = NextJwtVerifier({
    issuer: process.env.AUTH0_ISSUER_BASE_URL || "https://example.org/",
    audience: process.env.AUTH0_AUDIENCE || "https://example.org/"
});

export const WithApiBearerAuthRequired = (apiRoute: NextApiHandler, scope?: string[]) =>
    verifyJwt(async (req: NextApiRequest, res: NextApiResponse) => {
        if (config.env_config.auth_enabled) {
            const { claims } = (req as any).identityContext;
            if (!claims) {
                res.status(401).json({
                    error: 'not_authenticated',
                    description: 'The user is not authenticated'
                });
                return;
            }
            if (scope !== undefined) {
                if (!claims.scope) {
                    return res.status(403).json({
                        error: 'access_denied',
                        error_description: 'Token does not contain a scope, which is required for this call'
                    });
                } else {
                    var scopeFound = false;
                    scope.forEach((s, idx) => {
                        if (claims.scope.includes(s)) {
                            scopeFound = true
                        }
                    });
                    if (!scopeFound) {
                        return res.status(403).json({
                            error: 'access_denied',
                            error_description: 'Token contains a scope, but not one that is required for this call'
                        });
                    }
                }
            }
        }
        return apiRoute(req, res);
    });
