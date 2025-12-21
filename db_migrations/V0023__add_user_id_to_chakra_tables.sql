-- Add user_id column to chakra related tables

ALTER TABLE t_p91912798_newworldcreators_pro.chakra_concepts 
ADD COLUMN IF NOT EXISTS user_id INTEGER;

ALTER TABLE t_p91912798_newworldcreators_pro.chakra_organs 
ADD COLUMN IF NOT EXISTS user_id INTEGER;

ALTER TABLE t_p91912798_newworldcreators_pro.chakra_sciences 
ADD COLUMN IF NOT EXISTS user_id INTEGER;

ALTER TABLE t_p91912798_newworldcreators_pro.chakra_responsibilities 
ADD COLUMN IF NOT EXISTS user_id INTEGER;

ALTER TABLE t_p91912798_newworldcreators_pro.chakra_basic_needs 
ADD COLUMN IF NOT EXISTS user_id INTEGER;

ALTER TABLE t_p91912798_newworldcreators_pro.chakra_questions 
ADD COLUMN IF NOT EXISTS user_id INTEGER;

-- Update existing records with user_id from export
UPDATE t_p91912798_newworldcreators_pro.chakra_concepts SET user_id = 2 WHERE id IN (1,2,3,4,5,6,7,8,55,56);
UPDATE t_p91912798_newworldcreators_pro.chakra_concepts SET user_id = 3 WHERE id IN (9,10,11,12,13,14,15,16);
UPDATE t_p91912798_newworldcreators_pro.chakra_concepts SET user_id = 4 WHERE id IN (17,57);
UPDATE t_p91912798_newworldcreators_pro.chakra_concepts SET user_id = 5 WHERE id IN (18,19,20,21,22,23,62);
UPDATE t_p91912798_newworldcreators_pro.chakra_concepts SET user_id = 6 WHERE id IN (24,25,26,27,28,29,30,31,60);
UPDATE t_p91912798_newworldcreators_pro.chakra_concepts SET user_id = 7 WHERE id IN (34,35,36,37,38,39,40,41,54);
UPDATE t_p91912798_newworldcreators_pro.chakra_concepts SET user_id = 8 WHERE id IN (42,43,58,61);
UPDATE t_p91912798_newworldcreators_pro.chakra_concepts SET user_id = 9 WHERE id IN (44,45,46,47,48,49,50,51,52,53,59);

UPDATE t_p91912798_newworldcreators_pro.chakra_organs SET user_id = 5 WHERE id IN (2,3,4);
UPDATE t_p91912798_newworldcreators_pro.chakra_organs SET user_id = 6 WHERE id IN (5,6,7,8,9);
UPDATE t_p91912798_newworldcreators_pro.chakra_organs SET user_id = 7 WHERE id IN (10,11,12,13,14,15,16);
UPDATE t_p91912798_newworldcreators_pro.chakra_organs SET user_id = 2 WHERE id IN (18,21,24);
UPDATE t_p91912798_newworldcreators_pro.chakra_organs SET user_id = 3 WHERE id IN (22,23);

UPDATE t_p91912798_newworldcreators_pro.chakra_sciences SET user_id = 5 WHERE id = 1;
UPDATE t_p91912798_newworldcreators_pro.chakra_sciences SET user_id = 6 WHERE id IN (2,3,4);
UPDATE t_p91912798_newworldcreators_pro.chakra_sciences SET user_id = 7 WHERE id IN (5,6,7,11);
UPDATE t_p91912798_newworldcreators_pro.chakra_sciences SET user_id = 2 WHERE id IN (8,9,10);

UPDATE t_p91912798_newworldcreators_pro.chakra_responsibilities SET user_id = 2 WHERE id = 1;
UPDATE t_p91912798_newworldcreators_pro.chakra_responsibilities SET user_id = 5 WHERE id = 2;

UPDATE t_p91912798_newworldcreators_pro.chakra_basic_needs SET user_id = 2 WHERE id IN (6,7,8,9,10,13);
UPDATE t_p91912798_newworldcreators_pro.chakra_basic_needs SET user_id = 8 WHERE id IN (11,12);

UPDATE t_p91912798_newworldcreators_pro.chakra_questions SET user_id = 2 WHERE id IN (1,2,3);
UPDATE t_p91912798_newworldcreators_pro.chakra_questions SET user_id = 3 WHERE id = 4;
UPDATE t_p91912798_newworldcreators_pro.chakra_questions SET user_id = 6 WHERE id = 5;
UPDATE t_p91912798_newworldcreators_pro.chakra_questions SET user_id = 7 WHERE id = 6;