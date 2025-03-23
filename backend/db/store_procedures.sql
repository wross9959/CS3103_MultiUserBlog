-- user tables

DELIMITER $$

CREATE PROCEDURE create_user(
    IN username VARCHAR(80),
    IN email VARCHAR(120),
    IN first_name VARCHAR(50),
    IN last_name VARCHAR(50),
    IN password VARCHAR(255),
    IN active BOOLEAN,
    IN admin BOOLEAN
)
BEGIN
    INSERT INTO users (username, email, first_name, last_name, password, active, admin, created_at)
    VALUES (username, email, first_name, last_name, password, active, admin, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_all_users()
BEGIN
    SELECT * FROM users;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE update_user(
    IN user_id INT,
    IN username VARCHAR(80),
    IN email VARCHAR(120),
    IN first_name VARCHAR(50),
    IN last_name VARCHAR(50),
    IN active BOOLEAN,
    IN admin BOOLEAN
)
BEGIN
    UPDATE users
    SET username = username, email = email, first_name = first_name, last_name = last_name,
        active = active, admin = admin
    WHERE id = user_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE delete_user(IN user_id INT)
BEGIN
    DELETE FROM users WHERE id = user_id;
END$$

DELIMITER ;

-- blogs

DELIMITER $$

CREATE PROCEDURE create_blog(
    IN title VARCHAR(255),
    IN body TEXT,
    IN user_id INT,
    IN status VARCHAR(50)
)
BEGIN
    INSERT INTO blogs (title, body, user_id, status, created_at)
    VALUES (title, body, user_id, status, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_all_blogs()
BEGIN
    SELECT * FROM blogs;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE update_blog(
    IN blog_id INT,
    IN title VARCHAR(255),
    IN body TEXT,
    IN status VARCHAR(50)
)
BEGIN
    UPDATE blogs
    SET title = title, body = body, status = status
    WHERE id = blog_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE delete_blog(IN blog_id INT)
BEGIN
    DELETE FROM blogs WHERE id = blog_id;
END$$

DELIMITER ;

-- comment table 

DELIMITER $$

CREATE PROCEDURE create_comment(
    IN blog_id INT,
    IN user_id INT,
    IN title VARCHAR(255),
    IN body TEXT
)
BEGIN
    INSERT INTO comments (blog_id, user_id, title, body, created_at)
    VALUES (blog_id, user_id, title, body, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_all_comments()
BEGIN
    SELECT * FROM comments;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE update_comment(
    IN comment_id INT,
    IN title VARCHAR(255),
    IN body TEXT
)
BEGIN
    UPDATE comments
    SET title = title, body = body
    WHERE id = comment_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE delete_comment(IN comment_id INT)
BEGIN
    DELETE FROM comments WHERE id = comment_id;
END$$

DELIMITER ;

-- categories

DELIMITER $$

CREATE PROCEDURE create_category(
    IN name VARCHAR(255),
    IN description VARCHAR(255)
)
BEGIN
    INSERT INTO categories (name, description)
    VALUES (name, description);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_all_categories()
BEGIN
    SELECT * FROM categories;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE update_category(
    IN category_id INT,
    IN name VARCHAR(255),
    IN description VARCHAR(255)
)
BEGIN
    UPDATE categories
    SET name = name, description = description
    WHERE id = category_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE delete_category(IN category_id INT)
BEGIN
    DELETE FROM categories WHERE id = category_id;
END$$

DELIMITER ;

-- follows table

DELIMITER $$

CREATE PROCEDURE create_follow(
    IN follower_id INT,
    IN followed_id INT
)
BEGIN
    INSERT INTO follows (follower_id, followed_id, created_at)
    VALUES (follower_id, followed_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE delete_follow(
    IN follow_id INT
)
BEGIN
    DELETE FROM follows WHERE id = follow_id;
END$$

DELIMITER ;

-- activity table

DELIMITER $$

CREATE PROCEDURE log_activity(
    IN user_id INT,
    IN action VARCHAR(255)
)
BEGIN
    INSERT INTO activity (user_id, action, created_on)
    VALUES (user_id, action, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE get_all_activities()
BEGIN
    SELECT * FROM activity;
END$$

DELIMITER ;
