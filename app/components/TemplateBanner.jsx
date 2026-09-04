/**
 * Persistent reminder that this repo is a TEMPLATE, not a live brand.
 */
export function TemplateBanner() {
  return (
    <div className="template-banner" role="status">
      <strong>TEMPLATE</strong>
      <span>
        Placeholder storefront — rename branding in{' '}
        <code>app/lib/branding.js</code>, then connect your Shopify store.
      </span>
    </div>
  );
}
