export default {
  props: {
    post: Object,
  },
  template: `
    <router-link :to="{ name: 'blog', params: { id: post.id } }">
      <div class="post-card-banner">
          <img :src="post.image" alt="Post Cover Image">
      </div>
      <div class="post-card-content">
        <div class="post-card-header">
            <h2>{{ post.title }}</h2>
            <p>{{ post.created_at }}</p>
        </div>
        <div class="post-card-body">
            <p>{{ post.body.substring(0, 150).trim() + "..." }}</p>
        </div>
      </div>
    </router-link>`
}