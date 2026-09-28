create type public.dock_kind as enum ('none', 'empty', 'wash_dry');

create table public.brands (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null
);

create table public.products (
  id bigint generated always as identity primary key,
  slug text not null unique,
  brand_id bigint not null references public.brands (id),
  name text not null,
  asin text not null,
  gtin text,
  pa_suction integer not null,
  navigation text not null,
  mop_type text not null,
  dock public.dock_kind not null,
  pet_hair boolean not null,
  carpets boolean not null,
  small_flat boolean not null,
  height_mm integer,
  for_whom text not null,
  not_for_whom text not null,
  summary text not null,
  status text not null check (status in ('draft', 'published')),
  constraint products_asin_format check (asin ~ '^B0[A-Z0-9]{8}$')
);

create index products_brand_id_idx on public.products (brand_id);
create index products_status_idx on public.products (status);

create table public.product_variants (
  id bigint generated always as identity primary key,
  product_id bigint not null references public.products (id),
  color text not null,
  asin text not null,
  unique (product_id, asin),
  constraint product_variants_asin_format check (asin ~ '^B0[A-Z0-9]{8}$')
);

create index product_variants_product_id_idx on public.product_variants (product_id);

create table public.guides (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  description text not null,
  body text not null,
  status text not null check (status in ('draft', 'published'))
);

create table public.price_snapshots (
  id bigint generated always as identity primary key,
  product_id bigint not null unique references public.products (id),
  amount_cents integer not null,
  currency text not null default 'EUR',
  availability text not null,
  fetched_at timestamptz not null
);

alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.guides enable row level security;
alter table public.price_snapshots enable row level security;

revoke all on public.brands, public.products, public.product_variants, public.guides, public.price_snapshots
  from anon, authenticated;

grant select on public.brands, public.products, public.product_variants, public.guides
  to anon, authenticated;

create policy brands_select_public
  on public.brands
  for select
  to anon, authenticated
  using (true);

create policy products_select_published
  on public.products
  for select
  to anon, authenticated
  using (status = 'published');

create policy product_variants_select_published
  on public.product_variants
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.products
      where products.id = product_variants.product_id
        and products.status = 'published'
    )
  );

create policy guides_select_published
  on public.guides
  for select
  to anon, authenticated
  using (status = 'published');
