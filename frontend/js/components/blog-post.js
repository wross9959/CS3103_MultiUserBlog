export default {
    props: {
        post: Object,
    },
    template: `
        <div class="post-banner">
            <img src="{{ post.image }}" alt="Post Cover Image">
        </div>
        <div class="post-header">
            <h1>{{ post.title }}</h1>
            <p>{{ post.created_at }}</p>
        </div>
        <div class="post-content">
            <p>{{ post.body }}</p>
        </div>`
}