import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'TableMate - Resource Management System',
    description: 'Manage your office resources, reservations, and IT equipment',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${inter.className} overflow-hidden`}>
        <div className="main-container h-screen">
            <Header />
            <main className="content-wrapper max-w-7xl mx-auto w-full p-6 fade-in">
                {children}
            </main>
            <Footer />
        </div>
        </body>
        </html>
    );
}
