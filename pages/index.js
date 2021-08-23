import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="p-2 shadow rounded bg-blue-900">
            <Head>
                <title>D&amp;D Tools</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="p-4 shadow rounded bg-white">
                <h1 className="font-bold mb-4">Tools Index</h1>
                <ul>
                    <li>
                        <Link href="/hp-tracker">
                            <a className="text-blue-400 hover:text-blue-700 transition-colors duration-300">
                                HP Tracker
                            </a>
                        </Link>
                    </li>
                </ul>
            </main>
        </div>
    );
}
