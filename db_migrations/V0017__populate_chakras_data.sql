-- Заполнение таблиц данными из старой системы (без user_id)

-- Муладхара (1)
INSERT INTO chakra_concepts (chakra_id, concept, category) VALUES
(1, 'Гармония', 'основная'),
(1, 'Жизнь', 'основная'),
(1, 'Импульс', 'основная'),
(1, 'Стыд/Вина', 'основная'),
(1, 'Справедливость', 'основная'),
(1, 'Частоты', 'основная'),
(1, 'Циклы', 'основная'),
(1, 'Смерть', 'основная'),
(1, 'Бытия', 'основная'),
(1, 'Звучания (радиоволны)', 'основная'),
(1, 'Секс', 'основная');

INSERT INTO chakra_organs (chakra_id, organ_name, description) VALUES
(1, 'Мочевой пузырь', ''),
(1, 'Репродуктивные органы', 'Влагалище, Пенис, Яичники, Яички'),
(1, 'Ноги', '');

INSERT INTO chakra_sciences (chakra_id, science_name, description) VALUES
(1, 'Химия', 'Первые 5 химических элементов: водород, гелий, литий, бериллий, бор'),
(1, 'Анатомия', ''),
(1, 'Биология', '');

INSERT INTO chakra_responsibilities (chakra_id, responsibility) VALUES
(1, 'Государство');

INSERT INTO chakra_questions (chakra_id, question, is_resolved) VALUES
(1, 'Режим тела/здоровье/еда', false),
(1, 'Гигиена/чистота', false),
(1, 'Исцеление', false);

-- Свадхистана (2)
INSERT INTO chakra_concepts (chakra_id, concept, category) VALUES
(2, 'Границы функций', 'основная'),
(2, 'Комфорт', 'основная'),
(2, 'Осознанность', 'основная'),
(2, 'Веселье', 'основная'),
(2, 'Прибыль', 'основная'),
(2, 'Присутствие', 'основная'),
(2, 'Пространство личное', 'основная'),
(2, 'Границы личные', 'основная');

INSERT INTO chakra_organs (chakra_id, organ_name, description) VALUES
(2, 'Простата', ''),
(2, 'Матка', '');

INSERT INTO chakra_questions (chakra_id, question, is_resolved) VALUES
(2, 'Разум? Материализация? (пересечение с 4)', false);

-- Манипура (3)
INSERT INTO chakra_concepts (chakra_id, concept, category) VALUES
(3, 'Власть', 'основная'),
(3, 'Сила', 'основная'),
(3, 'Воля', 'основная'),
(3, 'Контроль', 'основная');

INSERT INTO chakra_organs (chakra_id, organ_name, description) VALUES
(3, 'Желудок', ''),
(3, 'Печень', ''),
(3, 'Поджелудочная железа', '');

-- Анахата (4)
INSERT INTO chakra_concepts (chakra_id, concept, category) VALUES
(4, 'Любовь', 'основная'),
(4, 'Принятие', 'основная'),
(4, 'Сострадание', 'основная');

INSERT INTO chakra_organs (chakra_id, organ_name, description) VALUES
(4, 'Сердце', ''),
(4, 'Легкие', '');

-- Вишудха (5)
INSERT INTO chakra_concepts (chakra_id, concept, category) VALUES
(5, 'Общение', 'основная'),
(5, 'Самовыражение', 'основная'),
(5, 'Правда', 'основная');

INSERT INTO chakra_organs (chakra_id, organ_name, description) VALUES
(5, 'Горло', ''),
(5, 'Щитовидная железа', '');

-- Аджна (6)
INSERT INTO chakra_concepts (chakra_id, concept, category) VALUES
(6, 'Интуиция', 'основная'),
(6, 'Видение', 'основная'),
(6, 'Мудрость', 'основная');

INSERT INTO chakra_organs (chakra_id, organ_name, description) VALUES
(6, 'Гипофиз', ''),
(6, 'Глаза', '');

-- Сахасрара (7)
INSERT INTO chakra_concepts (chakra_id, concept, category) VALUES
(7, 'Единство', 'основная'),
(7, 'Просветление', 'основная'),
(7, 'Связь с высшим', 'основная');

INSERT INTO chakra_organs (chakra_id, organ_name, description) VALUES
(7, 'Эпифиз', ''),
(7, 'Кора головного мозга', '');