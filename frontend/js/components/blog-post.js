export default {
    props: {
        id: Number,
    },
    data() {
        return {
            post: { }
        }
    },
    created() {
        fetch(`/api/blogs/${this.id}`)
            .then(response => response.json())
            .then(data => {
                this.post = data
                this.post.created_at = new Date(this.post.created_at).toLocaleDateString()
                this.post.image = `/static/images/banners/banner-${Math.floor(Math.random() * 10) + 1}.jpg`;
            })
    },
    template: `
    <div class="post container">
        <div class="post-banner">
            <img :src="post.image" alt="Post Banner">
        </div>
        <div class="post-header">
            <h1>{{ post.title }}</h1>
            <p>{{ post.created_at }}</p>
        </div>
        <div class="post-content">
            <p>{{ post.body }}</p>
        </div>
    </div>`
}