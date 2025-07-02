// pages/products/[id].tsx
import { GetServerSideProps } from 'next';
import ProductDetail from '@/components/products/ProductDetail';
import type { Product } from '@/types/Product';


interface Props {
  product: Product;
}

export default function ProductDetailPage({ product }: Props) {
  return <ProductDetail product={product} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  const res = await fetch(`http://localhost:7777/api/products/${id}`);
  if (!res.ok) {
    return { notFound: true };
  }

  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};
