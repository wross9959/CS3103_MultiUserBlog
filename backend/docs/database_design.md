# Database Design

The Multiuser Blog Application enables users to create, share, and engage with blog content. Users can post blogs to their personal accounts, follow other users for updates, and participate in discussions through comments. The system will maintain a structured and secure database to support these functionalities. 

To ensure data integrity, consistency, and security, all database interactions will be handled exclusively through stored procedures, unfortunately (why though?).  The database design follows a relational model with well-defined entities and relationships, ensuring efficient query execution and data retrieval. 

## UML Design
![UML](image.png)


## Tables and Relationships

### `users`

| Column      | Type           | Constraints                   |
|-------------|----------------|-------------------------------|
| id          | INT            | PK, AUTO_INCREMENT            |
| username    | VARCHAR(80)    | NOT NULL, UNIQUE              |
| email       | VARCHAR(120)   | NOT NULL, UNIQUE              |
| first_name  | VARCHAR(50)    |                               |
| last_name   | VARCHAR(50)    |                               |
| password    | VARCHAR(255)   |                               |
| active      | BOOLEAN        | DEFAULT TRUE                  |
| admin       | BOOLEAN        | DEFAULT FALSE                 |
| created_at  | DATETIME       | DEFAULT CURRENT_TIMESTAMP     |

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    admin BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

```
---

### `blogs`
| Column     | Type         | Constraints                             |
|------------|--------------|-----------------------------------------|
| id         | INT          | PK, AUTO_INCREMENT                      |
| title      | VARCHAR(255) | NOT NULL                                |
| body       | TEXT         | NOT NULL                                |
| user_id    | INT          | FK → `users.id`, NOT NULL               |
| status     | VARCHAR(50)  |                                         |
| created_at | DATETIME     | DEFAULT CURRENT_TIMESTAMP               |

```sql
CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
---

### `comments`
| Column     | Type         | Constraints                             |
|------------|--------------|-----------------------------------------|
| id         | INT          | PK, AUTO_INCREMENT                      |
| blog_id    | INT          | FK → `blogs.id`, NOT NULL               |
| user_id    | INT          | FK → `users.id`, NOT NULL               |
| title      | VARCHAR(255) |                                         |
| body       | TEXT         | NOT NULL                                |
| created_at | DATETIME     | DEFAULT CURRENT_TIMESTAMP               |

```sql
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blog_id INT NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(255),
    body TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
---

### `categories`
| Column      | Type         | Constraints                   |
|-------------|--------------|-------------------------------|
| id          | INT          | PK, AUTO_INCREMENT            |
| name        | VARCHAR(255) | NOT NULL, UNIQUE              |
| description | VARCHAR(255) | Nullable                      |

```sql
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255)
);
```
---

### `blog_categories`
| Column      | Type | Constraints                                      |
|-------------|------|--------------------------------------------------|
| blog_id     | INT  | PK, FK → `blogs.id`                              |
| category_id | INT  | PK, FK → `categories.id`                         |

```sql
CREATE TABLE blog_categories (
    blog_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (blog_id, category_id),
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```
---

### `follows`
| Column       | Type     | Constraints                                |
|--------------|----------|--------------------------------------------|
| id           | INT      | PK, AUTO_INCREMENT                         |
| follower_id  | INT      | FK → `users.id`, NOT NULL                  |
| followed_id  | INT      | FK → `users.id`, NOT NULL                  |
| created_at   | DATETIME | DEFAULT CURRENT_TIMESTAMP                  |

```sql
CREATE TABLE follows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE
);
```
---

### `roles`
| Column | Type         | Constraints        |
|--------|--------------|--------------------|
| id     | INT          | PK, AUTO_INCREMENT |
| role   | VARCHAR(255) | NOT NULL, UNIQUE   |

```sql
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(255) NOT NULL UNIQUE
);
```
---

### `user_roles`
| Column   | Type | Constraints                                       |
|----------|------|---------------------------------------------------|
| id       | INT  | PK, AUTO_INCREMENT                                |
| user_id  | INT  | FK → `users.id`, ON DELETE CASCADE                |
| role_id  | INT  | FK → `roles.id`, ON DELETE CASCADE                |

```sql
CREATE TABLE user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
```
---

### `activity`
| Column     | Type         | Constraints                            |
|------------|--------------|----------------------------------------|
| id         | INT          | PK, AUTO_INCREMENT                     |
| user_id    | INT          | FK → `users.id`, NOT NULL              |
| action     | VARCHAR(255) | NOT NULL                               |
| created_at | DATETIME     | DEFAULT CURRENT_TIMESTAMP              |

```sql
CREATE TABLE activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
---

### `verification_tokens`
| Column     | Type         | Constraints                            |
|------------|--------------|----------------------------------------|
| id         | INT          | PK, AUTO_INCREMENT                     |
| user_id    | INT          | FK → `users.id`, NOT NULL              |
| token      | VARCHAR(255) | NOT NULL, UNIQUE                       |
| created_at | DATETIME     | DEFAULT CURRENT_TIMESTAMP              |

