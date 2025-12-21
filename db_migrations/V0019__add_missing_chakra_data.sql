-- Добавление недостающих зон ответственности
INSERT INTO chakra_responsibilities (chakra_id, responsibility, category) VALUES
(3, 'Законы', 'Зона ответственности');

-- Добавление недостающих предметов/наук
INSERT INTO chakra_sciences (chakra_id, science_name, description) VALUES
(4, 'Физика', NULL),
(4, 'Обществознание', NULL),
(4, 'Семейный кодекс', NULL),
(5, 'Русский язык', NULL),
(5, 'Литература', NULL),
(5, 'Ораторское искусство', NULL);

-- Добавление недостающих органов
INSERT INTO chakra_organs (chakra_id, organ_name, description) VALUES
(1, 'Половые органы', NULL),
(3, 'Селезенка', NULL),
(4, 'Грудная клетка', NULL),
(4, 'Руки', NULL),
(4, 'ВСД', NULL),
(5, 'Трахея', NULL),
(5, 'Шея', NULL),
(5, 'Язык', NULL),
(5, 'Зубы', NULL),
(5, 'Рот', NULL);

-- Добавление недостающих вопросов
INSERT INTO chakra_questions (chakra_id, question, is_resolved) VALUES
(1, 'Целительство 4', false),
(4, 'Материализация? (пересечение с 2)', false),
(5, 'Галактическая часть?', false);