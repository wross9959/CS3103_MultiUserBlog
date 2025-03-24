export default {
  props: {
    post: Object
  },
  template: `
    <a href="#">
      <div class="post-header">
          <h2>{{ post.title }}</h2>
          <p>{{ post.created_at }}</p>
      </div>
      <div class="post-content">
          <p>{{ post.body }}</p>
      </div>
    </a>`
}