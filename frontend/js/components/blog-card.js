export default {
  props: {
    post: Object,
  },
  template: `
    <a href="#">
      <div class="post-banner">
          <img :src="post.image" alt="Post Cover Image">
      </div>
      <div class="post-content">
        <div class="post-header">
            <h2>{{ post.title }}</h2>
            <p>{{ post.created_at }}</p>
        </div>
        <div class="post-body">
            <p>{{ post.body.substring(0, 150).trim() + "..." }}</p>
        </div>
      </div>
    </a>`
}