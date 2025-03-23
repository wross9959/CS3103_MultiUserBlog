### ✅ Stored Procedures

| Feature     | Procedure                       | Arguments |
|-------------|----------------------------------|-----------|
| Users       | create_user                     | username, email, first_name, last_name, password, active, admin |
|             | get_all_users                   | —         |
|             | get_user_by_id                  | user_id   |
|             | get_user_by_username            | username  |
|             | update_user                     | user_id, username, email, first_name, last_name, active, admin |
|             | delete_user                     | user_id   |
|             | login_user                      | email, password |
| Verification| generate_verification_token     | user_id   |
|             | verify_email_token              | user_id, token |
| Password    | generate_password_reset_token   | user_id   |
| Reset       | reset_password_with_token       | user_id, token, new_password |
| Roles       | get_all_roles                   | —         |
|             | create_role                     | role      |
|             | get_role                        | role_id   |
|             | delete_role                     | role_id   |
|             | get_user_roles                  | user_id   |
|             | assign_role                     | user_id, role |
|             | remove_role                     | user_id, role_id |
| Blogs       | get_all_blogs                   | newerThan, category, keyword |
|             | create_blog                     | title, body, user_id, status |
|             | get_blog                        | blog_id   |
|             | update_blog                     | blog_id, title, body, status |
|             | delete_blog                     | blog_id   |
|             | get_user_blogs                  | user_id   |
| Comments    | get_all_comments                | blog_id, newerThan, keyword |
|             | create_comment                  | blog_id, user_id, body |
|             | update_comment                  | comment_id, body |
|             | delete_comment                  | comment_id |
| Categories  | get_all_categories              | —         |
|             | create_category                 | name, description |
|             | get_category                    | category_id |
|             | update_category                 | category_id, name, description |
|             | delete_category                 | category_id |
| Follows     | get_user_follows                | user_id   |
|             | create_follow                   | follower_id, followed_id |
|             | delete_follow                   | follower_id, followed_id |
| Activities  | get_all_activities              | —         |
|             | log_activity                    | user_id, action |
