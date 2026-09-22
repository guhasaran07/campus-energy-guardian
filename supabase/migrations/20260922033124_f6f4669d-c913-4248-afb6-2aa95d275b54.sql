CREATE TABLE public.energy_readings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_name text NOT NULL,
  power_w numeric NOT NULL,
  "timestamp" timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.energy_readings TO authenticated;
GRANT ALL ON public.energy_readings TO service_role;

ALTER TABLE public.energy_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "energy readings readable by signed-in users"
  ON public.energy_readings FOR SELECT TO authenticated USING (true);

CREATE POLICY "energy readings insertable by signed-in users"
  ON public.energy_readings FOR INSERT TO authenticated WITH CHECK (true);

CREATE INDEX energy_readings_room_time_idx ON public.energy_readings (room_name, "timestamp" DESC);

ALTER TABLE public.energy_readings REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.energy_readings;

INSERT INTO public.energy_readings (room_name, power_w, "timestamp")
SELECT r.name,
       GREATEST(0, r.baseline + (r.sigma * (0.4 - (g.i % 3) * 0.3)))::numeric(10,2),
       now() - (g.i * interval '15 minutes')
FROM public.rooms r
CROSS JOIN generate_series(1, 12) AS g(i);

INSERT INTO public.energy_readings (room_name, power_w, "timestamp")
SELECT r.name, r.current_w, now()
FROM public.rooms r;