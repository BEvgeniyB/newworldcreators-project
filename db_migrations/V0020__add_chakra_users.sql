-- Добавление пользователей в систему чакр
INSERT INTO t_p91912798_newworldcreators_pro.users (id, name, email, password_hash, role, chakra_id, created_at, updated_at, telegram_id, telegram_username, is_admin) VALUES
(3, 'Ира Цветкова', 'ira.tsvetkova@placeholder.local', NULL, 'responsible', 2, '2025-11-23 15:50:40.332865', '2025-11-23 15:50:40.332865', NULL, 'IrinaZvet', FALSE),
(4, 'Денис', 'denis@placeholder.local', NULL, 'responsible', 2, '2025-11-23 15:50:40.332865', '2025-11-23 15:50:40.332865', NULL, 'Rodenerg', FALSE),
(5, 'Светлана Целитель', 'svetlana.tselitel@placeholder.local', NULL, 'responsible', 3, '2025-11-23 15:50:40.332865', '2025-11-23 15:50:40.332865', NULL, 'Svetlichok2611', FALSE),
(6, 'Наталья Великая', 'natalya.velikaya@placeholder.local', NULL, 'responsible', 4, '2025-11-23 15:50:40.332865', '2025-11-23 15:50:40.332865', '123456789', 'velikaya_nataliya', TRUE),
(7, 'Ангелина Астахова', 'angelina.astahova@placeholder.local', NULL, 'responsible', 5, '2025-11-23 15:50:40.332865', '2025-11-23 15:50:40.332865', NULL, 'AngelinaAst', FALSE),
(8, 'Наташа', 'natasha@placeholder.local', NULL, 'responsible', 6, '2025-11-23 15:50:40.332865', '2025-11-23 15:50:40.332865', NULL, 'natalidolzh78', FALSE),
(9, 'Андрей Казаков', 'andrey.kazakov@placeholder.local', NULL, 'responsible', 7, '2025-11-23 15:50:40.332865', '2025-11-23 15:50:40.332865', NULL, 'andrey_kazakoff', FALSE),
(10, 'Евгений Белов', 'admin@test.com', NULL, 'admin', 4, '2025-11-24 04:24:29.242782', '2025-11-24 04:24:29.242782', NULL, 'masterbe1968', TRUE);