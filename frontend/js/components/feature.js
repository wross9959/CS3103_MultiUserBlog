export default {
  props: {
    post: Object,
  },
  template: `
    <router-link :to="{ name: 'blog', params: { id: post.id } }">
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
    </router-link>`
}