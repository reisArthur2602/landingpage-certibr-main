import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 180,
                    height: 180,
                    borderRadius: 40,
                    background: '#039855',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                }}
            >
                {/* Shield */}
                <svg
                    width="72"
                    height="72"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                </svg>

                {/* Wordmark */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        fontFamily: 'sans-serif',
                        fontWeight: 800,
                        fontSize: 26,
                        letterSpacing: '-0.5px',
                        lineHeight: 1,
                    }}
                >
                    <span style={{ color: 'white' }}>certi</span>
                    <span style={{ color: '#a6f4c5' }}>BR</span>
                </div>
            </div>
        ),
        { ...size },
    );
}
