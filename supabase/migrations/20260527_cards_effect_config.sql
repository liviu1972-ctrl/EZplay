-- Add JSONB column to store the programmable effect configuration
ALTER TABLE cards
ADD COLUMN IF NOT EXISTS effect_config JSONB;
