import { useRouter } from 'next/router';
import ProductList from '@/components/products/ProductList';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface Props {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  sort: string;
}

export default function AllProductsPage({ products, totalCount, totalPages, currentPage, sort }: Props) {
  const router = useRouter();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    router.push(`/products?sort=${selectedSort}&page=1`); // 정렬 바꾸면 1페이지로 이동
  };

  const handlePageChange = (page: number) => {
    router.push(`/products?sort=${sort}&page=${page}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛍️ 전체 상품 </h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          정렬:
          <select value={sort} onChange={handleSortChange} style={{ marginLeft: 8 }}>
            <option value="latest">최신순</option>
            <option value="price_asc">가격 낮은순</option>
            <option value="price_desc">가격 높은순</option>
          </select>
        </label>
        <span style={{marginLeft:'1rem'}}>총 상품 개수 : {totalCount}개</span>
      </div>

      <div style={{ padding: '1rem' }}>
        <ProductList products={products} />
      </div>

      {/* 페이지네이션 */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', justifyContent:'center' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: i + 1 === currentPage ? '#6b8e23' : '#f0f0f0',
              color: i + 1 === currentPage ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const sort = context.query.sort || 'latest';
  const page = parseInt(context.query.page) || 1;
  const limit = 10; // 한 페이지당 상품 수

  let orderBy = 'id DESC'; // 기본: 최신순
  if (sort === 'price_asc') orderBy = 'price ASC';
  if (sort === 'price_desc') orderBy = 'price DESC';

  const queryString = `order=${encodeURIComponent(orderBy)}&page=${page}&limit=${limit}`;
  const url = `http://localhost:7777/api/products?${queryString}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      props: {
        products: data.products,
        totalCount: data.totalCount,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        sort,
      },
    };
  } catch (err) {
    console.error('상품 불러오기 실패:', err);
    return {
      props: {
        products: [],
        totalCount:0,
        totalPages: 0,
        currentPage: 1,
        sort,
      },
    };
  }
}

