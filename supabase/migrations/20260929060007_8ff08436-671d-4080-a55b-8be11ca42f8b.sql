GRANT SELECT, INSERT, UPDATE, DELETE ON public.rooms TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.alerts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.readings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.settings TO anon;
GRANT SELECT, INSERT ON public.energy_readings TO anon;

CREATE POLICY "rooms open access" ON public.rooms FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "alerts open access" ON public.alerts FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "readings open access" ON public.readings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "settings open access" ON public.settings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "energy readings open read" ON public.energy_readings FOR SELECT TO anon USING (true);
CREATE POLICY "energy readings open insert" ON public.energy_readings FOR INSERT TO anon WITH CHECK (true);