'use client';

/**
 * Global Error Handler for Next.js App
 * 
 * This file handles unrecoverable errors at the root level.
 * It must be a client component and should not rely on any Context providers
 * as they may not be available during error states.
 * 
 * Note: This runs outside the normal React tree, so avoid using:
 * - Redux/Context hooks
 * - ThemeProvider
 * - Any stateful components that depend on providers
 */

import React from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    React.useEffect(() => {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Global error caught:', error);
        }
    }, [error]);

    return (
        <html lang="en">
            <head>
                <title>Something went wrong - CAR-dano</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body style={{
                margin: 0,
                padding: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}>
                <div style={{
                    maxWidth: '600px',
                    padding: '40px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                }}>
                    <div style={{
                        fontSize: '64px',
                        fontWeight: 'bold',
                        color: '#dc2626',
                        marginBottom: '20px',
                    }}>
                        ⚠️
                    </div>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '16px',
                    }}>
                        Something went wrong!
                    </h1>
                    <p style={{
                        fontSize: '16px',
                        color: '#6b7280',
                        marginBottom: '24px',
                        lineHeight: '1.6',
                    }}>
                        An unexpected error occurred. We're sorry for the inconvenience.
                    </p>
                    {process.env.NODE_ENV === 'development' && error.message && (
                        <div style={{
                            backgroundColor: '#fee2e2',
                            border: '1px solid #fecaca',
                            borderRadius: '4px',
                            padding: '16px',
                            marginBottom: '24px',
                            textAlign: 'left',
                        }}>
                            <p style={{
                                fontSize: '14px',
                                fontFamily: 'monospace',
                                color: '#991b1b',
                                margin: 0,
                                wordBreak: 'break-word',
                            }}>
                                <strong>Error:</strong> {error.message}
                            </p>
                            {error.digest && (
                                <p style={{
                                    fontSize: '12px',
                                    color: '#7f1d1d',
                                    margin: '8px 0 0 0',
                                }}>
                                    Digest: {error.digest}
                                </p>
                            )}
                        </div>
                    )}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <button
                            onClick={reset}
                            style={{
                                padding: '12px 24px',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: 'white',
                                backgroundColor: '#2563eb',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#1d4ed8';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#2563eb';
                            }}
                        >
                            Try again
                        </button>
                        <a
                            href="/"
                            style={{
                                padding: '12px 24px',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#2563eb',
                                backgroundColor: 'white',
                                border: '2px solid #2563eb',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                display: 'inline-block',
                                transition: 'all 0.2s',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#eff6ff';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                            }}
                        >
                            Go to Homepage
                        </a>
                    </div>
                </div>
            </body>
        </html>
    );
}
