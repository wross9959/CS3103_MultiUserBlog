# CS3103_MultiUserBlog

Table follows {
  id int [primary key]
  follower_id integer
  followed_id integer
  created_at timestamp
}

Table users {
  id integer [primary key]
  username varchar
  email varchar
  first_name varchar
  last_name varchar
  password varchar
  active bool
  admin bool
  role varchar
  created_at timestamp
}

Table blogs {
  id int [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer
  status varchar
  created_at timestamp
}

Table categories {
  id int [primary key]
  name varchar [unique]
  description varchar
}

Table category_tag {
  id int [primary key]
  blog_id integer
  categories_id integer
}

Table activitie {
  id int [primary key]
  user_id integer
  action varchar
  created_on timestamp
}

Table comments {
  id integer [primary key]
  blog_id integer
  user_id integer
  title varchar
  body varchar
  created_at timestamp
}

// Relationships
Ref: users.id < blogs.user_id
Ref: users.id < comments.user_id
Ref: users.id < activitie.user_id
Ref: users.id <> follows.followed_id
Ref: users.id <> follows.follower_id
Ref: category_tag.categories_id > categories.id
Ref: category_tag.blog_id > blogs.id
Ref: blogs.id > comments.blog_id