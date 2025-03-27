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
        <div class="feature-content">
          <div class="feature-header">
              <h1>{{ post.title }}</h1>
              <p>{{ post.created_at }}</p>
              <p>{{ post.username }}</p>
          </div>
          <div class="feature-body">
              <p>{{ post.body.substring(0, 250).trim() + "..." }}</p>
          </div>
        </div>
      </div>
    </router-link>`
}