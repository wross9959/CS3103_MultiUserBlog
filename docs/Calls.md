### ✅ API Endpoints (Frontend Use)

| Method | URL                                         | Description                           |
|--------|---------------------------------------------|---------------------------------------|
| POST   | /api/signin                                 | Login                                 |
| DELETE | /api/signout                                | Logout                                |
| GET    | /api/whoami                                 | Get session user                      |
| POST   | /api/users                                  | Register new user                     |
| GET    | /api/users/me                               | Get current user                      |
| PUT    | /api/users/me                               | Update current user                   |
| DELETE | /api/users/me                               | Delete current user                   |
| GET    | /api/users/<id>                             | Get user by ID                        |
| GET    | /api/users                                  | List all users                        |
| GET    | /api/users/me/verify                        | Request email verification token      |
| POST   | /api/users/me/verify                        | Submit email verification token       |
| GET    | /api/users/me/reset-password                | Request password reset token          |
| POST   | /api/users/me/reset-password                | Submit password + reset token         |
| GET    | /api/admin/users                            | Admin: list all users                 |
| GET    | /api/admin/users/<id>                       | Admin: get user by ID                 |
| DELETE | /api/admin/users/<id>                       | Admin: delete user                    |
| GET    | /api/blogs                                  | List all blogs                        |
| POST   | /api/blogs                                  | Create blog                           |
| GET    | /api/blogs/<id>                             | Get blog by ID                        |
| PUT    | /api/blogs/<id>                             | Update blog                           |
| DELETE | /api/blogs/<id>                             | Delete blog                           |
| GET    | /api/blogs/<userId>                         | Get user’s blogs                      |
| GET    | /api/blogs/<id>/comments                    | Get comments for blog                 |
| POST   | /api/blogs/<id>/comments                    | Post a comment                        |
| PUT    | /api/blogs/comments/<id>                    | Update a comment                      |
| DELETE | /api/blogs/comments/<id>                    | Delete a comment                      |
| GET    | /api/categories                             | List all categories                   |
| POST   | /api/categories                             | Create category                       |
| GET    | /api/categories/<id>                        | Get category                          |
| PUT    | /api/categories/<id>                        | Update category                       |
| DELETE | /api/categories/<id>                        | Delete category                       |
| GET    | /api/roles                                  | List roles                            |
| POST   | /api/roles                                  | Create role                           |
| GET    | /api/roles/<id>                             | Get role                              |
| DELETE | /api/roles/<id>                             | Delete role                           |
| GET    | /api/roles/<userId>                         | Get user's roles                      |
| POST   | /api/roles/<userId>                         | Assign role to user                   |
| DELETE | /api/roles/<userId>/<roleId>                | Remove role from user                 |
| GET    | /api/users/<userId>/follows                 | Get users this user follows           |
| POST   | /api/users/<userId>/follows/<id>            | Follow user                           |
| DELETE | /api/users/<userId>/follows/<id>            | Unfollow user                         |
| GET    | /api/activities                              | Get all activity logs                 |
| POST   | /api/activities                              | Log activity                          |
