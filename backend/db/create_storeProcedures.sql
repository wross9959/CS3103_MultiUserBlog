
DROP PROCEDURE IF EXISTS create_user;
DELIMITER $$
CREATE PROCEDURE create_user( IN p_username VARCHAR(80), IN p_email VARCHAR(120), IN p_first_name VARCHAR(50), IN p_last_name VARCHAR(50), IN p_password VARCHAR(255), IN p_active BOOLEAN, IN p_admin BOOLEAN
)
BEGIN
    INSERT INTO users (username, email, first_name, last_name, password, active, admin, created_at)
    VALUES (p_username, p_email, p_first_name, p_last_name, p_password, p_active, p_admin, NOW());
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS get_all_users;
DELIMITER $$
CREATE PROCEDURE get_all_users()
BEGIN
    SELECT * FROM users;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS get_user_by_id;
DELIMITER $$
CREATE PROCEDURE get_user_by_id(IN p_user_id INT)
BEGIN
    SELECT * FROM users WHERE id = p_user_id;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS login_user;
DELIMITER $$
CREATE PROCEDURE login_user(IN p_email VARCHAR(120), IN p_password VARCHAR(255))
BEGIN
    SELECT * FROM users WHERE email = p_email AND password = p_password;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS update_user;
DELIMITER $$
CREATE PROCEDURE update_user(
    IN p_user_id INT,
    IN p_username VARCHAR(80),
    IN p_email VARCHAR(120),
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_active BOOLEAN,
    IN p_admin BOOLEAN
)
BEGIN
    UPDATE users
    SET username = p_username, email = p_email, first_name = p_first_name, last_name = p_last_name,
        active = p_active, admin = p_admin
    WHERE id = p_user_id;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS delete_user;
DELIMITER $$
CREATE PROCEDURE delete_user(IN p_user_id INT)
BEGIN
    DELETE FROM users WHERE id = p_user_id;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS send_verification;
DELIMITER $$
CREATE PROCEDURE send_verification(IN p_user_id INT, IN p_email VARCHAR(120))
BEGIN
    DECLARE v_token VARCHAR(255);
    SET v_token = UUID();
    INSERT INTO verification_tokens (user_id, token, created_at) VALUES (p_user_id, v_token, NOW());
    SELECT v_token AS token;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS verify_user;
DELIMITER $$
CREATE PROCEDURE verify_user(IN p_user_id INT, IN p_token VARCHAR(255))
BEGIN
    DECLARE v_match INT;
    SELECT COUNT(*) INTO v_match FROM verification_tokens
    WHERE user_id = p_user_id AND token = p_token;

    IF v_match = 1 THEN
        UPDATE users SET active = TRUE WHERE id = p_user_id;
        SELECT 'success' AS status;
    ELSE
        SELECT 'fail' AS status;
    END IF;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS gen_password_token;
DELIMITER $$
CREATE PROCEDURE gen_password_token(IN p_user_id INT, IN p_email VARCHAR(120))
BEGIN
    DECLARE v_token VARCHAR(255);
    SET v_token = UUID();
    INSERT INTO password_resets (user_id, token, created_at) VALUES (p_user_id, v_token, NOW());
    SELECT v_token AS token;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS reset_password;
DELIMITER $$
CREATE PROCEDURE reset_password(IN p_user_id INT, IN p_token VARCHAR(255), IN p_new_password VARCHAR(255))
BEGIN
    DECLARE v_match INT;
    SELECT COUNT(*) INTO v_match FROM password_resets
    WHERE user_id = p_user_id AND token = p_token;

    IF v_match = 1 THEN
        UPDATE users SET password = p_new_password WHERE id = p_user_id;
        SELECT 'success' AS status;
    ELSE
        SELECT 'fail' AS status;
    END IF;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS get_all_blogs;
DELIMITER $$
CREATE PROCEDURE get_all_blogs()
BEGIN
    SELECT * FROM blogs;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS create_blog;
DELIMITER $$
CREATE PROCEDURE create_blog(IN p_title VARCHAR(255), IN p_body TEXT, IN p_user_id INT, IN p_status VARCHAR(50))
BEGIN
    INSERT INTO blogs (title, body, user_id, status, created_at)
    VALUES (p_title, p_body, p_user_id, p_status, NOW());
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS get_blog_by_id;
DELIMITER $$
CREATE PROCEDURE get_blog_by_id(IN p_blog_id INT)
BEGIN
    SELECT * FROM blogs WHERE id = p_blog_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS update_blog;
DELIMITER $$
CREATE PROCEDURE update_blog(IN p_blog_id INT, IN p_title VARCHAR(255), IN p_body TEXT, IN p_status VARCHAR(50))
BEGIN
    UPDATE blogs SET title = p_title, body = p_body, status = p_status WHERE id = p_blog_id;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS delete_blog;
