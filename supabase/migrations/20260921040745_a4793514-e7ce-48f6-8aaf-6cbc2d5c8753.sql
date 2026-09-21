CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  display_name TEXT NOT NULL DEFAULT 'Campus User',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1), 'Campus User'))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  building TEXT NOT NULL,
  current_w NUMERIC NOT NULL DEFAULT 0,
  baseline NUMERIC NOT NULL DEFAULT 0,
  sigma NUMERIC NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'Normal',
  last_updated TEXT NOT NULL DEFAULT 'Just now',
  daily NUMERIC NOT NULL DEFAULT 0,
  duration NUMERIC NOT NULL DEFAULT 0,
  waste NUMERIC NOT NULL DEFAULT 0,
  cost NUMERIC NOT NULL DEFAULT 0,
  z_score NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rooms TO authenticated;
GRANT ALL ON public.rooms TO service_role;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rooms shared access" ON public.rooms FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER rooms_updated_at BEFORE UPDATE ON public.rooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.alerts (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  severity TEXT NOT NULL,
  detected_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.alerts TO authenticated;
GRANT ALL ON public.alerts TO service_role;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "alerts shared access" ON public.alerts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER alerts_updated_at BEFORE UPDATE ON public.alerts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  value NUMERIC NOT NULL,
  z_score NUMERIC NOT NULL DEFAULT 0,
  excess NUMERIC NOT NULL DEFAULT 0,
  waste NUMERIC NOT NULL DEFAULT 0,
  cost NUMERIC NOT NULL DEFAULT 0,
  verdict TEXT NOT NULL DEFAULT 'Normal',
  severity TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.readings TO authenticated;
GRANT ALL ON public.readings TO service_role;
ALTER TABLE public.readings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "readings shared access" ON public.readings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE INDEX readings_room_created_idx ON public.readings (room_id, created_at DESC);

CREATE TABLE public.settings (
  id TEXT PRIMARY KEY DEFAULT 'campus',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings shared access" ON public.settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER settings_updated_at BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.rooms (id, name, building, current_w, baseline, sigma, status, last_updated, daily, duration, waste, cost, z_score) VALUES
('cs-lab-1','CS Lab 1','Computer Science Block',1622,21,6,'Leak Detected','1 min ago',8.9,3,4.8,49,266.8),
('cs-lab-2','CS Lab 2','Computer Science Block',238,221,22,'Normal','2 min ago',5.7,0,0,0,0.77),
('mechanical-lab-1','Mechanical Lab 1','Mechanical Block',1809,16,3,'Leak Detected','Just now',11.4,5,8.97,92,597.7),
('mechanical-lab-2','Mechanical Lab 2','Mechanical Block',418,380,38,'Warning','4 min ago',8.2,0.5,0.02,0.2,1),
('library-hall','Library Hall','Library',68,61,9,'Normal','3 min ago',3.4,0,0,0,0.78),
('classroom-101','Classroom 101','Classroom Block',212,204,31,'Normal','5 min ago',4.1,0,0,0,0.26),
('classroom-102','Classroom 102','Classroom Block',294,210,31,'Warning','6 min ago',5.3,1,0.08,0.87,2.71),
('hostel-block-a','Hostel Block A','Hostel Block A',1500,462,69,'Leak Detected','2 min ago',31.2,4,4.16,43,15.04);

INSERT INTO public.alerts (id, room_id, severity, detected_at, status) VALUES
('ALT-1042','cs-lab-1','Critical','Today, 11:08','Active'),
('ALT-1041','hostel-block-a','High','Today, 10:12','Active'),
('ALT-1039','mechanical-lab-1','Critical','Today, 09:03','Active'),
('ALT-1035','classroom-102','Medium','Yesterday, 16:45','Resolved'),
('ALT-1028','library-hall','Low','18 Sep, 20:10','Dismissed');

INSERT INTO public.settings (id, data) VALUES ('campus', '{"zThreshold":"3","minExcess":"40","minDuration":"15","tariff":"10.3","email":true,"push":true,"critical":true}'::jsonb);