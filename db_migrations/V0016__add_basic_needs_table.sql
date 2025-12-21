-- Добавление таблицы базовых потребностей
CREATE TABLE IF NOT EXISTS chakra_basic_needs (
    id SERIAL PRIMARY KEY,
    chakra_id INTEGER NOT NULL,
    basic_need TEXT NOT NULL,
    description TEXT,
    user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_chakra_basic_needs_chakra ON chakra_basic_needs(chakra_id);
CREATE INDEX IF NOT EXISTS idx_chakra_basic_needs_user ON chakra_basic_needs(user_id);