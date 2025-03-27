export default {
  props: {
    post: Object,
  },
  template: `
    <a class="feature-link" href="#">
      <div class="feature">
        <div class="feature-image">
            <img :src="post.image" alt="Feature Image">
        </div>
        <div class="feature-text">
          <h1>{{ post.title }}</h1>
          <p>{{ post.created_at }}</p>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </a>`
}