DELIMITER $$
CREATE PROCEDURE delete_blog(IN p_blog_id INT)
BEGIN
    DELETE FROM blogs WHERE id = p_blog_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS get_user_blogs;
DELIMITER $$
CREATE PROCEDURE get_user_blogs(IN p_user_id INT)
BEGIN
    SELECT * FROM blogs WHERE user_id = p_user_id;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS get_comments_by_blog_id;
DELIMITER $$
CREATE PROCEDURE get_comments_by_blog_id(IN p_blog_id INT)
BEGIN
    SELECT * FROM comments WHERE blog_id = p_blog_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS create_comment;
DELIMITER $$
CREATE PROCEDURE create_comment(IN p_blog_id INT, IN p_user_id INT, IN p_body TEXT)
BEGIN
    INSERT INTO comments (blog_id, user_id, body, created_at)
    VALUES (p_blog_id, p_user_id, p_body, NOW());
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS update_comment;
DELIMITER $$
CREATE PROCEDURE update_comment(IN p_comment_id INT, IN p_body TEXT)
BEGIN
    UPDATE comments SET body = p_body WHERE id = p_comment_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_comment;
DELIMITER $$
CREATE PROCEDURE delete_comment(IN p_comment_id INT)
BEGIN
    DELETE FROM comments WHERE id = p_comment_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS get_all_categories;
DELIMITER $$
CREATE PROCEDURE get_all_categories()
BEGIN
    SELECT * FROM categories;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS create_category;
DELIMITER $$
CREATE PROCEDURE create_category(IN p_name VARCHAR(255), IN p_description VARCHAR(255))
BEGIN
    INSERT INTO categories (name, description) VALUES (p_name, p_description);
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS get_category_by_id;
DELIMITER $$
CREATE PROCEDURE get_category_by_id(IN p_category_id INT)
BEGIN
    SELECT * FROM categories WHERE id = p_category_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS update_category;
DELIMITER $$
CREATE PROCEDURE update_category(IN p_category_id INT, IN p_name VARCHAR(255), IN p_description VARCHAR(255))
BEGIN
    UPDATE categories SET name = p_name, description = p_description WHERE id = p_category_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_category;
DELIMITER $$
CREATE PROCEDURE delete_category(IN p_category_id INT)
BEGIN
    DELETE FROM categories WHERE id = p_category_id;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS get_user_follows;
DELIMITER $$
CREATE PROCEDURE get_user_follows(IN p_user_id INT)
BEGIN
    SELECT u.* FROM follows f
    JOIN users u ON f.followed_id = u.id
    WHERE f.follower_id = p_user_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS follow_user;
DELIMITER $$
CREATE PROCEDURE follow_user(IN p_user_id INT, IN p_follow_id INT)
BEGIN
    INSERT INTO follows (follower_id, followed_id, created_at)
    VALUES (p_user_id, p_follow_id, NOW());
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS unfollow_user;
DELIMITER $$
CREATE PROCEDURE unfollow_user(IN p_user_id INT, IN p_follow_id INT)
BEGIN
    DELETE FROM follows WHERE follower_id = p_user_id AND followed_id = p_follow_id;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS get_all_roles;
DELIMITER $$
CREATE PROCEDURE get_all_roles()
BEGIN
    SELECT * FROM roles;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS create_role;
DELIMITER $$
CREATE PROCEDURE create_role(IN p_role VARCHAR(50))
BEGIN
    INSERT INTO roles (role) VALUES (p_role);
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS get_role_by_id;
DELIMITER $$
CREATE PROCEDURE get_role_by_id(IN p_role_id INT)
BEGIN
    SELECT * FROM roles WHERE id = p_role_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_role;
DELIMITER $$
CREATE PROCEDURE delete_role(IN p_role_id INT)
BEGIN
    DELETE FROM roles WHERE id = p_role_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS get_user_roles;
DELIMITER $$
CREATE PROCEDURE get_user_roles(IN p_user_id INT)
BEGIN
    SELECT r.* FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = p_user_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS add_role_to_user;
DELIMITER $$
CREATE PROCEDURE add_role_to_user(IN p_user_id INT, IN p_role_id INT)
BEGIN
    INSERT INTO user_roles (user_id, role_id) VALUES (p_user_id, p_role_id);
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS remove_role_from_user;
DELIMITER $$
CREATE PROCEDURE remove_role_from_user(IN p_user_id INT, IN p_role_id INT)
BEGIN
    DELETE FROM user_roles WHERE user_id = p_user_id AND role_id = p_role_id;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS get_all_activities;
DELIMITER $$
CREATE PROCEDURE get_all_activities()
BEGIN
    SELECT * FROM activity;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS log_activity;
DELIMITER $$
CREATE PROCEDURE log_activity(IN p_user_id INT, IN p_action VARCHAR(255))
BEGIN
    INSERT INTO activity (user_id, action, created_at)
    VALUES (p_user_id, p_action, NOW());
END $$
DELIMITER ;
