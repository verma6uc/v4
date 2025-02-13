import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export interface SystemHealthMetrics {
  total_requests: number;
  avg_response_time: number;
  error_rate: number;
  services: {
    name: string;
    requests: number;
    latency: number;
    error_rate: number;
  }[];
}

export interface SecurityMetrics {
  failed_logins: {
    ip_address: string;
    attempt_count: number;
    first_attempt: string;
    last_attempt: string;
  }[];
  security_events: {
    action: string;
    event_count: number;
  }[];
}

export interface GrowthMetrics {
  users: {
    total: number;
    growth_rate: number;
    active: number;
  };
  companies: {
    total: number;
    active: number;
    new_last_30_days: number;
  };
}

export interface ResourceMetrics {
  by_type: {
    resource_type: string;
    total_usage: number;
    peak_usage: number;
    avg_usage: number;
  }[];
  by_company: {
    company_name: string;
    resource_type: string;
    total_usage: number;
  }[];
}

export interface ActivityMetrics {
  hourly: {
    hour: string;
    activity_count: number;
    unique_users: number;
    avg_response_time: number;
  }[];
  feature_usage: {
    category: string;
    action: string;
    usage_count: number;
    unique_users: number;
  }[];
}

export const metricsService = {
  async getSystemHealth(): Promise<SystemHealthMetrics> {
    const { data: overall, error: overallError } = await supabase
      .rpc('get_system_health_metrics')
      .single();

    if (overallError) throw overallError;

    const { data: services, error: servicesError } = await supabase
      .rpc('get_service_health_metrics');

    if (servicesError) throw servicesError;

    return {
      ...overall,
      services
    };
  },

  async getSecurityMetrics(): Promise<SecurityMetrics> {
    const { data: failedLogins, error: loginError } = await supabase
      .rpc('get_failed_login_metrics');

    if (loginError) throw loginError;

    const { data: securityEvents, error: eventError } = await supabase
      .rpc('get_security_event_metrics');

    if (eventError) throw eventError;

    return {
      failed_logins: failedLogins,
      security_events: securityEvents
    };
  },

  async getGrowthMetrics(): Promise<GrowthMetrics> {
    const { data, error } = await supabase
      .rpc('get_growth_metrics')
      .single();

    if (error) throw error;
    return data;
  },

  async getResourceMetrics(): Promise<ResourceMetrics> {
    const { data: byType, error: typeError } = await supabase
      .rpc('get_resource_usage_by_type');

    if (typeError) throw typeError;

    const { data: byCompany, error: companyError } = await supabase
      .rpc('get_resource_usage_by_company');

    if (companyError) throw companyError;

    return {
      by_type: byType,
      by_company: byCompany
    };
  },

  async getActivityMetrics(): Promise<ActivityMetrics> {
    const { data: hourly, error: hourlyError } = await supabase
      .rpc('get_hourly_activity_metrics');

    if (hourlyError) throw hourlyError;

    const { data: featureUsage, error: featureError } = await supabase
      .rpc('get_feature_usage_metrics');

    if (featureError) throw featureError;

    return {
      hourly,
      feature_usage: featureUsage
    };
  },

  subscribeToMetrics(callback: (metrics: any) => void) {
    const channel = supabase
      .channel('metrics')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activity_logs'
        },
        (payload) => {
          // Fetch updated metrics when relevant changes occur
          this.getSystemHealth().then(metrics => callback(metrics));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};