```sql
CREATE TABLE verification_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
---

### `password_resets`
| Column     | Type         | Constraints                            |
|------------|--------------|----------------------------------------|
| id         | INT          | PK, AUTO_INCREMENT                     |
| user_id    | INT          | FK → `users.id`, NOT NULL              |
| token      | VARCHAR(255) | NOT NULL, UNIQUE                       |
| created_at | DATETIME     | DEFAULT CURRENT_TIMESTAMP              |

```sql
CREATE TABLE password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
---


## Stored Procedures

#### `create_user`
```sql
CREATE PROCEDURE create_user( IN p_username VARCHAR(80), IN p_email VARCHAR(120), IN p_first_name VARCHAR(50), IN p_last_name VARCHAR(50), IN p_password VARCHAR(255), IN p_active BOOLEAN, IN p_admin BOOLEAN)
BEGIN
    INSERT INTO users (username, email, first_name, last_name, password, active, admin, created_at)
    VALUES (p_username, p_email, p_first_name, p_last_name, p_password, p_active, p_admin, NOW());
END
```

#### `get_all_users`
```sql
CREATE PROCEDURE get_all_users()
BEGIN
    SELECT * FROM users;
END 
```

#### `get_user_by_id`
```sql
CREATE PROCEDURE get_user_by_id(IN p_user_id INT)
BEGIN
    SELECT * FROM users WHERE id = p_user_id;
END
```

#### `login_user`
```sql
CREATE PROCEDURE login_user(IN p_email VARCHAR(120), IN p_password VARCHAR(255))
BEGIN
    SELECT * FROM users WHERE email = p_email AND password = p_password;
END
```

#### `update_user`
```sql
CREATE PROCEDURE update_user( IN p_user_id INT, IN p_username VARCHAR(80), IN p_email VARCHAR(120), IN p_first_name VARCHAR(50), IN p_last_name VARCHAR(50), IN p_active BOOLEAN, IN p_admin BOOLEAN)
BEGIN
    UPDATE users
    SET username = p_username, email = p_email, first_name = p_first_name, last_name = p_last_name,
        active = p_active, admin = p_admin
    WHERE id = p_user_id;
END
```

#### `delete_user`
```sql
CREATE PROCEDURE delete_user(IN p_user_id INT)
BEGIN
    DELETE FROM users WHERE id = p_user_id;
END 
```

#### `send_verification`
```sql
CREATE PROCEDURE send_verification(IN p_user_id INT, IN p_email VARCHAR(120))
BEGIN
    DECLARE v_token VARCHAR(255);
    SET v_token = UUID();
    INSERT INTO verification_tokens (user_id, token, created_at) VALUES (p_user_id, v_token, NOW());
    SELECT v_token AS token;
END 
```

#### `verify_user`
```sql
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
END
```

#### `gen_password_token`
```sql
CREATE PROCEDURE gen_password_token(IN p_user_id INT, IN p_email VARCHAR(120))
BEGIN
    DECLARE v_token VARCHAR(255);
    SET v_token = UUID();
    INSERT INTO password_resets (user_id, token, created_at) VALUES (p_user_id, v_token, NOW());
    SELECT v_token AS token;
END
```

#### `update_password`
```sql
CREATE PROCEDURE update_password(IN p_user_id INT, IN p_new_password VARCHAR(255))
```

#### `reset_password`
```sql
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
END
```

#### `get_all_blogs`
```sql
CREATE PROCEDURE get_all_blogs()
BEGIN
    SELECT * FROM blogs;
END
```

#### `create_blog`
```sql
CREATE PROCEDURE create_blog(IN p_title VARCHAR(255), IN p_body TEXT, IN p_user_id INT, IN p_status VARCHAR(50), IN p_image_url VARCHAR(255))
BEGIN
    INSERT INTO blogs (title, body, user_id, status, image_url, created_at)
    VALUES (p_title, p_body, p_user_id, p_status, p_image_url, NOW());
END
```

#### `get_blog_by_id`
```sql
CREATE PROCEDURE get_blog_by_id(IN p_blog_id INT)
BEGIN
    SELECT * FROM blogs WHERE id = p_blog_id;
END
```

#### `update_blog`
```sql
CREATE PROCEDURE update_blog(IN p_blog_id INT, IN p_title VARCHAR(255), IN p_body TEXT, IN p_status VARCHAR(50), IN p_image_url VARCHAR(255))
BEGIN
    UPDATE blogs SET title = p_title, body = p_body, status = p_status, image_url = p_image_url WHERE id = p_blog_id;
END
```

#### `delete_blog`
```sql
CREATE PROCEDURE delete_blog(IN p_blog_id INT)
BEGIN
    DELETE FROM blogs WHERE id = p_blog_id;
END
```

