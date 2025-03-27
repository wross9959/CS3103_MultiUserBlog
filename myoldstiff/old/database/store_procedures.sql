DELIMITER $$

-- USER AUTH & VERIFICATION
CREATE PROCEDURE verify_user_email(IN user_email VARCHAR(120))
BEGIN
    UPDATE users SET active = TRUE WHERE email = user_email;
END$$

CREATE PROCEDURE reset_password(IN user_email VARCHAR(120), IN new_password VARCHAR(255))
BEGIN
    UPDATE users SET password = new_password WHERE email = user_email;
END$$

CREATE PROCEDURE get_user_by_id(IN userId INT)
BEGIN
    SELECT * FROM users WHERE id = userId;
END$$

-- BLOG FILTERING
CREATE PROCEDURE get_all_blogs()
BEGIN
    SELECT * FROM blogs;
END$$

CREATE PROCEDURE get_blogs_after_date(IN after_date DATETIME)
BEGIN
    SELECT * FROM blogs WHERE created_at > after_date;
END$$

CREATE PROCEDURE get_blogs_by_keyword(IN keyword VARCHAR(100))
BEGIN
    SELECT * FROM blogs WHERE title LIKE CONCAT('%', keyword, '%') OR body LIKE CONCAT('%', keyword, '%');
END$$

CREATE PROCEDURE get_blogs_by_user(IN blog_user_id INT)
BEGIN
    SELECT * FROM blogs WHERE user_id = blog_user_id;
END$$

-- COMMENT FILTERING
CREATE PROCEDURE get_comments_for_blog(IN blogId INT)
BEGIN
    SELECT * FROM comments WHERE blog_id = blogId;
END$$

CREATE PROCEDURE get_comments_after_date(IN blogId INT, IN after_date DATETIME)
BEGIN
    SELECT * FROM comments WHERE blog_id = blogId AND created_at > after_date;
END$$

CREATE PROCEDURE get_comments_by_keyword(IN blogId INT, IN keyword VARCHAR(100))
BEGIN
    SELECT * FROM comments WHERE blog_id = blogId AND body LIKE CONCAT('%', keyword, '%');
END$$

-- CATEGORY ASSIGNMENT
CREATE PROCEDURE assign_category_to_blog(IN blogId INT, IN categoryId INT)
BEGIN
    INSERT INTO blog_categories (blog_id, category_id) VALUES (blogId, categoryId);
END$$

CREATE PROCEDURE remove_category_from_blog(IN blogId INT, IN categoryId INT)
BEGIN
    DELETE FROM blog_categories WHERE blog_id = blogId AND category_id = categoryId;
END$$

CREATE PROCEDURE get_categories_for_blog(IN blogId INT)
BEGIN
    SELECT c.* FROM categories c
    JOIN blog_categories bc ON c.id = bc.category_id
    WHERE bc.blog_id = blogId;
END$$

-- FOLLOWERS
CREATE PROCEDURE get_followers(IN userId INT)
BEGIN
    SELECT u.* FROM users u
    JOIN follows f ON u.id = f.follower_id
    WHERE f.followed_id = userId;
END$$

CREATE PROCEDURE get_following(IN userId INT)
BEGIN
    SELECT u.* FROM users u
    JOIN follows f ON u.id = f.followed_id
    WHERE f.follower_id = userId;
END$$

DELIMITER ;
