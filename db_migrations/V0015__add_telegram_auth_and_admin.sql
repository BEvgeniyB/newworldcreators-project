-- Добавление полей для Telegram аутентификации
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS telegram_id VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS telegram_username VARCHAR(255);

-- Создание первого админа
INSERT INTO users (name, email, role, is_admin, telegram_id, telegram_username) 
VALUES ('Admin', 'admin@chakracraft.com', 'admin', true, '123456789', 'admin')
ON CONFLICT (email) DO NOTHING;