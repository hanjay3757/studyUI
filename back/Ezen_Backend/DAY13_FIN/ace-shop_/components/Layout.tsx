import Footer from './Footer';
import Header from './Header';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh', padding: '2rem' }}>{children}</main>
      <Footer />
    </>
  );
}
  