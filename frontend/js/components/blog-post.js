export default {
    props: {
        id: Number,
    },
    data() {
        return {
            post: { id: 1, title: "Post 1", body: "This is the first post", created_at: "2021-01-01", image: "/static/images/banners/banner-1.jpg" }
        }
    },
    mounted() {
        // fetch(`/api/blogs/${this.id}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         this.post = data
        //         this.post.created_at = new Date(this.post.created_at).toLocaleDateString()
        //     })
    },
    template: `
    <div class="post container">
        <div class="post-banner">
            <img :src="post.image" alt="Post Cover Image">
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