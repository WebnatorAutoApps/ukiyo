-- Add enabled column to mochis table
-- All existing mochis default to enabled (no data disruption)
ALTER TABLE public.mochis ADD COLUMN enabled boolean NOT NULL DEFAULT true;
