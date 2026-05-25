export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      asset_types: {
        Row: {
          id: number
          name_en: string
          name_ro: string
          slug: string
        }
        Insert: {
          id?: number
          name_en: string
          name_ro: string
          slug: string
        }
        Update: {
          id?: number
          name_en?: string
          name_ro?: string
          slug?: string
        }
        Relationships: []
      }
      card_set_games: {
        Row: {
          card_set_id: number
          game_id: number
        }
        Insert: {
          card_set_id: number
          game_id: number
        }
        Update: {
          card_set_id?: number
          game_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "card_set_games_card_set_id_fkey"
            columns: ["card_set_id"]
            isOneToOne: false
            referencedRelation: "card_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_set_games_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      card_sets: {
        Row: {
          created_at: string | null
          description_en: string | null
          description_ro: string | null
          id: number
          is_active: boolean | null
          is_base: boolean | null
          name_en: string
          name_ro: string
          price: number | null
          released_at: string | null
          slug: string
          sort_order: number | null
          version: string
        }
        Insert: {
          created_at?: string | null
          description_en?: string | null
          description_ro?: string | null
          id?: number
          is_active?: boolean | null
          is_base?: boolean | null
          name_en: string
          name_ro: string
          price?: number | null
          released_at?: string | null
          slug: string
          sort_order?: number | null
          version?: string
        }
        Update: {
          created_at?: string | null
          description_en?: string | null
          description_ro?: string | null
          id?: number
          is_active?: boolean | null
          is_base?: boolean | null
          name_en?: string
          name_ro?: string
          price?: number | null
          released_at?: string | null
          slug?: string
          sort_order?: number | null
          version?: string
        }
        Relationships: []
      }
      card_types: {
        Row: {
          id: number
          name_en: string
          name_ro: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          id?: number
          name_en: string
          name_ro: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          id?: number
          name_en?: string
          name_ro?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      cards: {
        Row: {
          asset_type_id: number | null
          calculation: string | null
          card_set_id: number | null
          card_type_id: number | null
          cost: number | null
          created_at: string | null
          expense: number | null
          external_id: string
          format: string | null
          id: number
          image_card: string | null
          image_full: string | null
          image_micro: string | null
          image_thumb: string | null
          is_active: boolean | null
          marketing: number | null
          name_en: string
          name_ro: string
          production: number | null
          slug: string
          sort_order: number | null
          special_effect_en: string | null
          special_effect_ro: string | null
          updated_at: string | null
        }
        Insert: {
          asset_type_id?: number | null
          calculation?: string | null
          card_set_id?: number | null
          card_type_id?: number | null
          cost?: number | null
          created_at?: string | null
          expense?: number | null
          external_id: string
          format?: string | null
          id?: number
          image_card?: string | null
          image_full?: string | null
          image_micro?: string | null
          image_thumb?: string | null
          is_active?: boolean | null
          marketing?: number | null
          name_en: string
          name_ro: string
          production?: number | null
          slug: string
          sort_order?: number | null
          special_effect_en?: string | null
          special_effect_ro?: string | null
          updated_at?: string | null
        }
        Update: {
          asset_type_id?: number | null
          calculation?: string | null
          card_set_id?: number | null
          card_type_id?: number | null
          cost?: number | null
          created_at?: string | null
          expense?: number | null
          external_id?: string
          format?: string | null
          id?: number
          image_card?: string | null
          image_full?: string | null
          image_micro?: string | null
          image_thumb?: string | null
          is_active?: boolean | null
          marketing?: number | null
          name_en?: string
          name_ro?: string
          production?: number | null
          slug?: string
          sort_order?: number | null
          special_effect_en?: string | null
          special_effect_ro?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_asset_type_id_fkey"
            columns: ["asset_type_id"]
            isOneToOne: false
            referencedRelation: "asset_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_card_set_id_fkey"
            columns: ["card_set_id"]
            isOneToOne: false
            referencedRelation: "card_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_card_type_id_fkey"
            columns: ["card_type_id"]
            isOneToOne: false
            referencedRelation: "card_types"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string | null
          description_en: string | null
          description_ro: string | null
          id: number
          is_active: boolean | null
          name_en: string
          name_ro: string
          slug: string
          sort_order: number | null
          version: string
        }
        Insert: {
          created_at?: string | null
          description_en?: string | null
          description_ro?: string | null
          id?: number
          is_active?: boolean | null
          name_en: string
          name_ro: string
          slug: string
          sort_order?: number | null
          version?: string
        }
        Update: {
          created_at?: string | null
          description_en?: string | null
          description_ro?: string | null
          id?: number
          is_active?: boolean | null
          name_en?: string
          name_ro?: string
          slug?: string
          sort_order?: number | null
          version?: string
        }
        Relationships: []
      }
      token_transactions: {
        Row: {
          created_at: string | null
          delta: number
          id: string
          reason: string
          reference_id: string | null
          reference_type: string | null
          token_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          delta: number
          id?: string
          reason: string
          reference_id?: string | null
          reference_type?: string | null
          token_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          delta?: number
          id?: string
          reason?: string
          reference_id?: string | null
          reference_type?: string | null
          token_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_owned_sets: {
        Row: {
          acquired_at: string | null
          card_set_id: number | null
          id: number
          source: string | null
          user_id: string | null
        }
        Insert: {
          acquired_at?: string | null
          card_set_id?: number | null
          id?: number
          source?: string | null
          user_id?: string | null
        }
        Update: {
          acquired_at?: string | null
          card_set_id?: number | null
          id?: number
          source?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_owned_sets_card_set_id_fkey"
            columns: ["card_set_id"]
            isOneToOne: false
            referencedRelation: "card_sets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string
          id: string
          metadata: Json | null
          onboarding_completed: boolean | null
          preferred_language: string | null
          role: string
          skill_interests: string[] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name: string
          id: string
          metadata?: Json | null
          onboarding_completed?: boolean | null
          preferred_language?: string | null
          role?: string
          skill_interests?: string[] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string
          id?: string
          metadata?: Json | null
          onboarding_completed?: boolean | null
          preferred_language?: string | null
          role?: string
          skill_interests?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_skills: {
        Row: {
          level: number | null
          skill: string
          user_id: string
          xp: number | null
        }
        Insert: {
          level?: number | null
          skill: string
          user_id: string
          xp?: number | null
        }
        Update: {
          level?: number | null
          skill?: string
          user_id?: string
          xp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          ezc_balance: number
          ezg_balance: number
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ezc_balance?: number
          ezg_balance?: number
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ezc_balance?: number
          ezg_balance?: number
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
