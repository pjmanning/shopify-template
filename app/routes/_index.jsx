import {Await, useLoaderData, Link} from 'react-router';
import {Suspense} from 'react';
import {ProductItem} from '~/components/ProductItem';
import {brand} from '~/lib/branding';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: `${brand.name} | Home (TEMPLATE)`}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

/**
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);

  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    featuredCollection: collections.nodes[0] ?? null,
  };
}

/**
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context}) {
  const featuredProducts = context.storefront
    .query(FEATURED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {featuredProducts};
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  return (
    <div className="home">
      <Hero />
      <FeaturedProductsStub
        products={data.featuredProducts}
        isShopLinked={data.isShopLinked}
      />
      <FeaturedCollectionStub collection={data.featuredCollection} />
    </div>
  );
}

function Hero() {
  const {hero, name} = brand;

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <p className="hero-brand">{name}</p>
      <h1 id="hero-heading">{hero.headline}</h1>
      <p className="hero-subhead">{hero.subhead}</p>
      <div className="hero-actions">
        <Link className="button-primary" to={hero.ctaHref}>
          {hero.ctaLabel}
        </Link>
        <Link className="button-ghost" to="/cart">
          Cart stub
        </Link>
      </div>
    </section>
  );
}

/**
 * @param {{
 *   products: Promise<FeaturedProductsQuery | null>;
 *   isShopLinked: boolean;
 * }}
 */
function FeaturedProductsStub({products, isShopLinked}) {
  return (
    <section
      className="featured-products"
      aria-labelledby="featured-products-heading"
    >
      <div className="section-heading">
        <h2 id="featured-products-heading">Featured products</h2>
        <p>
          Stub grid —{' '}
          {isShopLinked
            ? 'showing products from your linked store.'
            : 'showing mock.shop demo products until you link a store.'}
        </p>
      </div>
      <Suspense fallback={<div className="stub-grid loading">Loading…</div>}>
        <Await resolve={products}>
          {(response) => {
            const nodes = response?.products?.nodes ?? [];
            if (!nodes.length) {
              return (
                <div className="stub-grid empty">
                  <StubProductCard title="Product A" price="$00.00" />
                  <StubProductCard title="Product B" price="$00.00" />
                  <StubProductCard title="Product C" price="$00.00" />
                  <StubProductCard title="Product D" price="$00.00" />
                </div>
              );
            }
            return (
              <div className="recommended-products-grid">
                {nodes.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}

/**
 * @param {{collection: FeaturedCollectionFragment | null}}
 */
function FeaturedCollectionStub({collection}) {
  return (
    <section
      className="featured-collection-stub"
      aria-labelledby="featured-collection-heading"
    >
      <div className="section-heading">
        <h2 id="featured-collection-heading">Featured collection</h2>
        <p>Collection page stub entry point.</p>
      </div>
      {collection ? (
        <Link
          className="collection-card"
          to={`/collections/${collection.handle}`}
        >
          <span className="collection-card-label">Collection</span>
          <strong>{collection.title}</strong>
          <span className="collection-card-cta">View collection →</span>
        </Link>
      ) : (
        <Link className="collection-card" to="/collections">
          <span className="collection-card-label">Collection</span>
          <strong>All products</strong>
          <span className="collection-card-cta">Browse collections →</span>
        </Link>
      )}
    </section>
  );
}

function StubProductCard({title, price}) {
  return (
    <div className="stub-product-card">
      <div className="stub-product-image" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{price}</p>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const FEATURED_PRODUCTS_QUERY = `#graphql
  fragment FeaturedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query FeaturedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').FeaturedProductsQuery} FeaturedProductsQuery */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
