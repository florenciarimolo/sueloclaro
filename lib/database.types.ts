export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      brands: {
        Row: {
          id: number;
          name: string;
          slug: string;
        };
        Insert: {
          id?: never;
          name: string;
          slug: string;
        };
        Update: {
          id?: never;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      guides: {
        Row: {
          body: string;
          description: string;
          id: number;
          slug: string;
          status: string;
          title: string;
        };
        Insert: {
          body: string;
          description: string;
          id?: never;
          slug: string;
          status: string;
          title: string;
        };
        Update: {
          body?: string;
          description?: string;
          id?: never;
          slug?: string;
          status?: string;
          title?: string;
        };
        Relationships: [];
      };
      price_snapshots: {
        Row: {
          amount_cents: number;
          availability: string;
          currency: string;
          fetched_at: string;
          id: number;
          product_id: number;
        };
        Insert: {
          amount_cents: number;
          availability: string;
          currency?: string;
          fetched_at: string;
          id?: never;
          product_id: number;
        };
        Update: {
          amount_cents?: number;
          availability?: string;
          currency?: string;
          fetched_at?: string;
          id?: never;
          product_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "price_snapshots_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: true;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      product_variants: {
        Row: {
          asin: string;
          color: string;
          id: number;
          product_id: number;
        };
        Insert: {
          asin: string;
          color: string;
          id?: never;
          product_id: number;
        };
        Update: {
          asin?: string;
          color?: string;
          id?: never;
          product_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          asin: string;
          brand_id: number;
          carpets: boolean;
          dock: Database["public"]["Enums"]["dock_kind"];
          for_whom: string;
          gtin: string | null;
          height_mm: number | null;
          id: number;
          mop_type: string;
          name: string;
          navigation: string;
          not_for_whom: string;
          pa_suction: number;
          pet_hair: boolean;
          slug: string;
          small_flat: boolean;
          status: string;
          summary: string;
        };
        Insert: {
          asin: string;
          brand_id: number;
          carpets: boolean;
          dock: Database["public"]["Enums"]["dock_kind"];
          for_whom: string;
          gtin?: string | null;
          height_mm?: number | null;
          id?: never;
          mop_type: string;
          name: string;
          navigation: string;
          not_for_whom: string;
          pa_suction: number;
          pet_hair: boolean;
          slug: string;
          small_flat: boolean;
          status: string;
          summary: string;
        };
        Update: {
          asin?: string;
          brand_id?: number;
          carpets?: boolean;
          dock?: Database["public"]["Enums"]["dock_kind"];
          for_whom?: string;
          gtin?: string | null;
          height_mm?: number | null;
          id?: never;
          mop_type?: string;
          name?: string;
          navigation?: string;
          not_for_whom?: string;
          pa_suction?: number;
          pet_hair?: boolean;
          slug?: string;
          small_flat?: boolean;
          status?: string;
          summary?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey";
            columns: ["brand_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      dock_kind: "none" | "empty" | "wash_dry";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Brand = Database["public"]["Tables"]["brands"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductVariant =
  Database["public"]["Tables"]["product_variants"]["Row"];
export type DockKind = Database["public"]["Enums"]["dock_kind"];

export type ProductWithBrand = Product & {
  brands: Pick<Brand, "id" | "slug" | "name"> | null;
};

export type ProductWithDetails = ProductWithBrand & {
  product_variants: ProductVariant[];
};
