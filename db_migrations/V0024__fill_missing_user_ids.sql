-- Fill missing user_id values based on chakra_id

UPDATE t_p91912798_newworldcreators_pro.chakra_organs 
SET user_id = 2 
WHERE chakra_id = 1 AND user_id IS NULL;

UPDATE t_p91912798_newworldcreators_pro.chakra_organs 
SET user_id = 6 
WHERE chakra_id = 4 AND user_id IS NULL;

UPDATE t_p91912798_newworldcreators_pro.chakra_organs 
SET user_id = 7 
WHERE chakra_id = 5 AND user_id IS NULL;

UPDATE t_p91912798_newworldcreators_pro.chakra_concepts 
SET user_id = (SELECT responsible_user_id FROM t_p91912798_newworldcreators_pro.chakras WHERE id = chakra_concepts.chakra_id)
WHERE user_id IS NULL;

UPDATE t_p91912798_newworldcreators_pro.chakra_sciences 
SET user_id = (SELECT responsible_user_id FROM t_p91912798_newworldcreators_pro.chakras WHERE id = chakra_sciences.chakra_id)
WHERE user_id IS NULL;

UPDATE t_p91912798_newworldcreators_pro.chakra_responsibilities 
SET user_id = (SELECT responsible_user_id FROM t_p91912798_newworldcreators_pro.chakras WHERE id = chakra_responsibilities.chakra_id)
WHERE user_id IS NULL;

UPDATE t_p91912798_newworldcreators_pro.chakra_basic_needs 
SET user_id = (SELECT responsible_user_id FROM t_p91912798_newworldcreators_pro.chakras WHERE id = chakra_basic_needs.chakra_id)
WHERE user_id IS NULL;

UPDATE t_p91912798_newworldcreators_pro.chakra_questions 
SET user_id = (SELECT responsible_user_id FROM t_p91912798_newworldcreators_pro.chakras WHERE id = chakra_questions.chakra_id)
WHERE user_id IS NULL;