#### `get_user_blogs`
```sql
CREATE PROCEDURE get_user_blogs(IN p_user_id INT)
BEGIN
    SELECT * FROM blogs WHERE user_id = p_user_id;
END
```

#### `get_comments_by_blog_id`
```sql
CREATE PROCEDURE get_comments_by_blog_id(IN p_blog_id INT)
BEGIN
    SELECT * FROM comments WHERE blog_id = p_blog_id;
END 
```

#### `create_comment`
```sql
CREATE PROCEDURE create_comment(IN p_blog_id INT, IN p_user_id INT, IN p_body TEXT)
BEGIN
    INSERT INTO comments (blog_id, user_id, body, created_at)
    VALUES (p_blog_id, p_user_id, p_body, NOW());
END 
```

#### `update_comment`
```sql
CREATE PROCEDURE update_comment(IN p_comment_id INT, IN p_body TEXT)
BEGIN
    UPDATE comments SET body = p_body WHERE id = p_comment_id;
END 
```

#### `delete_comment`
```sql
CREATE PROCEDURE delete_comment(IN p_comment_id INT)
BEGIN
    DELETE FROM comments WHERE id = p_comment_id;
END
```

#### `get_all_categories`
```sql
CREATE PROCEDURE get_all_categories()
BEGIN
    SELECT * FROM categories;
END
```

#### `create_category`
```sql
CREATE PROCEDURE create_category(IN p_name VARCHAR(255), IN p_description VARCHAR(255))
BEGIN
    INSERT INTO categories (name, description) VALUES (p_name, p_description);
END 
```

#### `get_category_by_id`
```sql
CREATE PROCEDURE get_category_by_id(IN p_category_id INT)
BEGIN
    SELECT * FROM categories WHERE id = p_category_id;
END
```

#### `update_category`
```sql
CREATE PROCEDURE update_category(IN p_category_id INT, IN p_name VARCHAR(255), IN p_description VARCHAR(255))
BEGIN
    UPDATE categories SET name = p_name, description = p_description WHERE id = p_category_id;
END 
```

#### `delete_category`
```sql
CREATE PROCEDURE delete_category(IN p_category_id INT)
BEGIN
    DELETE FROM categories WHERE id = p_category_id;
END 
```

#### `get_user_follows`
```sql
CREATE PROCEDURE get_user_follows(IN p_user_id INT)
BEGIN
    SELECT u.* FROM follows f
    JOIN users u ON f.followed_id = u.id
    WHERE f.follower_id = p_user_id;
END
```

#### `follow_user`
```sql
CREATE PROCEDURE follow_user(IN p_user_id INT, IN p_follow_id INT)
BEGIN
    INSERT INTO follows (follower_id, followed_id, created_at)
    VALUES (p_user_id, p_follow_id, NOW());
END
```

#### `unfollow_user`
```sql
CREATE PROCEDURE unfollow_user(IN p_user_id INT, IN p_follow_id INT)
BEGIN
    DELETE FROM follows WHERE follower_id = p_user_id AND followed_id = p_follow_id;
END
```

#### `get_all_roles`
```sql
CREATE PROCEDURE get_all_roles()
BEGIN
    SELECT * FROM roles;
END
```

#### `create_role`
```sql
CREATE PROCEDURE create_role(IN p_role VARCHAR(50))
BEGIN
    INSERT INTO roles (role) VALUES (p_role);
END
```

#### `get_role_by_id`
```sql
CREATE PROCEDURE get_role_by_id(IN p_role_id INT)
BEGIN
    SELECT * FROM roles WHERE id = p_role_id;
END
```

#### `delete_role`
```sql
CREATE PROCEDURE delete_role(IN p_role_id INT)
BEGIN
    DELETE FROM roles WHERE id = p_role_id;
END
```

#### `get_user_roles`
```sql
CREATE PROCEDURE get_user_roles(IN p_user_id INT)
BEGIN
    SELECT r.* FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = p_user_id;
END
```

#### `add_role_to_user`
```sql
CREATE PROCEDURE add_role_to_user(IN p_user_id INT, IN p_role_id INT)
BEGIN
    INSERT INTO user_roles (user_id, role_id) VALUES (p_user_id, p_role_id);
END
```

#### `remove_role_from_user`
```sql
CREATE PROCEDURE remove_role_from_user(IN p_user_id INT, IN p_role_id INT)
BEGIN
    DELETE FROM user_roles WHERE user_id = p_user_id AND role_id = p_role_id;
END 
```

#### `get_all_activities`
```sql
CREATE PROCEDURE get_all_activities()
BEGIN
    SELECT * FROM activity;
END
```

#### `log_activity`
```sql
CREATE PROCEDURE log_activity(IN p_user_id INT, IN p_action VARCHAR(255))
BEGIN
    INSERT INTO activity (user_id, action, created_at)
    VALUES (p_user_id, p_action, NOW());
END
```

