export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          role: 'SUPER_ADMIN' | 'CREATOR'
          created_at: string
          updated_at: string
        }
        Insert: Omit<UserProfiles['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserProfiles['Row'], 'id'>>
      }
      users: {
        Row: {
          id: string
          email: string
          firstName: string
          lastName: string
          status: string
          createdAt: string
          updatedAt: string
          activatedAt: string | null
          lastLoginAt: string | null
        }
        Insert: Omit<Users['Row'], 'id' | 'createdAt' | 'updatedAt'>
        Update: Partial<Omit<Users['Row'], 'id'>>
      }
      companies: {
        Row: {
          id: string
          name: string
          identifier: string
          status: string
          primaryEmail: string
          primaryPhone: string | null
          website: string | null
          createdAt: string
          updatedAt: string
          activatedAt: string | null
          suspendedAt: string | null
          suspendedReason: string | null
          archivedAt: string | null
          archivedReason: string | null
        }
        Insert: Omit<Companies['Row'], 'id' | 'createdAt' | 'updatedAt'>
        Update: Partial<Omit<Companies['Row'], 'id'>>
      }
      audit_logs: {
        Row: {
          id: string
          timestamp: string
          action: string
          category: string
          severity: string
          actor: string
          entity: string
          entityId: string
          details: Record<string, any>
          ip: string
          userAgent: string
          companyId: string | null
          spaceId: string | null
          applicationId: string | null
        }
        Insert: Omit<AuditLogs['Row'], 'id' | 'timestamp'>
        Update: never // Audit logs should never be updated
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
  }
}

// Helper types
type Users = Database['public']['Tables']['users']
type Companies = Database['public']['Tables']['companies']
type AuditLogs = Database['public']['Tables']['audit_logs']
type UserProfiles = Database['public']['Tables']['user_profiles']