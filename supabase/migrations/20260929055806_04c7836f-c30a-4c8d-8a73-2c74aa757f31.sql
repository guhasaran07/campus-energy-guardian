UPDATE public.settings SET data = data || '{"zThreshold":"2.5","minExcess":"50","minDuration":"30","sigma":"15","tariff":"10.3"}'::jsonb WHERE id='campus';
ALTER TABLE public.alerts
  ADD COLUMN IF NOT EXISTS power_w numeric,
  ADD COLUMN IF NOT EXISTS z_score numeric,
  ADD COLUMN IF NOT EXISTS wasted_kwh numeric,
  ADD COLUMN IF NOT EXISTS cost numeric;