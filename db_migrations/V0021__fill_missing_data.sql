-- Добавление недостающих полей и данных

-- 1. Добавляем поле telegram_group_id в users
ALTER TABLE t_p91912798_newworldcreators_pro.users 
ADD COLUMN IF NOT EXISTS telegram_group_id VARCHAR(255);

-- 2. Обновляем Татьяну - добавляем telegram данные
UPDATE t_p91912798_newworldcreators_pro.users 
SET 
  chakra_id = 1,
  telegram_id = '987654321',
  telegram_username = 'Татьяна',
  is_admin = FALSE,
  telegram_group_id = '-1001234567890'
WHERE id = 2;

-- 3. Обновляем telegram_group_id для админов
UPDATE t_p91912798_newworldcreators_pro.users 
SET telegram_group_id = '-1001234567890'
WHERE id IN (6, 10);

-- 4. Обновляем континенты для всех чакр
UPDATE t_p91912798_newworldcreators_pro.chakras SET continent = 'Антарктида' WHERE id = 1;
UPDATE t_p91912798_newworldcreators_pro.chakras SET continent = 'Европа' WHERE id = 2;
UPDATE t_p91912798_newworldcreators_pro.chakras SET continent = 'Азия' WHERE id = 3;
UPDATE t_p91912798_newworldcreators_pro.chakras SET continent = 'Африка' WHERE id = 4;
UPDATE t_p91912798_newworldcreators_pro.chakras SET continent = 'Северная Америка' WHERE id = 5;
UPDATE t_p91912798_newworldcreators_pro.chakras SET continent = 'Южная Америка' WHERE id = 6;
UPDATE t_p91912798_newworldcreators_pro.chakras SET continent = 'Австралия' WHERE id = 7;