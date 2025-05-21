import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Login attempt body:', body);
        const { username, password } = body;

        if (username === 'admin' && password === 'password') {
            const token = await new SignJWT({
                id: 1,
                name: 'Admin Demo',
                role: 'admin'
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('24h')
                .sign(SECRET_KEY);

            // Create response with success message
            const response = NextResponse.json(
                { success: true },
                {
                    status: 200,
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }
            );

            // Set cookie with token directly on the response
            response.cookies.set('auth-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24,
                path: '/' // Ensure cookie is accessible from any path
            });

            return response;
        }

        return NextResponse.json(
            { success: false, error: 'Invalid credentials' },
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            {
                status: 500,
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
        );
    }
}
